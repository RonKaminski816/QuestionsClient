import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/materials.module';
import { QuestionsManagementRoutingModule } from './questions-management-routing.module';
import { ManagerPageComponent } from './manager-page/manager-page.component';

import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';




@NgModule({
  declarations: [
    ManagerPageComponent,
    QuestionsListComponent,
    QuestionEditComponent,
  ],
  imports: [
    CommonModule,
    QuestionsManagementRoutingModule,
    MaterialModule,
    FormsModule,
  ],
})
export class QuestionsManagementModule { }
