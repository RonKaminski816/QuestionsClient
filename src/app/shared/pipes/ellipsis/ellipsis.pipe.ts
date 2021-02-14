import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: any) {
    return `<span class="ellipsis">${value}</span>`;
  }
}
