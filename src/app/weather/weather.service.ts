import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICurrentWeather} from '../interfaces';

import { environment } from '../../environments/environment';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }];
  main: {
    temp: Number
  };
  sys: {
    country: string
  };
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(
    search: string | number,
    country?: string):
  Observable<ICurrentWeather> {
    let uriParams = '';
    if (typeof search === 'string') {
      uriParams = `q=${search}`;
    } else {
      uriParams = `zip=${search}`;
    }
    if (country) {
      uriParams = `${uriParams},${country}`;
    }
    return this.getCurrentWeatherHelper(uriParams);
  }

  getCurrentWeatherByCoords(coords: Coordinates):
  Observable<ICurrentWeather> {
    const uriParams =
    `lat=${coords.latitude}&lon=${coords.longitude}`;
    return this.getCurrentWeatherHelper(uriParams);
  }

  private getCurrentWeatherHelper(uriParams: string):
  Observable<ICurrentWeather> {
    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
      `${uriParams}&appId=${environment.appId}`
      ).pipe(map(data => this.transformToICurrentWeather(data)));
  }

  private transformToICurrentWeather(data: ICurrentWeatherData):
  ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    };
  }

  private convertKelvinToFahrenheit(kelvin: Number): number {
    return kelvin.valueOf() * 9 / 5 - 459.67;
  }
}
