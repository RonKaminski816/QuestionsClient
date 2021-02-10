import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {

  // @ViewChild('sidenav') sidenav: MatSidenav;

  canLeave: boolean = false;
  reason: string;

  qList: IQuestionModel[];
  isSideBarOpen: boolean;

  actionedQuestionId: number;
  actionedQuestion: IQuestionModel;
  constructor(private questionsState: QuestionsStateService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
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
      this.qList = [...this.qList, ques];
      this.questionsState.addQuestion(ques);
    }
  }

  openSideBar() {
    this.isSideBarOpen = true;
    //this.sidenav.open();
  }

  closeSideBar(reason: string) {
    this.isSideBarOpen = false;
    console.log(`side bar closed because ${reason}`);
    this.actionedQuestion = { ...{ id: '', name: '', creationDate: '', description: '' } };
    //this.sidenav.close();
  }
}