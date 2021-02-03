import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardsService } from "src/app/Core/authentication/guards/auth-guard.service";


// { path: 'login', loadChildren:() => import('./features/users/users.module').then(m => m.UsersModule) },
const websiteRoutes: Routes = [
    { path: '', redirectTo: 'manager', pathMatch: 'full' },
    { path: 'manager', loadChildren: () => import('./questions-management/questions-management.module').then(m => m.QuestionsManagementModule) },
    { path: 'charts', loadChildren: () => import('./charts-page/charts-page.module').then(m => m.ChartsPageModule) },

];

@NgModule({
    imports: [RouterModule.forChild(websiteRoutes)],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }