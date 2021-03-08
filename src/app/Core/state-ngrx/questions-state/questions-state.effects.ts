import { Injectable } from "@angular/core";
import { catchError, debounceTime, map, switchMap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionsService } from 'src/app/core/http/questions/questions.service';
import * as QuestionsStateActions from './questions-state.actions';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { IQuestionModel } from "src/app/shared/models/iquestion.model";
import { SnackbarService } from "../../popup-messages/snackbar/snackbar.service";


@Injectable()
export class QuestionsStateEffects {

  private questionsPath = environment.baseUrl + environment.questionsPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization":


  fetchQuestions = createEffect(() =>
    this.actions$.pipe(
      //ofType just allows me to define a filter for which type of
      //effects I want to continue in this abservable pipe I'm creating.
      ofType(QuestionsStateActions.FETCH_QUESTIONS),
      //switchMap allows us to create new observable by taking another observable's data.
      switchMap(() => {
        return this.http.get<{ questions: IQuestionModel[] }>(`${this.questionsPath}/`, { headers: this.headers })
          .pipe(
            map((res) => new QuestionsStateActions.SetQuestions(res.questions)),
            catchError((err) => this.handleError(err)),
          );
      }),
    )
  );

  addQuestion$ = createEffect(() =>
    this.actions$.pipe(
      //ofType just allows me to define a filter for which type of
      //effects I want to continue in this abservable pipe I'm creating.
      ofType(QuestionsStateActions.ADD_QUESTION),
      //switchMap allows us to create new observable by taking another observable's data.
      switchMap((questionsData: QuestionsStateActions.AddQuestion) => {

        return this.http.post<{ message: string, qa?: IQuestionModel }>(`${this.questionsPath}/create`, JSON.stringify(questionsData.payload), { headers: this.headers })
          .pipe(
            map((res) => {
              this.snackbarService.openSimpleTextSnackBar(`${res.message}: ${res.qa.id} - ${res.qa.name}`);
              return new QuestionsStateActions.AddQuestionSuccess(res.qa);
            }),
            catchError((err) => this.handleError(err)),
          );
      }),
    )
  );

  updateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      //ofType just allows me to define a filter for which type of
      //effects I want to continue in this abservable pipe I'm creating.
      ofType(QuestionsStateActions.UPDATE_QUESTION),
      //switchMap allows us to create new observable by taking another observable's data.
      switchMap((questionsData: QuestionsStateActions.UpdateQuestion) => {

        return this.http.put<{ newQuestion: IQuestionModel }>(`${this.questionsPath}/update/${questionsData.payload.id}`, JSON.stringify(questionsData.payload), { headers: this.headers })
          .pipe(
            map(res => {
              this.snackbarService.openSimpleTextSnackBar(`Question ${res.newQuestion.id} has been updated`);
              return new QuestionsStateActions.UpdateQuestionSuccess(res.newQuestion)
            }),
            catchError(this.handleError),
          );
      }),
    )
  );

  deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      //ofType just allows me to define a filter for which type of
      //effects I want to continue in this abservable pipe I'm creating.
      ofType(QuestionsStateActions.DELETE_QUESTION),
      //switchMap allows us to create new observable by taking another observable's data.
      switchMap((questionsData: QuestionsStateActions.DeleteQuestion) => {

        return this.http.delete<{ message: string }>(`${this.questionsPath}/delete/${questionsData.payload}`, { headers: this.headers })
          .pipe(
            map((res) => {
              this.snackbarService.openSimpleTextSnackBar(`${res.message}: ${questionsData.payload}`);
              return new QuestionsStateActions.DeleteQuestionSuccess(questionsData.payload)
            }),
            catchError(this.handleError),
          );
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) { }

  private handleError(err: any) {
    console.log(err["error"]);
    this.snackbarService.openSimpleTextSnackBar(err.error.message);
    return of(new QuestionsStateActions.QuestionsStateFailureAction({ message: err.error.message }));
  }
}
