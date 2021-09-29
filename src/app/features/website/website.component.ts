import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/http/auth.service';
import { UserStateService } from 'src/app/core/state-managments/users-state/user-state.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';
import * as UsersAuthStateActions from 'src/app/core/state-ngrx/users-state/user-auth-state.actions';


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  loggedName: string;

  constructor(
    private authService: AuthService,
    private userState: UserStateService,
    private store: Store<fromApp.IAppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.getLoggedUserName();
  }

  getLoggedUserName() {
    this.store.select('usersAuthState')
      .subscribe(stateData => {
        console.log(stateData);
        console.log(stateData.user);
        console.log(stateData.user.name);
        if (stateData.user) {
          this.loggedName = stateData.user.name;
        } else {
          this.loggedName = null;
        }
      });
  }

  navigateInsideWebsite(insideAppRouteUrl: string) {
    insideAppRouteUrl = insideAppRouteUrl.toLowerCase();
    this.router.navigate([`website/${insideAppRouteUrl}`]);
  }

  logOut() {
    this.store.dispatch(new UsersAuthStateActions.Logout());
  }
}
