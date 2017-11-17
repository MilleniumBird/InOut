import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class EntrystorageProvider {

  constructor(public secureStorage: SecureStorage) {
    console.log('Hello EntrystorageProvider Provider');
  }

  set (key, value) {
    return new Promise ((resolve, reject) => {
        this.secureStorage.create('inoutStorage')
          .then((storage: SecureStorageObject) => {
            return storage.set(key, value).then((finish) => {
              console.log(finish);
            })
          })
          .catch((err: Error) => {
            console.error(err);
          })
    });
  }

  entries () {
    return new Promise ((resolve, reject) => {
      this.secureStorage.create('inoutStorage')
        .then((storage: SecureStorageObject) => {
          return storage.keys().then((keys: Array<string>) => {
            let entries = [];
            this._getEntriesPromisbased(keys, entries,0, storage).then((entries)=> {
              resolve(entries);
            })
          });
        })
        .catch((err: Error) => {
        console.error(err.message);
      });
    });
  }

  _getEntriesPromisbased (keys: Array<string>, entries: Array<[string, Object]>, step: number, storage: SecureStorageObject) {
    return new Promise((resolve, reject) => {
      if (step < keys.length) {
        storage.get(keys[step]).then((keyValue) => {
          entries.push([keys[step], keyValue]);
          ++step;
          resolve(this._getEntriesPromisbased(keys, entries, step, storage));
        })
      } else {
        resolve(entries);
      }
    });
  }

}
