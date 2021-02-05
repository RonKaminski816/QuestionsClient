import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { SharedModule } from "src/app/shared/shared.module";
import { ChartsPageRoutingModule } from './charts-page-routing.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';




@NgModule({
  declarations: [ChartsViewComponent],
  imports: [
    CommonModule,
    ChartsPageRoutingModule,
    SharedModule,
    NzDatePickerModule,
  ],
})
export class ChartsPageModule { }
