import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';
import { Observable } from 'rxjs';
import { AuthService } from '../../http/auth.service';
import { exhaustMap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService, private store: Store<fromApp.IAppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //ngrx way
    return this.store.select('usersAuthState').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers.set("Authorization",
            "Bearer " + user.token)
        });
        return next.handle(modifiedReq);
      })
    );

    /** not ngrx way
     * const idToken = this.authService.getToken();
     *  if (idToken) {
     * const cloned = req.clone({
     *  headers: req.headers.set("Authorization",
     *  "Bearer " + idToken)
     *  });
     *  return next.handle(cloned);
     *  }
     *  else {
     *  return next.handle(req);
     * }
     */
  }
}
