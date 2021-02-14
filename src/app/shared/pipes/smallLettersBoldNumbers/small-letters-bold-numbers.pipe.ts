import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smallLettersBoldNumbers'
})
export class SmallLettersBoldNumbersPipe implements PipeTransform {

  transform(value: string) {
    return `<span class="q-id-letter">${value.substring(0,1)}</span><span class="q-id-number">${value.substring(1)}</span>`;
  }
}
