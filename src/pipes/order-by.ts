import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
  Generated class for the OrderByName pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'orderBy',
})
@Injectable()
export class OrderBy implements PipeTransform {
  transform(array: Array<string>, args: string): Array<string> {

    console.log('array',array );

  if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.sys.countryName < b.sys.countryName) {
        return -1;
      } else if (a.sys.countryName > b.sys.countryName) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
