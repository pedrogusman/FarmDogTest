import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


/*
  Generated class for the Weather provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Weather {

  constructor(public http: Http) {
    console.log('Hello Weather Provider');
  }

  public getWeatherInCapital(countries){
    let appId='2e1956b3806aff5747514f8701600ffa',
        weatherInCapitals = []

    for (var country of countries) {
       weatherInCapitals.push(this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + country.capital + ',' + country.alpha2Code + '&appid='+ appId)
       .map(res => res.json()))
    }
    
    return Observable.forkJoin(weatherInCapitals)
  }

}
