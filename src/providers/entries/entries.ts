import { Injectable } from '@angular/core';

/*
  Generated class for the EntriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntriesProvider {

  constructor() {
    console.log("Connect to localstorage");
  }
  set (value: InoutEntry) {
    window.localStorage.setItem(value.key, value.toString());
  }

  getAll(): Array<InoutEntry> {
    let arr = [];
    let storLength = window.localStorage.length;
    for (let i = 0; i < storLength; ++i) {
      let key = window.localStorage.key(i)
      if ('_ENTRY_' === key.substr(0,7)) {
        arr.push(InoutEntry.toObject(window.localStorage.getItem(key)));
      }
    }
    return arr;
  }

}

export class InoutEntry {
  private object: any = {};
  constructor (category: string, price: number, details: string, time: number = Date.now(), key: string = `_ENTRY_${Date.now()}`) {
    this.object.category = category;
    this.object.price = price;
    this.object.details = details;
    this.object.key = key;
    this.object.time = time;
  }
  static toObject (JSONstring) {
    let obj: any = JSON.parse(JSONstring);
    if (!obj.category || !obj.price) {
      throw new Error ('no input');
    }
    return new InoutEntry(
      obj.category, 
      obj.price, 
      obj.details ? obj.details : "", 
      obj.time ? obj.time : Date.now(), 
      obj.key ? obj.key : `_ENTRY_${Date.now()}`
    );
  }

  toString(): string {
    return JSON.stringify(this.object);
  }

  // getter and setter

  get category ():string {
    return this.object.category;
  }
  set category (newCategory: string) {
     this.object.category = newCategory;
  }

  get price ():number {
    return this.object.price;
  }
  set price (value: number) {
    this.object.price = value;
  }

  get key ():string {
    return this.object.key;
  }
  set key (val: string) {
    this.object.key = val;
  }

  get details ():string {
    return this.object.details;
  }
  set details (newDetails: string) {
    this.object.details = newDetails;
  }

}