import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { IUserModel } from "src/app/shared/models/iuser.model";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "../../storages/local-storage/local-storage.service";

import * as UserStateActions from "./user-auth-state.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";


/**The idea in the effects class is that I don't change any state but that I can
 * execute any other code that should happen when such action is dispatched.
 */
@Injectable()
export class UserAuthStateEffects {

  private usersPath = environment.baseUrl + environment.userPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization":


  userLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(UserStateActions.LOGIN_START),
      switchMap((questionsData: UserStateActions.LoginStart) => {
        return this.http.post<{ message: string, user: IUserModel, token: string }>(`${this.usersPath}/login`, JSON.stringify(questionsData.payload), { headers: this.headers })
          .pipe(
            map((res) => {
              res.user.token = res.token;
              console.log(res.message);
              this.localStorageService.setItem('isLogged', true);
              this.localStorageService.setItem('currentUser', res.user);
              return new UserStateActions.LoginSuccess(res.user);
            }),
            catchError((err) => {
              return this.handleAuthError(err);
            }),
          )
      })
    )
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(UserStateActions.AUTO_LOGIN),
      map(() => {
        const isLoggedIn = this.localStorageService.getItem<boolean>('isLogged');
        const userData = this.localStorageService.getItem<IUserModel>('currentUser');
        if (!userData || !isLoggedIn && (!userData.token || userData.token === null || userData.token === '')) {
          return new UserStateActions.Logout()
        }
        return new UserStateActions.LoginSuccess(userData);
      })
    ))

  loginSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStateActions.LOGIN_SUCCESS),
      tap(() => {
        this.router.navigate(['/website']);
      })
    );
  }, { dispatch: false });

  userLogout = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStateActions.LOGOUT),
      tap(() => {
        this.localStorageService.removeItem('currentUser');
        this.localStorageService.setItem('isLogged', false);
        this.router.navigate(['/users/login']);
      })
    );
  }, { dispatch: false });//If I don't need to return a new action

  //NgRx Actions new convNew conventional syntax
  // userLogin = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserStateActions.LOGIN_START),
  //     switchMap(({ username, password }) => {
  //       return this.http.post<{ message: string, user: IUserModel, token: string }>(`${this.usersPath}/login`, JSON.stringify({ username, password }), { headers: this.headers })
  //         .pipe(
  //           map((res) => {
  //             res.user.token = res.token;
  //             console.log(res.message);
  //             this.localStorageService.setItem('isLogged', true);
  //             this.localStorageService.setItem('currentUser', res.user);
  //             return new UserStateActions.LoginSuccess(res.user);
  //           }),
  //           catchError((err) => {
  //             this.handleError(err);
  //             console.log(err["error"]);
  //             //Must use 'of' because without this operator the effect wont work again after catching an error.
  //             return of(new UserStateActions.LoginFail({ message: err.error.message }));
  //           }),
  //         )
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  private handleAuthError(error: any) {
    console.log(error["error"]);
    //Must use 'of' because without this operator the effect wont work again after catching an error.
    return of(new UserStateActions.AuthFailure({ message: error.error.message }));
  }
}
