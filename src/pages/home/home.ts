import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { EntriesProvider, InoutEntry } from '../../providers/entries/entries';
import { AddEntryPage } from '../add-entry/add-entry';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private entries: Array<InoutEntry> = [];
  private balance: number = 0;
  private addEntry: any;
  private detailsPage: any;

  constructor(public navCtrl: NavController, private entriesProv: EntriesProvider, public events: Events) {
    console.log("started app");
    this.getEntries ();
    this.addEntry = AddEntryPage;
    this.detailsPage = DetailsPage;
    // events
    this.events.subscribe('reloadData', () => {
      this.getEntries();
    })
  }

  getEntries () {
    this.entries = this.entriesProv.getAll().reverse();
    console.log(this.entries);
    this.balance = 0;
    // get balance
    for (let i = 0; i < this.entries.length; ++i) {
      this.balance += Number(this.entries[i].price)*100;
    }
    // draw the canvas 
    let intervalId = setInterval(() => {
      let canvasAvatarArr = document.getElementsByClassName('avatarCategory');
      if(this.entries.length === canvasAvatarArr.length) {
        for (let i = 0; i < canvasAvatarArr.length; ++i) {
          let canvas: any = canvasAvatarArr[i];
          let context = canvas.getContext('2d');
          let path = new Path2D();
          path.arc(24,24,24,0,2*Math.PI, false);
          context.fillStyle = "#2196F3";
          context.fill(path);
          context.font = "40px Verdana";
          context.fillStyle = 'white';
          context.fillText(this.entries[i].category.substr(0,1), 13, 36);
        }
        clearInterval(intervalId);
      }
      console.log("pending for rendering the list");
    }, 100);

    
  }
}
