import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';
import { OverlayViewService } from 'src/app/shared/services/overlay-view/overlay-view.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {

  // @ViewChild('sidenav') sidenav: MatSidenav;

  canLeave: boolean = false;
  reason: string;

  /** This is the data format becacause this is the format of our store. */
  // qList: Observable<{ questions: IQuestionModel[] }>;
  qList: IQuestionModel[];
  isSideBarOpen: boolean;

  actionedQuestion: IQuestionModel;
  constructor(private questionsState: QuestionsStateService,
    /**The store Type is a description of the different parts we have in the store.
    * here the type should be a JS object where we have a 'questionsState' key (it has 
    * to be the name I chose as a key of the JS object inside the forRoot() in app.module).
    * And the type of the data stored in that questionsState area is now not the reducer function
    * but what does the reducer finction yields(מניב). It yields a state of the type of the JS object of the state.*/
    private store: Store<{ questionsState: { questions: IQuestionModel[] } }>,
    private snackbarService: SnackbarService,
    private overlayViewService: OverlayViewService) { }

  ngOnInit(): void {
    /**In the the questionsState part of the store We select here, we get an object with
     *  questions thats holds an array of IQuestionModel ({ questions: IQuestionModel[] }) */
    // this.qList = this.store.select('questionsState');
    this.getAllQustions();
  }

  private getAllQustions() {
    return this.questionsState.retrieveMappedQuestionListState().subscribe(
      res => {
        this.qList = res;
      },
      error => this.snackbarService.openSimpleTextSnackBar(`An error occurred, please refresh the page: ${error['message']}`)
    );
  }

  getActionedQuestion(question?: IQuestionModel) {
    if (question) {
      this.actionedQuestion = question;
    }
    this.openSideBar();
  }

  getUpdatedQuestion(ques: IQuestionModel) {
    try {
      if (ques) {
        this.questionsState.updateQuestion(ques);
      }
    } catch (err) {
      console.log(`An error occurred: ${err['message']}`);
    }
  }

  getNewQuestion(ques: IQuestionModel) {
    if (ques) {
      // this.qList = [...this.qList, ques];
      this.questionsState.addQuestion(ques);
    }
  }

  getDeletedQuestionId(questionId: string){
    if(questionId || questionId !== '' || questionId !== null){
      this.questionsState.deleteQuestion(questionId);
    }
  }

  isSticky: boolean;
  openSideBar() {
    let sidebar = document.getElementById("sidebar");
    let sticky = sidebar.offsetTop;
    if (window.pageYOffset >= sticky) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
    this.overlayViewService.overlayIsOpen();
    this.isSideBarOpen = true;
    //this.sidenav.open();
  }

  closeSideBar(reason: string) {
    !this.overlayViewService.overlayIsClose()
    this.isSideBarOpen = false;
    console.log(`side bar closed because ${reason}`);
    this.actionedQuestion = { ...{ id: '', name: '', creationDate: '', description: '' } };
    //this.sidenav.close();
  }
}