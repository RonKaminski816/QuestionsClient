import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { QuestionsManagementModule } from './questions-management/questions-management.module'
import { ChartsPageModule } from "./charts-page/charts-page.module";
import { WebsiteComponent } from './website.component';



@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    // QuestionsManagementModule,
    // ChartsPageModule,
    WebsiteRoutingModule,
  ],
})
export class WebsiteModule { }
