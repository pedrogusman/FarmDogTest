import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { Countries } from '../providers/countries';
import { Weather } from '../providers/weather';

import { OrderBy } from '../pipes/order-by';


@Component({
  templateUrl: 'app.html',
  providers: [ Countries]  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  list: any;
  filterList: any;
  selectedContinent: string = 'Americas';
  searchTerm: string = '';

  constructor(public platform: Platform, public menuCtrl: MenuController, public countriesService: Countries, public weatherService: Weather) {
    this.initializeApp();
    this.getCountriesWithWeather('Americas');
  }

  getCountriesWithWeather(value){
    this.countriesService.getByRegion(value)
      .subscribe(countries => {
          console.log('Countries', countries);
          this.weatherService.getWeatherInCapital(countries)
          .subscribe(
              data => {   
                  this.list = data
                  this.filterList = this.list
                  this.list.forEach((country, index) => {
                    if(country.sys.country == countries[index].alpha2Code)
                      country.sys['countryName'] = countries[index].name ? countries[index].name : country.sys.country;
                    else
                      country.sys['countryName'] = country.sys.country;
                  })
                  console.log('Weather in capital cities', this.list)
              },
              err => console.error(err),
              () => console.info('done')
          );
      });
  }

  public filterItems(){
      this.filterList = this.list.filter((item) => {
          return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                item.sys.countryName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                item.weather[0].main.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ;
      })
  }

  itemTapped(item){
    this.menuCtrl.close();
    this.nav.setRoot(Page2, {
      item: item
    });
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
