import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerPageComponent } from './manager-page/manager-page.component';



const routes: Routes = [
    { path: '', component: ManagerPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsManagementRoutingModule { } 