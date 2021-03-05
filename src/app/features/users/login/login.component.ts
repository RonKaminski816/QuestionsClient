import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserModel } from 'src/app/shared/models/iuser.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/http/auth.service';
import { UserStateService } from 'src/app/core/state-managments/users-state/user-state.service';
import { OverlayViewService } from 'src/app/shared/services/overlay-view/overlay-view.service';

import { Store } from '@ngrx/store';
import * as UserStateActions from "src/app/core/state-ngrx/users-state/user-auth-state.actions";
//convention to describe an import to my reducer and/or state for a certain part of my application
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // passwordInputType: string = "password";
  // passwordInputVisibility: boolean = false;
  loading = false;
  isValidFormSubmitted: boolean = false;
  regex = new RegExp("((?=.*[0-9])(?=.*[A-Z]))");

  showErrorModal = { canDisplay: false, errorMessage: null };

  loginUsername: string = '';
  loginPassword: string = '';

  // loginUser: IUserModel;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.IAppState>,
    private userState: UserStateService,
    // public dialog: MatDialog,
    private overlayViewService: OverlayViewService) { }

  ngOnInit(): void {
    this.setAuthState()
    //this.isFromRegister();
  }
  // private isFromRegister() {
  //   this.route.paramMap.subscribe((params: ParamMap) => {
  //     let username = params.get("username");
  //     if (username != null && username != '') {
  //       this.loginUser.username = username;
  //     }
  //   },
  //     error => console.log(error)
  //   );
  // }

  setAuthState() {
    this.store.select('usersAuthState').subscribe(authState => {
      this.loading = authState.loading;
      if (authState.authError.message !== null) {
        this.openErrorModal(authState.authError.message);
        this.loginPassword = '';
        console.log(authState.authError.message);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    this.loading = false;
    if (form.invalid) {
      return;
    }
    // setTimeout(() => {
    //   console.log('end timeout');
    // }, 5000);

    this.isValidFormSubmitted = true;
    this.loading = true;
    // this.authService.login(this.loginUser).subscribe(
    //   res => {
    //     if (res) {
    //       this.router.navigate(['/website']);
    //       this.loading = false;
    //     }
    //   },
    //   err => {
    //     this.loading = false;
    //     // this.dialog.open(ErrorElementsDialog, {
    //     //   data: { error: err }
    //     // });
    //     this.openErrorModal(err["message"]);
    //     this.loginUser.password = "";
    //     console.log(err["message"]);
    //   });
    //console.log(this.loginUser.username + '//' + this.loginUser.password);
    this.store.dispatch(new UserStateActions.LoginStart({ username: this.loginUsername, password: this.loginPassword }));

  }

  // onPasswordInputVisibility(){
  //   this.passwordInputVisibility = !this.passwordInputVisibility;
  //   if(this.passwordInputVisibility === true){
  //     this.passwordInputType = "text";
  //   }else{
  //     this.passwordInputType = "password";
  //   }
  // }

  openErrorModal(errorMessage: string) {
    if (!errorMessage || errorMessage === '') {
      errorMessage = 'Somthing went wrong, please try again.';
    }
    this.overlayViewService.overlayIsOpen();
    this.showErrorModal = { canDisplay: true, errorMessage: errorMessage }
  }

  closeErrorModal(event: any) {
    if (event.target.id === "login-error-modal" || event.target.id === "cancel-error-modal") {
      this.overlayViewService.overlayIsClose()
      this.showErrorModal = { canDisplay: false, errorMessage: null }
      this.store.dispatch(new UserStateActions.ClearError());
    }
  }
}
// @Component({
//   selector: 'dialog-elements-dialog',
//   template: `<h1 dialog-title>Oops...</h1>
//   <div mat-dialog-content>{{data.error["message"]}}</div>
//   <div mat-dialog-actions><button class="btn-dialog close-btn" (click)="closeDialog()"  mat-dialog-close>Close</button></div>`,
//   styleUrls: ['./login.component.css']
// })
// export class ErrorElementsDialog {
//   constructor(
//     public dialogRef: MatDialogRef<ErrorElementsDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: { error: string }) { }

//   closeDialog() {
//     this.dialogRef.close();
//   }
// }

