import { Component, ViewChild  } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ImpressumPage } from '../pages/impressum/impressum';
import { HomePage } from '../pages/home/home';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { DatenschutzPage } from '../pages/datenschutz/datenschutz';

@Component({
  templateUrl: 'app.html'
})
export class InOut {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  private showLaw: boolean = false;
  private pagesDefault: Array<any> = [
    {title: "Home", component: HomePage}
  ];
  private pagesLaw: Array<any> = [
  {title: "Impressum", component: ImpressumPage},
  {title: "Datenschutz", component: DatenschutzPage},
  {title: "Disclaimer", component: DisclaimerPage}
  ]
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    console.log("Init pages: " + this.pagesDefault);
    console.log("Init pages: " + this.pagesLaw)
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  toggleLaw () {
    this.showLaw = !this.showLaw;
  }

  openPage (page) {
    this.nav.setRoot(page);
  }
}

