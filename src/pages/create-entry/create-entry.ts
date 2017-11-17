import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
}
