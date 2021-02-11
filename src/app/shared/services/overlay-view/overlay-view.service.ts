import { Injectable } from '@angular/core';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';


/**Only adjust the html body to an overlay html element when the element displaying or closing*/
@Injectable({
  providedIn: 'root'
})
export class OverlayViewService {

  constructor(private snackbarService: SnackbarService) {  }

  /**Adjust the html body when the overlay element is displaying*/
  overlayIsOpen() {
    try {
      return document.body.classList.toggle("overlay-entity-open", true);
    } catch (error) {
      this.snackbarService.openSimpleTextSnackBar(`An error occurred, please refresh the page: ${error['message']}`)
    }
  }

  /**Adjust the html body when the overlay element is closing*/
  overlayIsClose(): boolean {
    try {
      return document.body.classList.toggle("overlay-entity-open", false);
    } catch (error) {
      this.snackbarService.openSimpleTextSnackBar(`An error occurred, please refresh the page: ${error['message']}`)
    }
  }
}
