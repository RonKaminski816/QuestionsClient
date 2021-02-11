import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsService } from 'src/app/core/http/questions/questions.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnChanges {

  loading: boolean = false;
  submitted: boolean = false;

  /*properties for the form binding, I did it because the 
  question reference making the question in the table to 
  change together with the edit and before the submiting even if 
  I cancel the editing it changes but without sending an http request  */
  questionName: string = '';
  questionDescription: string = '';

  @Input() actionedQuestion: IQuestionModel;

  @Output() onNewQuestion: EventEmitter<IQuestionModel> = new EventEmitter();

  @Output() onUpdatededQuestion: EventEmitter<IQuestionModel> = new EventEmitter();

  @Output() onCancelActions: EventEmitter<string> = new EventEmitter();

  constructor(private questionsService: QuestionsService, private snackbarService: SnackbarService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.actionedQuestion) {
      this.questionName = this.actionedQuestion.name;
      this.questionDescription = this.actionedQuestion.description;
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    try {
      if (!this.actionedQuestion || this.actionedQuestion.id.trim().length < 1) {
        this.actionedQuestion = { id: '', name: this.questionName, creationDate: '', description: this.questionDescription }
        this.createQuestion(this.actionedQuestion);
      } else {
        this.actionedQuestion.name = this.questionName;
        this.actionedQuestion.description = this.questionDescription;
        this.editQuestion(this.actionedQuestion);
      }
    } catch (error) {
      this.snackbarService.openSimpleTextSnackBar(error["message"]);
    }
  }

  private createQuestion(createdQuestion: IQuestionModel) {
    createdQuestion.creationDate = new Date().toString();
    this.questionsService.addQuestion(createdQuestion).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.snackbarService.openSimpleTextSnackBar(`${res.message}: ${res.qa.id}`);
        this.onNewQuestion.emit(res.qa);
        this.canCloseActions(`Question ${res.qa.id} was created`);
      }, err => {
        this.submitted = false;
        this.loading = false;
        console.log(err["message"])
        this.snackbarService.openSimpleTextSnackBar(err["message"]);
      }
    );
  }

  private editQuestion(updatedQuestion: IQuestionModel) {
    this.questionsService.updateQuestion(updatedQuestion).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.snackbarService.openSimpleTextSnackBar(`Question ${res.id} has been updated`);
        this.onUpdatededQuestion.emit(res);
        this.canCloseActions(`Question ${res.id} was updated`);
      }, err => {
        this.snackbarService.openSimpleTextSnackBar(`An error occurred while updating question ${updatedQuestion.id}, please try again`);
        console.log(`Something went wrong please try again(${err["message"]})`)
        this.submitted = false;
        this.loading = false;
      }
    );
  }

  canCloseActions(reason: string): void {
    this.onCancelActions.emit(reason);
  }
}