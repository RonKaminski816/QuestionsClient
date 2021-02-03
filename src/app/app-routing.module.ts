import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { AuthGuardsService } from 'src/app/Core/authentication/guards/auth-guard.service';

//

const routes: Routes = [
  { path: '', redirectTo: 'website', pathMatch: 'full' },
  { path: 'website', loadChildren:() => import('./features/website/website.module').then(m => m.WebsiteModule) , canActivate:[AuthGuardsService] },
  { path: 'users', loadChildren:() => import('./features/users/users.module').then(m => m.UsersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


