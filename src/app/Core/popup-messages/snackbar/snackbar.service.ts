import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

   openSimpleTextSnackBar(content: string) {
    this._snackBar.open(content, 'close', {
      duration: 4000,
      panelClass:['snackbar-blue']
      //the class is set in style.css file
    });
  }
}
