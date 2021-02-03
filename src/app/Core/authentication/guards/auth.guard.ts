import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsiteComponent } from 'src/app/features/website/website.component';
import { AuthService } from '../http/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<WebsiteComponent> {

  routeURL: string;

  constructor(public authService: AuthService, public router: Router) { this.routeURL = this.router.url }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn() && this.router.url !== '/users/login') {
      // when the user is not logged in,
      // instead of just returning false
      // inject router and redirect to '/login' or any other view
      this.router.navigate(['users', 'login']);
      return false;
    } else {
      // just return true - if user is logged in
      return true;
    }
  }


  canDeactivate(component: WebsiteComponent): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    const canLeave = !this.authService.isLoggedIn();
    return canLeave;
  }

}
