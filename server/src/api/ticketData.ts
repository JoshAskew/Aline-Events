import fetch from 'node-fetch';
import { Request, Response } from 'express';
import { User } from '../models/user.js';

import dotenv from 'dotenv';
dotenv.config();

var geohash = require('ngeohash');

interface JwtPayload {
    id: number;
    userName: string;
    zipCode: string;
}

interface IGeoData {
    place_id: number,
    licence: string,
    boundingbox: string[],
    lat: number,
    lon: number,
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
    start?: {
        localDate: string;
    }
}

export class Tickets {
    name: string;
    id: string;
    venue: string;
    date: string;
    imageUrl: string;
    url: string;

    constructor(name: string, id: string, venue: string, date: string, imageUrl: string, url: string) {
        this.name = name;
        this.id = id;
        this.venue = venue;
        this.date = date;
        this.imageUrl = imageUrl;
        this.url = url;
    }
}

const getTicketData = async (req: Request, res: Response): Promise<any | null> => {

    const { radius } = req.body;

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
        const geoResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${process.env.locationIQApiKey}&postalcode=${user.zipCode}&format=json&countrycodes=us`);

        if (!geoResponse.ok) {
            throw new Error('Invalid API response from LocationIQ');
        }

        const geoData = await geoResponse.json() as IGeoData[];

        const geoHash = geohash.encode(geoData[0].lat, geoData[0].lon);



        const tickResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.ticketmasterApiKey}&geoPoint=${geoHash}&radius=${radius}&unit=miles`)

        console.log("tickResponse")
        console.log(tickResponse)

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


