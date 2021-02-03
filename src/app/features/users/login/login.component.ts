import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/Models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Core/authentication/http/auth.service';
import { UserStateService } from 'src/app/Core/state-managments/users-state/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  isValidFormSubmitted: boolean = false;
  regex = new RegExp("((?=.*[0-9])(?=.*[A-Z]))");

  loginUser: UserModel;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userState: UserStateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginUser = new UserModel();
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

  onSubmit(form: NgForm) {

    this.isValidFormSubmitted = false;
    this.loading = false;
    if (form.invalid) {
      return;
    }

    this.isValidFormSubmitted = true;
    this.loading = true;
    this.authService.login(this.loginUser).subscribe(
      res => {
        if (res) {
          this.userState.userLoggingIn(res);
          this.router.navigate(['/website']);
          this.loading = false;
        }
      },
      err => {
        this.loading = false;
        this.dialog.open(ErrorElementsDialog, {
          data: { error: err }
        });
        console.log(err["message"]);
      });
  }
}
@Component({
  selector: 'dialog-elements-dialog',
  template: `<h1 mat-dialog-title>Oops...</h1>
  <div mat-dialog-content>{{data.error["message"]}}</div>
  <div mat-dialog-actions><button class="btn-dialog close-btn" (click)="closeDialog()"  mat-dialog-close>Close</button></div>`,
  styleUrls: ['./login.component.css']
})
export class ErrorElementsDialog {
  constructor(
    public dialogRef: MatDialogRef<ErrorElementsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { error: string }) { }

  closeDialog() {
    this.dialogRef.close();
  }
}

