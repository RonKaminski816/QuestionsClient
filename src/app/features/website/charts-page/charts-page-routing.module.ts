import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsViewComponent } from './charts-view/charts-view.component';



const routes: Routes = [
    { path: '', component: ChartsViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsPageRoutingModule { } 