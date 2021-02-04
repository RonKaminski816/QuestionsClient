import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../storages/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sharedUser = new BehaviorSubject<UserModel>(new UserModel);
  private usersPath = environment.baseUrl + environment.userPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization": 

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { 
    if (this.isLoggedIn()) {
      const LoggedInUser = JSON.parse(this.localStorageService.getItem('currentUser'));
      this.mapUserLogged(LoggedInUser);
    }
  }

  mapUserLogged(user?: UserModel) {
    this.sharedUser.next(user);
  }

  public retrieveMappedLoggedInUser(): Observable<UserModel> {
    return this.sharedUser.asObservable();
  }


  login(loginUser: UserModel): Observable<UserModel> {
    return this.http.post<{ user: UserModel, token: string }>(`${this.usersPath}/login`, JSON.stringify(loginUser), { headers: this.headers })
      .pipe(catchError(this.handleError),
        map(res => {
          if (this.handleIsLoggedin(true) && this.localStorageService.setItem('currentUser', JSON.stringify(res.user))) {
            this.mapUserLogged(res.user);
            this.setSession(res.token)
            return res.user
          }
        }));
  }

  logout() {
    const isTokenRemoved = this.localStorageService.removeItem("id_token");
    const isLoggedUserRemoved = this.localStorageService.removeItem('currentUser');
    if (isTokenRemoved && isLoggedUserRemoved) {
      this.handleIsLoggedin(false)
      this.mapUserLogged();
    }
    return isLoggedUserRemoved;
  }

  isLoggedIn(): boolean {
    const isLoggedIn = JSON.parse(this.localStorageService.getItem('isLogged'));
    if (!isLoggedIn) {
      this.handleIsLoggedin(false);
      return false;
    }
    return isLoggedIn;
  }

  getToken() {
    return this.localStorageService.getItem('id_token');
  }

  private setSession(authToken) {
    this.localStorageService.setItem('id_token', authToken);
  }

  private handleIsLoggedin(value: boolean): boolean {
    return this.localStorageService.setItem('isLogged', `${value}`);
  }

  private handleError(error: any) {
    let msg = error["error"];
    return throwError(msg);
  }
}