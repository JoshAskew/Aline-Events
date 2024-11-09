import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import { User } from '../models/user.js';

const locationIQApiKey = "pk.914316b72b141711118acc9cdb36f8c1";

interface JwtPayload {
  id: number;
  userName: string;
  zipCode: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
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

export class WeatherData {
  temperature: number;
  humidity: number;
  date: string;


  constructor(temp: number, hum: number, date: string) {
    this.temperature = temp;
    this.humidity = hum;
    this.date = date;
  }
}


export class Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  coordinates: Coordinates;
  city: string;
  icon: string;
  date: string;


  constructor(temp: number, hum: number, windS: number, coordinates: Coordinates, cityName: string, icon: string, date: string) {
    this.temperature = temp;
    this.humidity = hum;
    this.windSpeed = windS;
    this.coordinates = coordinates;
    this.city = cityName;
    this.icon = icon;
    this.date = date;
  }
}


const getWeatherData = async (req: Request, res: Response): Promise<any | null> => {

  const locationIQApiKey = "pk.914316b72b141711118acc9cdb36f8c1";
  const weatherApiKey = "64d57280848a36eceeaef511f994475f";
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

    console.log('locationIQApiKey', locationIQApiKey)
    console.log('user', user)
    console.log('use?.zipCode', user.zipCode)

    const geoResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${locationIQApiKey}&postalcode=${user.zipCode}&format=json&countrycodes=us`);

    if (!geoResponse.ok) {
      throw new Error('invalid API response from locationiq in weather api, check the network tab');
    }

    const geoData = await geoResponse.json() as IGeoData[];

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${weatherApiKey}`);

    if (!weatherResponse.ok) {
      throw new Error('invalid API response from openweathermap in weather api, check the network tab');
    }

    const allWeatherData = await weatherResponse.json();

    const numberOfDays = 5;
    const dailyData: any[] = [];
    


    console.log("geoData:" + geoData)


    for (let i = 0; i < numberOfDays; i++) {
      i = i;
      let j = (i * 8);


      let temp = allWeatherData.list[j].main.temp;
      let humidity = allWeatherData.list[j].main.temp;
      let date = allWeatherData.list[j].dt_txt.split(' ')[0];


      dailyData.push(new WeatherData(temp, humidity, date));
      
    }





    return res.status(201).json(dailyData);

  } catch (err) {
    console.error('An error occurred in weather api', err);
    return null;
  }
}


export default getWeatherData;
