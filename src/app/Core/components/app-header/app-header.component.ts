import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/http/auth.service';
import { UserStateService } from '../../state-managments/users-state/user-state.service';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  loggedName: string;
  constructor(
    private userState: UserStateService,
    private authService: AuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.getLoggedName();
  }

  getLoggedName() {
    this.userState.retrieveMappedLoggedInUserNameState()
      .subscribe(res => {
        if (res) {          
          this.loggedName = res.username
        } else {
          this.loggedName = null;
        }});
  }

  navigateInsideApp(insideAppRouteUrl: string) {
    insideAppRouteUrl = insideAppRouteUrl.toLowerCase();
    this.router.navigate([insideAppRouteUrl]);
  }

  logOut() {
    if (this.authService.logout()) {
      this.userState.currentUserLoggingOut();
      this.navigateInsideApp('/users/login');
    }
  }
}
