import { Component } from '@angular/core'; 
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EntriesProvider, InoutEntry } from '../../providers/entries/entries';

/**
 * Generated class for the AddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {
  private inputObj: any = {
    repeat: {repeat: false}
  };
  private showSubList: string = 'none';
  private console = console;
  constructor(public navCtrl: NavController, public navParams: NavParams, private entriesProv: EntriesProvider, public events: Events) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
  }
  changeInputObj (ev: any, name: string) {
    this.inputObj[name] = ev.target.value;
  }

  addEntryToStorage (factor: number){
    this.inputObj.price *= factor;
    let inout = InoutEntry.toObject(JSON.stringify(this.inputObj));
    this.entriesProv.set(inout);
    this.events.publish('reloadData');
  };

}
