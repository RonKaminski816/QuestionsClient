import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem<T>(key: string, value: T): boolean {
    try {
      const item = JSON.stringify(value);
      localStorage.setItem(key, item);
      return true;
    } catch (error) {
      console.log(error["massege"]);
      return false;
    }
  }

  /**
   *Get a specific item from the local storage as the given type by the key of the local storage item
   * @param key The key of the item in the local storage
   * @returns Returns the object as the given type
   */
  getItem<T>(key: string): T {
    const item: T = JSON.parse(localStorage.getItem(key));
    return item;
  }

  removeItem(key: string): boolean {
    if (this.isKeyExist(key)) {
      localStorage.removeItem(key)
      return true;
    }
    return false;
  }

  isKeyExist(key: string): boolean {
    return localStorage.getItem(key) ? true : false;
  }
}
