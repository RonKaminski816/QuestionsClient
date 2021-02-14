import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from "./charts/charts.module";
import { PipesModule } from './pipes/pipes.module';
import { TreesModule } from './trees/trees.module';
import { DirectivesModule } from './directives/directives.module';



@NgModule({
  exports: [ChartsModule, PipesModule, TreesModule, DirectivesModule],
  imports: [
    CommonModule,
  ],
  declarations: []
})
export class SharedModule { }
