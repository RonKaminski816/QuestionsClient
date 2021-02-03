import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from './core/state-managments/users-state/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QuestionsClient';

  // ,  private userState: UserStateService
  constructor(private router: Router) { }

  ngOnInit() {
    // alert(this.userState.isLoggedIn());
    // Manually triggering initial navigation
    // this.router.initialNavigation();
  }
}
