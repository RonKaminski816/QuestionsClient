import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { SharedModule } from "src/app/shared/shared.module";
import { ChartsPageRoutingModule } from './charts-page-routing.module';



@NgModule({
  declarations: [ChartsViewComponent],
  imports: [
    CommonModule,
    ChartsPageRoutingModule,
    SharedModule,
  ],
})
export class ChartsPageModule { }
