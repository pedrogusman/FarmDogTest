import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Countries provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Countries {

  constructor(public http: Http) {
    console.log('Hello Countries Provider');
  }

  public getAll(){
    return this.http.get('https://restcountries.eu/rest/v1/all')
      .map(res => res.json())
  }

  public getByRegion(region){
    return this.http.get('https://restcountries.eu/rest/v1/region/'+ region)
      .map(res => res.json())
  }

}
