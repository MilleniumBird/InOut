import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { InoutEntry } from '../../providers/entries/entries';
import { EntriesProvider } from '../../providers/entries/entries'; 

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  private entry: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private entriesProv: EntriesProvider) {
   this.entry = InoutEntry.toObject(this.navParams.data.toString());
  }

  changeInputObj (ev: any, name: string, date: boolean = false) {
    if (!date) {
      this.entry[name] = ev.target.value;
    } else {
      let d: Date = new Date(ev.target.value);
      console.log(d.getFullYear());
      this.entry[name] = d.getTime();
    }
  }

  removeEntryFromStorage() {
    this.entriesProv.delete(this.entry.key);
    this.events.publish('reloadData');
  }

  addEntryToStorage (factor: number){
    this.entry.price *= factor;
    this.entriesProv.set(this.entry);
    this.events.publish('reloadData');
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
