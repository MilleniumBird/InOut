import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EntriesProvider, InoutEntry } from '../../providers/entries/entries'; 

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
  private detailsPage = DetailsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private entriesProv: EntriesProvider) {
   this.entry = InoutEntry.toObject(this.navParams.data.toString());
   this.entry.parent = this.entry.repeatable.copy !== undefined ? InoutEntry.toObject(window.localStorage.getItem(this.entry.key)) : undefined;
   console.log(this.entry);
  }

  changeInputObj (ev: any, name: string, date: boolean = false) {
    if (!date) {
      this.entry[name] = ev.target.value;
    } else {
      let d: Date = new Date(ev.target.value);
      this.entry[name] = d.getTime();
    }
  }

  removeEntryFromStorage() {
    this.entriesProv.delete(this.entry.key);
    this.events.publish('reloadData');
  }


  addEntryToStorage (factor: number){

    // check if its is copy, if entry is copy create new key
    if(this.entry.repeatable.copy) {
      let time = this.entry.time;
      let parentEntry = InoutEntry.toObject(window.localStorage.getItem(this.entry.key));
      if (parentEntry.repeatable.exept === undefined) {
        parentEntry.repeatable.exept = [];
      }
      parentEntry.repeatable.exept.push(time);
      this.entriesProv.set(parentEntry);

      this.entry.key = `_ENTRY_${Date.now()}`;
      this.entry.repeatable = {repeat: false}
      
    }

    this.entry.price *= factor;
    this.entriesProv.set(this.entry);
    this.events.publish('reloadData');
  };

  timeAsNumber (ev: any) {
    let d = new Date(ev.target.value);
    return d.getTime();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
