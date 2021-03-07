import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WebsiteComponent } from "./website.component";
import { AuthGuard } from "src/app/core/authentication/guards/auth.guard";
import { ChartsViewComponent } from "./charts-page/charts-view/charts-view.component";
import { ManagerPageComponent } from "./questions-management/manager-page/manager-page.component";
import { QuestionsResolverService } from "src/app/core/navigation/resolvers/questions.resolver";


// { path: 'login', loadChildren:() => import('./features/users/users.module').then(m => m.UsersModule) },
const websiteRoutes: Routes = [
  {
    path: '',
    component: WebsiteComponent,

    children: [
      // { path: '', redirectTo: 'manager', pathMatch: 'full' },
      // { path: 'manager',  component: ManagerPageComponent },
      // { path: 'charts',  component: ChartsViewComponent, },
      {
        path: 'manager',
        loadChildren: () => import('./questions-management/questions-management.module').then(m => m.QuestionsManagementModule),
        canActivate: [AuthGuard],
        resolve: [QuestionsResolverService]
      },
      {
        path: 'charts',
        loadChildren: () => import('./charts-page/charts-page.module').then(m => m.ChartsPageModule),
        canActivate: [AuthGuard],
        resolve: [QuestionsResolverService]
      },
      {
        path: '',
        redirectTo: 'manager',
        pathMatch: 'full'
      },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(websiteRoutes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
