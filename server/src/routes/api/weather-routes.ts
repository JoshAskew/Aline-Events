import { Router, type Request, type Response } from 'express';
import WeatherService from "../../api/WeatherAPI"

const router = Router();

router.get('/weather', async (_req: Request, res: Response) => {
    try {
      
      const currentWeather = await WeatherService.getWeatherForCity("Minneapolis");
      res.json(currentWeather);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  export default router;