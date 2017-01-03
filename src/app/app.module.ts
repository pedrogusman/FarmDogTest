import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Countries } from '../providers/countries';
import { Weather } from '../providers/weather';
import { OrderBy } from '../pipes/order-by';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    OrderBy
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Countries, Weather],
})
export class AppModule {}
