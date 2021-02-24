import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserModel } from 'src/app/shared/models/iuser.model';
import { LocalStorageService } from '../../storages/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private sharedUserName = new BehaviorSubject<IUserModel>({id: '', username:'', password:''});

  constructor(private localStorageService: LocalStorageService) {
    if (this.isLoggedIn()) {
      const LoggedInUser = JSON.parse(this.localStorageService.getItem('currentUser'));
      this.mapUserLogged(LoggedInUser);
    }
  }

  isLoggedIn(): boolean {
    const isLoggedIn = JSON.parse(this.localStorageService.getItem('isLogged'));
    const getToken = this.localStorageService.getItem('id_token');
    if (!isLoggedIn && !getToken || getToken === null || getToken === '') {
    // if (!isLoggedIn) {
      this.currentUserLoggingOut();
      return false;
    }
    return isLoggedIn;
  }

  mapUserLogged(user?: IUserModel) {
    this.sharedUserName.next(user);
  }

  public retrieveMappedLoggedInUser(): Observable<IUserModel> {
    return this.sharedUserName.asObservable();
  }

  userLoggingIn(user) {
    if (this.handleIsLoggedin(true) && this.localStorageService.setItem('currentUser', JSON.stringify(user))) {
      this.mapUserLogged(user);
    }
  }

  currentUserLoggingOut() {
    if (this.handleIsLoggedin(false) && this.localStorageService.removeItem('currentUser')) {
      this.mapUserLogged();
    }
  }


  private handleIsLoggedin(value?): boolean {
    return this.localStorageService.setItem('isLogged', value);
  }
}


