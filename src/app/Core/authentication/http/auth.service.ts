import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserModel } from 'src/app/shared/models/iuser.model';
import { LocalStorageService } from '../../storages/local-storage/local-storage.service';

import { Store } from '@ngrx/store';
import * as UsersAuthStateActions from 'src/app/core/state-ngrx/users-state/user-auth-state.actions';
//convention to describe an import to my reducer and/or state for a certain part of my application
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersPath = environment.baseUrl + environment.userPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization":

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<fromApp.IAppState>,
  ) { }

  autoLogin() {
    if (this.isLoggedIn()) {
      const LoggedInUser = JSON.parse(this.localStorageService.getItem('currentUser'));
      this.store.dispatch(new UsersAuthStateActions.LoginSuccess(LoggedInUser));
    }
  }


  /**Returns if there is a current user that is logged in */
  isLoggedIn(user?:IUserModel): boolean {
    const isLoggedIn = JSON.parse(this.localStorageService.getItem('isLogged'));
    const getToken = this.getToken();
    if (!isLoggedIn && (!getToken || getToken === null || getToken === '') ) {
      this.logout();
      return false;
    }
    return isLoggedIn;
  }

  /**Returns the authentication token value of the current logged in user,
   * or null if the token does not exist.  */
  getToken(): string {
    const userData = JSON.parse(this.localStorageService.getItem('currentUser'));
    if (!userData) {
      return;
    }
    return userData.token && userData.token.trim() !== '' ? null : userData.token
  }

  login(loginUser: IUserModel): Observable<IUserModel> {
    return this.http.post<{ user: IUserModel, token: string }>(`${this.usersPath}/login`, JSON.stringify(loginUser), { headers: this.headers })
      .pipe(catchError(this.handleError),
        map(res => {
          res.user.token = res.token;
          return this.setLoginSession(res.user)
        }));
  }

  logout() {
    this.store.dispatch(new UsersAuthStateActions.Logout());
    this.localStorageService.removeItem('currentUser');
    return this.localStorageService.setItem('isLogged', `${false}`);
  }

  private setLoginSession(user: IUserModel): IUserModel {
    if (user && user !== null) {
      this.localStorageService.setItem('isLogged', `${true}`);
      this.localStorageService.setItem('currentUser', JSON.stringify(user));
      this.store.dispatch(new UsersAuthStateActions.LoginSuccess(user));
    }
    return user
  }

  private handleError(error: any) {
    let msg = error["error"];
    return throwError(msg);
  }

  // private handleIsLoggedin(value?): boolean {
  //   return this.localStorageService.setItem('isLogged', value);
  // }
}
