import dotenv from 'dotenv';

dotenv.config();



const getTicketData = async (zipCode:string): Promise<string | null> => {

    try {
        const fetch = require('node-fetch');

        const apiKey = 'YOUR_LOCATIONIQ_API_KEY';


        //https://my.locationiq.com/dashboard

        const geoResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${zipCode}&format=json`);

        if (!geoResponse.ok) {
            throw new Error('invalid API response from locationiq, check the network tab');
        }

        const geoData = await geoResponse.json();

        const cityData = geoData[0]?.address?.city || null;


        const tickResponse = await fetch(`https://app.ticketmaster.com/discovery/v1/events.json?apikey=${apiKey}`);

    

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