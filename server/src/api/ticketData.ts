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


interface ITicketData {
    name: string,
    type?: string,
    id: string,
    test?: boolean,
    url?: string,
    locale?: string,
    images?: ITicketImage[]
}

interface ITicketImage {
    ratio: string,
    url: string,
    width: number,
    height: number,
    fallback: boolean
}

export class Tickets {
    name: string;
    id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }
}


const getTicketData = async (req: Request, res: Response): Promise<any | null> => {

    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // type assertion Request doesn't know what user is we are telling typescript to overwrite
        // req doesnt' know what user is and we are doing a type assertion saying we know what user is
        const { id } = req.user as JwtPayload;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const geoResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${locationIQApiKey}&postalcode=${user?.zipCode}&format=json&countrycodes=us`);

        if (!geoResponse.ok) {
            throw new Error('invalid API response from locationiq in ticketData.ts, check the network tab');
        }

        const geoData = await geoResponse.json() as IGeoData[];

        const cityName = geoData[0].display_name.split(',')[0];
        
        const tickResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&city=${cityName}`);

        if (!tickResponse.ok) {
            throw new Error('invalid API response from locationiq in ticketData.ts, check the network tab');
        }

        const ticketData: any = await tickResponse.json()
        const eventsData = ticketData['_embedded'].events as ITicketData[]

        const simplifiedTicketData = eventsData.map(event => new Tickets(event.name, event.id));

        return res.status(201).json(simplifiedTicketData);

    } catch (err) {
        console.error('An error occurred in ticketData.ts', err);
        return null;
    }
};


export default getTicketData;