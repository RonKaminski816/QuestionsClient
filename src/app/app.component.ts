import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/http/auth.service';
import { Store } from '@ngrx/store';
import * as UserStateActions from "src/app/core/state-ngrx/users-state/user-auth-state.actions";
//convention to describe an import to my reducer and/or state for a certain part of my application
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QuestionsClient';

  constructor(private authService: AuthService, private store: Store<fromApp.IAppState>,) { }

  ngOnInit() {
    // this.authService.autoLogin();
    this.store.dispatch(new UserStateActions.AutoLogin());
  }
}
