import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { InOut } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddEntryPageModule }from '../pages/add-entry/add-entry.module';
import { EntriesProvider } from '../providers/entries/entries';
import { DetailsPageModule } from '../pages/details/details.module';
import { ImpressumPageModule } from '../pages/impressum/impressum.module';
import { DisclaimerPageModule } from '../pages/disclaimer/disclaimer.module';
import { DatenschutzPageModule } from '../pages/datenschutz/datenschutz.module';

@NgModule({
  declarations: [
    InOut,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(InOut),
    AddEntryPageModule,
    DetailsPageModule,
    ImpressumPageModule,
    DisclaimerPageModule,
    DatenschutzPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    InOut,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EntriesProvider
  ]
})
export class AppModule {}
