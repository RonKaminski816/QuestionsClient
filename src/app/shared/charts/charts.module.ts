import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackedColumnChartComponent } from './stacked-column-chart/stacked-column-chart.component';
import { SimplePieChartComponent } from './simple-pie-chart/simple-pie-chart.component';



@NgModule({
  declarations: [StackedColumnChartComponent, SimplePieChartComponent],
  imports: [
    CommonModule
  ],
  exports:[StackedColumnChartComponent, SimplePieChartComponent],
})
export class ChartsModule { }
