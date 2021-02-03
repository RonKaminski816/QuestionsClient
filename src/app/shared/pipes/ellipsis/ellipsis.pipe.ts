import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, count: number = 30): string {
    let retTxt = value;
    if (retTxt && retTxt.length > count) {
      return retTxt.substring(0, count - 3) + "...";
    }
    return retTxt;
  }

}
