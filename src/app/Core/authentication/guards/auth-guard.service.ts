import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStateService } from 'src/app/core/state-managments/users-state/user-state.service';
// import { ManagerPageComponent } from 'src/app/features/website/questions-management/manager-page/manager-page.component';

@Injectable({
  providedIn: 'root'
})
// , CanDeactivate<ManagerPageComponent>
export class AuthGuardsService implements CanActivate {
  routeURL: string;

  constructor(private router: Router, private userState: UserStateService) {
    this.routeURL = this.router.url;
  }
  // canDeactivate(component: ManagerPageComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   throw new Error('Method not implemented.');
  // }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (this.userState.isLoggedIn() && this.routeURL !== '/users/login') {
      // assign '/login' in 'routeURL' to
      // avoid get into infinite loop
      this.routeURL = '/users/login';
      // when the user is not logged in,
      // instead of just returning false
      // inject router and redirect to '/login' or any other view
      this.router.navigate(['/users/login']);
      return false;
    } else {
      // re-assign current route URL to 'routeURL'
      // when the user is logged in
      this.routeURL = this.router.url;
      // just return true - if user is logged in
      return true;
    }
  }
  //TODO-finish the auth-guard
}
