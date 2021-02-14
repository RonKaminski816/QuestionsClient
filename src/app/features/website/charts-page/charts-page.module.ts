import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { SharedModule } from "src/app/shared/shared.module";
import { ChartsPageRoutingModule } from './charts-page-routing.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { TreeViewComponent } from './tree-view/tree-view.component';




@NgModule({
  declarations: [ChartsViewComponent, TreeViewComponent],
  imports: [
    CommonModule,
    ChartsPageRoutingModule,
    SharedModule,
    FormsModule,
    NzDatePickerModule,
  ],
})
export class ChartsPageModule { }
