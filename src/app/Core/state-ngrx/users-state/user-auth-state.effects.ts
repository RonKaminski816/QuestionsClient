import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { IUserModel } from "src/app/shared/models/iuser.model";
import { environment } from "src/environments/environment";
import * as UserStateActions from "./user-auth-state.actions";
import { Router } from "@angular/router";
import { LocalStorageService } from "../../storages/local-storage/local-storage.service";

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
              this.localStorageService.setItem('isLogged', `${true}`);
              this.localStorageService.setItem('currentUser', JSON.stringify(res.user));
              return new UserStateActions.LoginSuccess(res.user);
            }),
            catchError((err) => {
              alert("inside login effect catch error");
              this.handleError(err);
              console.log(err["error"]);
              //Must use 'of' because without this operator the effect wont work again after catching an error.
              return of(new UserStateActions.LoginFail({ message: err.error.message }));
            }),
          )
      })
    )
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(UserStateActions.AUTO_LOGIN),
      map(() => {
        const isLoggedIn = JSON.parse(this.localStorageService.getItem('isLogged'));
        const userData = JSON.parse(this.localStorageService.getItem('currentUser'));
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
        this.localStorageService.setItem('isLogged', `${false}`);
        this.router.navigate(['/users/login']);
        console.log("after navigate")
        //TODO fix the logout navigation
      })
    );
  }, { dispatch: false });//If I don't need to return an action


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  private handleError(error: any) {
    let msg = error.error;
    return throwError(msg);
  }
}
