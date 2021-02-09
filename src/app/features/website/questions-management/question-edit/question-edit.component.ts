import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { QuestionsService } from '../Services/questions.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnChanges {

  loading: boolean = false;
  submitted: boolean = false;
  canceled: boolean;

  @Input() actionedQuestion: IQuestionModel;

  @Output() onNewQuestion: EventEmitter<IQuestionModel> = new EventEmitter();

  @Output() onUpdatededQuestion: EventEmitter<IQuestionModel> = new EventEmitter();

  @Output() onCancelActions: EventEmitter<null> = new EventEmitter();

  constructor(private questionsService: QuestionsService, private snackbarService: SnackbarService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.actionedQuestion);
  }

  ngOnInit(): void {
    this.actionedQuestion = { id: '', name: '', creationDate: '', description: '' }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    try {
      if (this.actionedQuestion.id.trim().length < 1) {
        this.createQuestion();
      } else {
        this.editQuestion();
      }
    } catch (error) {
      alert(error["message"]);
    }
  }

  private createQuestion() {
    this.actionedQuestion.creationDate = new Date().toString();
    this.questionsService.addQuestion(this.actionedQuestion).subscribe(
      res => {
        this.actionedQuestion = { id: '', name: '', creationDate: '', description: '' }
        this.submitted = false;
        this.loading = false;
        this.snackbarService.openSimpleTextSnackBar(`${res.message}: ${res.qa.id}`);
        this.onNewQuestion.emit(res.qa);
      }, err => {
        this.submitted = false;
        this.loading = false;
        console.log(err["message"])
        this.snackbarService.openSimpleTextSnackBar(`An error occurred while add a new question`);
      }
    );
  }

  private editQuestion() {
    this.questionsService.updateQuestion(this.actionedQuestion).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.snackbarService.openSimpleTextSnackBar(`Question ${res.id} has been updated`);
        this.onUpdatededQuestion.emit(res);
      }, err => {
        this.snackbarService.openSimpleTextSnackBar(`An error occurred while updating question ${this.actionedQuestion.id}, please try again`);
        console.log(`Something went wrong please try again(${err["message"]})`)
        this.submitted = false;
        this.loading = false;
      }
    );
  }

  cancelActions(): void {
    this.actionedQuestion = { id: '', name: '', creationDate: '', description: '' }
    this.canceled = true;
    this.onCancelActions.emit();
  }
}
