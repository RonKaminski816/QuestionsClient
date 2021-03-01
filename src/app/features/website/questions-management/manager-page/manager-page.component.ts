import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IQuestionModel } from 'src/app/shared/models/iquestion.model';

import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';
import { OverlayViewService } from 'src/app/shared/services/overlay-view/overlay-view.service';

import { Store } from '@ngrx/store';
import * as QuestionsStateActions from 'src/app/core/state-ngrx/questions-state/questions-state.actions';
//convention to describe an import to my reducer and/or state for a certain part of my application
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit, OnDestroy {

  // @ViewChild('sidenav') sidenav: MatSidenav;

  canLeave: boolean = false;
  reason: string;
  isSideBarOpen: boolean;
  isSticky: boolean;

  /** This is the data format becacause this is the format of our store. */
  // qList: Observable<{ questions: IQuestionModel[] }>;
  qList: IQuestionModel[];
  actionedQuestion: IQuestionModel;
  private subscription: Subscription;

  constructor(private questionsState: QuestionsStateService,
    private store: Store<fromApp.IAppState>,//=== <{questionsState: { questions: IQuestionModel[] }}>
    private snackbarService: SnackbarService,
    private overlayViewService: OverlayViewService) { }

  ngOnInit(): void {
    /**In the the questionsState part of the store we selected here, we get an object with
     *  questions thats holds an array of IQuestionModel ({ questions: IQuestionModel[] }) */
    this.subscription = this.getAllQustions();
  }

  private getAllQustions() {
    // return this.questionsState.retrieveMappedQuestionListState().subscribe(
    return this.store.select('questionsState').subscribe(
      stateData => this.qList = stateData.questions,
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
        console.log(`getUpdatedQuestion at manager-page component before store dispatch`)
        this.store.dispatch(new QuestionsStateActions.UpdateQuestion(ques));
        // this.questionsState.updateQuestion(ques);
      }
    } catch (err) {
      console.log(`An error occurred: ${err['message']}`);
    }
  }

  getNewQuestion(ques: IQuestionModel) {
    if (ques) {
      // this.qList = [...this.qList, ques];
      // this.questionsState.addQuestion(ques);
      //We create a new object based on the AddQuestion class that
      //based in the QuestionsStateActions object.
      this.store.dispatch(new QuestionsStateActions.AddQuestion(ques));
    }
  }

  getDeletedQuestionId(questionId: string) {
    console.log(`question to delete id ${questionId}, inside delete function of q-manager comp`);
    if (questionId || questionId !== '' || questionId !== null) {
      this.store.dispatch(new QuestionsStateActions.DeleteQuestion(questionId));
      // this.questionsState.deleteQuestion(questionId);
    }
  }

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
    this.actionedQuestion = { ...{ id: '', name: '', creationDate: undefined, description: '' } };
    //this.sidenav.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
