import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smallLettersBoldNumbers'
})
export class SmallLettersBoldNumbersPipe implements PipeTransform {

  transform(value: string) {
    return `${value.substring(0,1)}<strong>${value.substring(1).fontsize(4)}</strong>`;
  }
//TODO Add CSS to the pipe.
}
