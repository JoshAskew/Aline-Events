import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  latitude: number;
  longitude: number;
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


class WeatherService {

  //[5-day weather forecast API](https://openweathermap.org/forecast5) 
  //[Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

  private baseURL: string;
  private apiKey?: string;
  cityName: string = "";

  constructor(cityName: string = "") {
    this.baseURL = process.env.API_BASE_URL || "Your_Base_URL";
    this.apiKey = process.env.API_KEY || "YOUR_API_KEY";
    this.cityName = cityName;
  }

  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch location data.');
    }
    const data = await response.json();

    const coordinates = [data[0].lat, data[0].lon];

    return coordinates;
  }

  private destructureLocationData(locationData: any): Coordinates {
    let myCord: Coordinates;
    myCord = { latitude: locationData[0], longitude: locationData[0] };
    return myCord
  }

  private buildGeocodeQuery(): string {
    let query = `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}`;

    return query;
  }


  private async fetchAndDestructureLocationData() {
    let locationDataDestructured = await this.destructureLocationData(
      await this.fetchLocationData(this.buildGeocodeQuery())
    );

    return locationDataDestructured;
  }
 
  private buildForecastWeatherQuery(coordinates: Coordinates): string {
    const query = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;

    return query;
  }


  private async fetchForecastWeatherData() {
    const response = await fetch(
      this.buildForecastWeatherQuery(
        await this.fetchAndDestructureLocationData()
      )
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const data = await response.json();

    const dailyForecast = this.extractDailyData(data.list);

    return {
      city: data.city,
      list: dailyForecast,
    };
  }

  private extractDailyData(dataPoints: any[]): any[] {
    const numberOfDays = 5;
    const dailyData: any[] = [];

    for (let i = 0; i < numberOfDays; i++) {

      i = i;
      let j = (i*8); 
      dailyData.push(dataPoints[j]);
    }

    return dailyData;
  }

  private parseForecastDay(dayData: any, coordinates: Coordinates, cityName: string): Weather {
    const temperature = dayData.main.temp;
    const humidity = dayData.main.humidity;
    const windSpeed = dayData.wind.speed;
    const icon = dayData.weather[0].icon;
    const words = dayData.dt_txt.split(" ");
    const currentDate = words[0];

    return new Weather(temperature, humidity, windSpeed, coordinates, cityName, icon, currentDate);

  }

  private parseForecastWeather(response: any, cityName: string): Weather[] {
    const forecast: Weather[] = [];
    const coordinates: Coordinates = {
      latitude: response.city.coord.lat,
      longitude: response.city.coord.lon,
    };

    response.list.forEach((dayData: any) => {
      forecast.push(this.parseForecastDay(dayData, coordinates, cityName));
    });

    return forecast;
  }

  async getWeatherForCity(cityName: string): Promise<Weather[]> {
    this.cityName = cityName;

    const forecast = await this.fetchForecastWeatherData();
    const forecastWeather = this.parseForecastWeather(forecast, cityName);

    return forecastWeather;
  }

}

export default new WeatherService();
