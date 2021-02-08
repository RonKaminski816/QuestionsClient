import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { QuestionModel } from 'src/app/core/models/question.model';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {

  canLeave: boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;
  reason: string;

  qList: QuestionModel[];
  isSideBarOpen: boolean;

  actionedQuestionId: number;
  actionedQuestion: QuestionModel;
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

  getActionedQuestion(question: QuestionModel) {
    if (question) {
      this.actionedQuestion = question;
    }
    else {
      this.actionedQuestion = new QuestionModel();
    }
    this.openSideBar();
  //this.sidenav.open();
  }


  getUpdatedQuestion(ques: QuestionModel) {
    try {
      if (ques) {
        this.closeSideBar('ron');       
        this.questionsState.updateQuestion(ques);
      }
    } catch (err) {
      console.log(`An error occurred: ${err['message']}`);
    }
  }

  getNewQuestion(ques: QuestionModel) {
    if (ques) {
      this.qList = [...this.qList, ques];
      this.questionsState.addQuestion(ques);
     // this.sidenav.close();
    }
  }

openSideBar(){
  this.isSideBarOpen = true;
}
  closeSideBar(reason: string) {
    this.isSideBarOpen = false;
    this.reason = reason;
    //this.sidenav.close();
  }

}

