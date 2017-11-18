import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the CreateEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-entry',
  templateUrl: 'create-entry.html',
})
export class CreateEntryPage {
  
  @ViewChild(Nav) nav: Nav;

  private createEntryObj = "{}";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEntryPage');
  }

  updateEntry (event: any, propName: string) {
    let entryObj: object = JSON.parse(this.createEntryObj);
    entryObj[propName] = event.target.value;
    this.createEntryObj = JSON.stringify(entryObj);
  }

  backToHome () {
    this.nav.setRoot(HomePage);
  }
}
