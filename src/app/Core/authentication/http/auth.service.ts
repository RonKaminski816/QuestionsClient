import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserModel } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../storages/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersPath = environment.baseUrl + environment.userPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization": 

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  login(loginUser: IUserModel): Observable<IUserModel> {
    return this.http.post<{ user: IUserModel, token: string }>(`${this.usersPath}/login`, JSON.stringify(loginUser), { headers: this.headers })
      .pipe(catchError(this.handleError),
        map(res => {
          this.setSession(res.token)
          return res.user
        }));
  }

  logout() {
    return this.localStorageService.removeItem("id_token");
  }

  getToken() {
    return this.localStorageService.getItem('id_token');
  }

  private setSession(authToken) {
    this.localStorageService.setItem('id_token', authToken);
  }

  private handleError(error: any) {
    let msg = error["error"];
    return throwError(msg);
  }
}