import { Injectable } from '@angular/core';
import { Resource } from 'src/app/Models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class JsonserializerService<T extends Resource> {
private resource:T;
  constructor() { }

  // fromJson(json: any): T {
  //   resource = JSON.parse(json)

  //   return pizza;
  // }

  // toJson(pizza: Resource): any {
  //   return {
  //     id: pizza.id,
  //     name: pizza.name
  //   };
  // }
}
