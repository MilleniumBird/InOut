import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EntrystorageProvider} from '../../providers/entrystorage/entrystorage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private entries = "hello";
  constructor(public navCtrl: NavController, private entryProv: EntrystorageProvider) {

  }
  toggle () {
    this.entryProv.set('12345', 'test').then((res) => {
      console.log(res);
    });
    this.entryProv.entries().then((res) => {
      this.entries = JSON.stringify(res);
      console.log(res);
    });
  }
}
