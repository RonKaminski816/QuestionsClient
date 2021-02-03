import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/authentication/http/auth.service';
import { UserStateService } from 'src/app/Core/state-managments/users-state/user-state.service';


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  loggedName: string //= "Ron";
  constructor(
    private authService: AuthService,
   // private userState: UserStateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getLoggedName();
  }
  getLoggedName() {
    this.authService.retrieveMappedLoggedInUser()
      .subscribe(res => {
        if (res) {          
          this.loggedName = res.username
        } else {
          this.loggedName = null;
        }});
  }

  navigateInsideWebsite(insideAppRouteUrl: string) {
    insideAppRouteUrl = insideAppRouteUrl.toLowerCase();
    this.router.navigate([`website/${insideAppRouteUrl}`]);
  }

  logOut() {
    if (this.authService.logout()) {
      this.router.navigate(['/users/login']);
    }
  }

}
