import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log(error["massege"]);
      return false;
    }
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
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
