import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { IUserModel } from "src/app/shared/models/iuser.model";
import { environment } from "src/environments/environment";
import * as UserStateActions from "./user-auth-state.actions";
import { Router } from "@angular/router";

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

  loginSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStateActions.LOGIN_SUCCESS),
      tap(() => {
        this.router.navigate(['/website']);
      })
    );
  }, { dispatch: false });

  logoutRedirect = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserStateActions.LOGOUT),
      tap(() => {
        this.router.navigate(['/users/login']);
      })
    );
  }, { dispatch: false });


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) { }

  private handleError(error: any) {
    let msg = error.error;
    return throwError(msg);
  }
}
