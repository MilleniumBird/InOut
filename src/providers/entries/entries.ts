import { Injectable } from '@angular/core';


export interface Repeat {
  repeat: boolean,
  copy?: boolean, // true when is child of repeatable object
  exept?: Array<number> // a array of Elements that should not get in the output 
}

export interface allEntries {
  repeat: Array<InoutEntry>
  once: Array<InoutEntry>
}


@Injectable()
export class EntriesProvider {

  constructor() {
    console.log("Connect to localstorage");
  }
  /**
   * checks the version number of the entry if it isnt equal to actual version update entry
   * @param {String} key 
   */

  delete (key: string) {
    window.localStorage.removeItem(key);
  }

  set (value: InoutEntry) {
    window.localStorage.setItem(value.key, value.toString());
  }

  getAllEntries(): allEntries {
    let rep = [];
    let once = [];
    let storLength = window.localStorage.length;
    for (let i = 0; i < storLength; ++i) {
      let key = window.localStorage.key(i);
      if ('_ENTRY_' === key.substr(0,7)) {
        let entry = InoutEntry.toObject(window.localStorage.getItem(key));
        if (entry.repeatable.repeat === false) {
          once.push(entry);
        } else if (entry.repeatable.repeat === true) {
          rep.push(entry);
          // add the repeating items
          // weekly 
          if (entry.repeatable.weekly !== undefined) {
            let creationDate = new Date (entry.time);
            let exeptList = entry.repeatable.exept.slice(0);
            for (let dayOfWeek of entry.repeatable.weekly) {
              dayOfWeek = Number(dayOfWeek);
              let date;
              if (creationDate.getDay() < dayOfWeek) {
                date = new Date(creationDate.getTime() + (dayOfWeek-creationDate.getDay())*24*60*60*1000);
              } else if (creationDate.getDay() > dayOfWeek) {
                date = new Date(creationDate.getTime() + (7-creationDate.getDay()+dayOfWeek)*24*60*60*1000);
              } else {
                date = new Date(creationDate.getTime() + (7)*24*60*60*1000);
              }
              while (true) {
                entry = InoutEntry.toObject(entry.toString());
                if (Date.now() <= date.getTime()) {
                  break;
                } else if (exeptList.indexOf(date.getTime()) >= 0) {
                  date = new Date (date.getTime() + 7*24*60*60*1000);
                  continue;
                }
                entry.repeatable = {repeat: false, copy: true};
                entry.time = date.getTime();
                rep.push(entry);
                date = new Date (date.getTime() + 7*24*60*60*1000);
              }
            }
          }
        } else {
          throw new Error("unexpected to reach this line");
        }
      }
    }
    return {
      repeat: rep,
      once: once
    };
  }

}

export enum DateFormat {
  lastTwo = 'LAST_TWO',
  dateInput = 'DATE_STRING'
}

export class InoutEntry {
  static version: number = 1;

  constructor (
    public version: number,
    private _category: string, 
    private _price: number, 
    private _details: string, 
    private _time: number = Date.now(), 
    private _repeatable: Repeat = {repeat: false},
    private _key: string = `_ENTRY_${Date.now()}`, 
    ) {
  }

  static toObject (JSONstring) {
    let obj: any = JSON.parse(JSONstring);
    if (!obj.category || !obj.price) {
      throw new Error ('no input');
    }
    if (obj.version !== InoutEntry.version && obj.key) {
      obj.version = InoutEntry.version;
      window.localStorage.setItem(obj.key, JSON.stringify(obj));
      return InoutEntry.toObject(window.localStorage.getItem(obj.key));
    }
    return new InoutEntry(
      obj.version ? obj.version: InoutEntry.version,
      obj.category, 
      obj.price, 
      obj.details ? obj.details : "", 
      obj.time ? obj.time : Date.now(), 
      obj.repeat ? obj.repeat : {repeat: false},
      obj.key ? obj.key : `_ENTRY_${Date.now()}`
    );
  }

  toString(): string {
    return JSON.stringify({
      version: this.version,
      category: this._category,
      price: this._price,
      details: this._details,
      time: this._time,
      key: this._key,
      repeat: this._repeatable
    });
  }



  formatDate (date: number,dateFormat: DateFormat): string {
    switch (dateFormat) {
      case DateFormat.dateInput: 
        let d: Date = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth()+1)<10? "0"+(d.getMonth()+1): (d.getMonth()+1) }-${d.getDate()<10?"0"+d.getDate(): d.getDate()}`;
      case DateFormat.lastTwo: 
        let now = Date.now();
        if (now-date < 1000*60*60) {
          return `vor ${Math.floor((now-date)/60000)} Minuten`;
        } else if (now-date < 1000*60*60*24) {
          return `vor ${Math.floor((now-date)/(3600000))} Stunden`;
        } else {
          let d: Date = new Date(date);
          return `${d.getDate()<10?"0"+d.getDate(): d.getDate()}.${(d.getMonth()+1)<10? "0"+(d.getMonth()+1): (d.getMonth()+1) }`;
        }
      default: 
        throw new Error('this dateFormat isnt known');
    }
  }

  // getter and setter

  get category ():string {
    return this._category;
  }
  set category (newCategory: string) {
     this._category = newCategory;
  }

  get price ():number {
    return this._price;
  }
  set price (value: number) {
    this._price = value;
  }

  get key ():string {
    return this._key;
  }
  set key (val: string) {
    this._key = val;
  }

  get time ():number{
    return this._time;
  }
  set time(time: number){
    this._time = time;
  }

  get details ():string {
    return this._details;
  }
  set details (newDetails: string) {
    this._details = newDetails;
  }

  get repeatable (): Repeat {
    return this._repeatable;
  }

  set repeatable (repeat: Repeat) {
    this._repeatable = repeat;
  }

}