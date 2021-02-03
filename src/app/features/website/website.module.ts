import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { QuestionsManagementModule } from './questions-management/questions-management.module'
import { ChartsPageModule } from "./charts-page/charts-page.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
  ],
})
export class WebsiteModule { }
