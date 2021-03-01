import { Injectable } from "@angular/core";
import { catchError, debounceTime, map, switchMap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionsService } from 'src/app/core/http/questions/questions.service';
import * as QuestionsStateActions from './questions-state.actions';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { IQuestionModel } from "src/app/shared/models/iquestion.model";


@Injectable()
export class QuestionsStateEffects {

  private questionsPath = environment.baseUrl + environment.questionsPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization":

  addQuestions$ = createEffect(() =>

    this.actions$.pipe(
      //ofType just allows me to define a filter for which type of
      //effects I want to continue in this abservable pipe I'm creating.
      ofType(QuestionsStateActions.ADD_QUESTION_START),
      //switchMap allows us to create new observable by taking another observable's data.
      switchMap((questionsData: QuestionsStateActions.AddQuestionStart) => {

        return this.http.post<{ message: string, qa?: IQuestionModel }>(`${this.questionsPath}/create`, JSON.stringify(questionsData.payload), { headers: this.headers })
          .pipe(
            map((res) => new QuestionsStateActions.AddQuestion(res.qa)),
            catchError((err) => {
              return this.handleError(err)
              //  return of();
            }),
          );
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private questionsService: QuestionsService,
  ) { }

  private handleError(error: any) {
    let msg = error.error;
    return throwError(msg);
  }
}
