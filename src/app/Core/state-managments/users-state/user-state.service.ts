import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/Models/user.model';
import { LocalStorageService } from 'src/app/core/storages/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private sharedUserName = new BehaviorSubject<UserModel>(new UserModel);

  constructor(private localStorageService: LocalStorageService) {
    if (this.isLoggedIn()) {
      const LoggedInUser = JSON.parse(this.localStorageService.getItem('currentUser'));
      this.mapUserLogged(LoggedInUser);
    }
  }
//TODO Check Why the service isn't running

  isLoggedIn(): boolean {
    const isLoggedIn = JSON.parse(this.localStorageService.getItem('isLogged'));
    if (!isLoggedIn) {
      this.handleIsLoggedin(false);
      return false;
    }
    return isLoggedIn;
  }

  mapUserLogged(user?: UserModel) {
    this.sharedUserName.next(user);
  }

  public retrieveMappedLoggedInUserNameState(): Observable<UserModel> {
    return this.sharedUserName.asObservable();
  }

  currentUserLoggingOut() {
    if (this.handleIsLoggedin(false) && this.localStorageService.removeItem('currentUser')) {
      this.mapUserLogged();
    }
  }

  userLoggingIn(user) {
    if (this.handleIsLoggedin(true) && this.localStorageService.setItem('currentUser', JSON.stringify(user))) {
      this.mapUserLogged(user);
    }
  }

  private handleIsLoggedin(value?): boolean {
    return this.localStorageService.setItem('isLogged', value);
  }
}


