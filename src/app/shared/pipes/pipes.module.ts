import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallLettersBoldNumbersPipe } from './smallLettersBoldNumbers/small-letters-bold-numbers.pipe';
import { EllipsisPipe } from './ellipsis/ellipsis.pipe';



@NgModule({
    declarations: [SmallLettersBoldNumbersPipe, EllipsisPipe],
    imports: [
      CommonModule
    ],
    exports:[SmallLettersBoldNumbersPipe, EllipsisPipe],
  })
  export class PipesModule { }