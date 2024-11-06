import dotenv from 'dotenv';
dotenv.config();


interface Coordinates {
    latitude: number;
    longitude: number;
}

const getCity = async (): Promise<string | null> => {

    try {
        const fetch = require('node-fetch');

        const apiKey = 'YOUR_LOCATIONIQ_API_KEY';
        const zipCode = '90210'; // Example ZIP code


        //https://my.locationiq.com/dashboard

        const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${zipCode}&format=json`);
        const data = await response.json();


        const city = data[0]?.address?.city || null;

        console.log("city:");
        console.log(city);

        if (!response.ok) {
            throw new Error('invalid API response from locationiq, check the network tab');
        }


        return city;

    } catch (err) {
        console.error('An error occurred', err);
        return null;
    }
};


const getCoordinates = async (): Promise<any> => {

    let myCord: Coordinates;

    try {
        const fetch = require('node-fetch');

        const apiKey = 'YOUR_LOCATIONIQ_API_KEY';
        const zipCode = '90210'; // Example ZIP code

        //https://my.locationiq.com/dashboard

        const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&postalcode=${zipCode}&format=json`);
        const data = await response.json();


        const lat = data[0]?.address?.city || null;

        console.log("lat:");
        console.log(lat);


        const lon = data[0]?.address?.city || null;

        console.log("lon:");
        console.log(lon);

        myCord = { latitude: lat, longitude: lon };


        if (!response.ok) {
            throw new Error('invalid API response from locationiq getting coordinates, check the network tab');
        }

        return myCord

    } catch (err) {
        console.error('An error occurred', err);
        return null;
    }
};





export { getCity, getCoordinates };