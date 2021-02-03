import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from "./charts/charts.module";
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  exports: [ChartsModule, PipesModule],
  imports: [
    CommonModule,
  ],
  declarations: []
})
export class SharedModule { }
