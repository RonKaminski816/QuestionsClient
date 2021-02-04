import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WebsiteComponent } from "./website.component";
import { ChartsViewComponent } from "./charts-page/charts-view/charts-view.component";
import { ManagerPageComponent } from "./questions-management/manager-page/manager-page.component";
import { AuthGuard } from "src/app/core/authentication/guards/auth.guard";


// { path: 'login', loadChildren:() => import('./features/users/users.module').then(m => m.UsersModule) },
const websiteRoutes: Routes = [
    {
        path: '',
        component: WebsiteComponent,
        
        children: [
            // { path: '', redirectTo: 'manager', pathMatch: 'full' },
            // { path: 'manager',  component: ManagerPageComponent },
            // { path: 'charts',  component: ChartsViewComponent, },
            { path: '', redirectTo: 'manager', pathMatch: 'full' },
            { path: 'manager', loadChildren: () => import('./questions-management/questions-management.module').then(m => m.QuestionsManagementModule) },
            { path: 'charts', loadChildren: () => import('./charts-page/charts-page.module').then(m => m.ChartsPageModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(websiteRoutes)],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }