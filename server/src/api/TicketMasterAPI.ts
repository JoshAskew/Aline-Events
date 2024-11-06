//import { Event } from '../interfaces/Event.interface';
import dotenv from 'dotenv';
dotenv.config();




const searchTicketMaster = async (): Promise<Event[]> => {


    let apiKey = process.env.API_KEY || "YOUR_API_KEY";

    try {
        // let city = await searchZipCode();

        const response = await fetch(`https://app.ticketmaster.com/discovery/v1/events.json?apikey=${apiKey}`);
        const data = await response.json();

        console.log('data:');
        console.log(data);

        if (!response.ok) {
            throw new Error('invalid API response from ticketmaster, check the network tab');
        }

        return data;
    } catch (err) {
        console.log('an error occurred', err);
        return [];
    }
};



export { searchTicketMaster };
