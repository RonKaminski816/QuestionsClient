import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsiteComponent } from 'src/app/features/website/website.component';
import { AuthService } from '../http/auth.service';
import { UserStateService } from 'src/app/core/state-managments/users-state/user-state.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';
import { flatMap, map } from 'rxjs/operators';
import { SnackbarService } from '../../popup-messages/snackbar/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<WebsiteComponent> {

  constructor(
    private userService: AuthService,
    public router: Router,
    private store: Store<fromApp.IAppState>,
    private snackbars: SnackbarService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.userService.isLoggedIn() && this.router.url !== '/users/login') {
    //   // when the user is not logged in,
    //   // instead of just returning false
    //   // inject router and redirect to '/login' or any other view
    //
    //   return false;
    // } else {
    // just return true - if user is logged in
    // return true;
    // }

    return this.store.select('usersAuthState').pipe(
      map(authState => {
        if (authState.user.id === '' || authState.user.token === '') {
          this.router.navigate(['users', 'login']);
          return false;
        }
        return true;
      }),

    );
  }


  canDeactivate(component: WebsiteComponent): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.store.select('usersAuthState').pipe(
      map(authState => {
        if (authState.user.id === '' || authState.user.token === '') {
          return true;
        }
        return false;
      }),

    );
  }

}
