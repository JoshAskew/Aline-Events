import fetch from 'node-fetch';
import { Request, Response } from 'express';
import { User } from '../models/user.js';

const locationIQApiKey = "pk.914316b72b141711118acc9cdb36f8c1";
const ticketmasterApiKey = "qVrcMA3jPZk9BICBALGl4ZZ9ltr0zQEe";

interface JwtPayload {
    id: number;
    userName: string;
    zipCode: string;
}

interface IGeoData {
    place_id: number,
    licence: string,
    boundingbox: string[],
    lat: string,
    lon: string,
    display_name: string,
    class: string,
    type: string,
    importance: number

}

interface IEventDate {
    localDate: string;
    localTime: string;
    dateTime: string;
    status: {
      code: string;
    };
  }

interface ITicketData {
    name: string,
    type?: string,
    id: string,
    test?: boolean,
    url?: string,
    locale?: string,
    dates?: ITicketDates,
    images?: ITicketImage[],
    _embedded?: {
        venues: {
            name: string;
        }[]
    };
}

interface ITicketImage {
    ratio: string,
    url: string,
    width: number,
    height: number,
    fallback: boolean
}

interface ITicketDates {
    start?:{
        localDate: string;
    }
}

export class Tickets {
    name: string;
    id: string;
    venue: string;
    date: string;
    imageUrl: string;
    url:string;

    constructor(name: string, id: string, venue: string, date:string, imageUrl:string, url:string) {
        this.name = name;
        this.id = id;
        this.venue = venue;
        this.date =date;
        this.imageUrl=imageUrl;
        this.url=url;
    }
}

const getTicketData = async (req: Request, res: Response): Promise<any | null> => {
    
    const {radius} = req.body;


     try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Type assertion: Request doesn't know what user is, so we assert the type
        const { id } = req.user as JwtPayload;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch geolocation data based on the user's zip code
        const geoResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${locationIQApiKey}&postalcode=${user?.zipCode}&format=json&countrycodes=us`);
        if (!geoResponse.ok) {
            throw new Error('Invalid API response from LocationIQ');
        }

        const geoData = await geoResponse.json() as IGeoData[];
        const cityName = geoData[0].display_name.split(',')[0];

        let tickResponse;

        if(radius){
            tickResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&city=${cityName}&radius=${radius}`);
        }else {
            console.log("asdfads")
            tickResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&city=${cityName}&radius=50`);
        }

        // Fetch events from Ticketmaster API based on the city name
        
        if (!tickResponse.ok) {
            throw new Error('Invalid API response from Ticketmaster');
        }

        const ticketData: any = await tickResponse.json();
        const eventsData = ticketData['_embedded'].events as ITicketData[];

        // Map over the events and create simplified ticket data
        const simplifiedTicketData = eventsData.map(event => {
            const venueName = event._embedded?.venues?.[0]?.name || 'Unknown Venue';
            const date = event.dates?.start?.localDate || "Unknown Dates";
            const imageUrl = event.images?.[0]?.url || '';  // Get the first image URL if available
            const eventUrl = event.url || '';
    return new Tickets(event.name, event.id, venueName, date, imageUrl, eventUrl);
        });

        return res.status(201).json(simplifiedTicketData);

    } catch (err) {
        console.error('An error occurred in ticketData.ts', err);
        return res.status(500).json({ message: 'Server error occurred' });
    }
};

export default getTicketData;
