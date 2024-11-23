import { Router } from "express";
const router = Router();
//  import fs from 'node:fs/promises';


//import WeatherService from "../../service/weatherService.js";

import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


  //got from parkRoutes.ts api 
  //idenify lat and lon 
  // openweathermap geo weather point returns lat and lon
  // openweathermap endpoint by city name - resources channel 
  // https://openweathermap.org/current#name
  //gets send to the front end, then the front end parses the data
  router.get('/', async (req, res) => {
    try {
      const city = req.body.city;

      const cityData = await WeatherService.getWeatherForCity(city);

      if (typeof cityData === 'string') {
        res.status(404).json({ message: 'No events found' });

      } else {
        console.log("cityData:");
        console.log("");
        console.log(cityData);
        res.json(cityData);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  // TODO: save city to search history
//* `GET /api/weather/history` should read the `searchHistory.json` file and return all saved cities as JSON.

  router.post('/', async (req, res) => {
    try {
      const city = req.body.cityName;

      const cityData = await WeatherService.getWeatherForCity(city);
      res.json(cityData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  // Listen for connections
app.listen(PORT, () => 
    console.info(`Example app listening at http://localhost:${PORT}`)
);




  export default router;
