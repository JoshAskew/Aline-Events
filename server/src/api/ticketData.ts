import fetch from 'node-fetch';
import { Request, Response } from 'express';
import {User} from '../models/user.js';

interface JwtPayload {
    userName: string;
    id: number;
  }

const getTicketData = async (req: Request, res: Response): Promise<any | null> => {

    console.log("got to getTicketData");
    const  {id} = req.user as JwtPayload;

    const user = await User.findByPk(id);

    const locationIQApiKey = "pk.914316b72b141711118acc9cdb36f8c1";
    const ticketmasterApiKey = "qVrcMA3jPZk9BICBALGl4ZZ9ltr0zQEe";

    try {

        console.log("Here1");

        //https://my.locationiq.com/dashboard

        const geoResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${locationIQApiKey}&postalcode=${user?.zipCode}&format=json`);

        console.log("Here2");

        if (!geoResponse.ok) {
            throw new Error('invalid API response from locationiq, check the network tab');
        }

        const geoData = await geoResponse.json();

        console.log("geoData");        
        console.log(geoData);

        const cityData = "";
        
        const tickResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&city=${cityData}`);


        if (!tickResponse.ok) {
            throw new Error('invalid API response from locationiq, check the network tab');
        }

        const ticketData = await tickResponse.json();

        return ticketData;

    } catch (err) {
        console.error('An error occurred', err);
        return null;
    }
};


export default getTicketData;