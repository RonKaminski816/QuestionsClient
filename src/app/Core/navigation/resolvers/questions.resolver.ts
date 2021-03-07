import { Injectable } from "@angular/core";
import { IQuestionModel } from "src/app/shared/models/iquestion.model";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";
import { of } from "rxjs";
import { Store } from '@ngrx/store';
import * as QuestionsStateActions from 'src/app/core/state-ngrx/questions-state/questions-state.actions';
//convention to describe an import to my reducer and/or state for a certain part of my application
import * as fromApp from 'src/app/core/state-ngrx/app.reducer';





@Injectable({ providedIn: 'root' })
export class QuestionsResolverService implements Resolve<IQuestionModel[]> {
  constructor(
    private store: Store<fromApp.IAppState>,
    private actions$: Actions
  ) { }

  /**
   *The resolver expects an observable as a return value here on the resolve method,
   and it waits for this observable to complete before it loads the route for which I addad this resolver.
  */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // The proplam is when I dispatch an action, I don't get back an observable,
    // And therefore this resolve method would instantly resolve and I would load
    // a route where the data is actually not there yet.
    //   return this.store.dispatch(new QuestionsStateActions.FetchQuestions());

    /** Basicaly the thing I'm doing here is:
     * 1) I'm getting the current questions state from my NgRx sore */
    return this.store.select('questionsState').pipe(
      //*) I use the take operator to take only one value so that I then complete and unsubscribe from
      //the subscription, I have no ongoing subscription, I'm only interested in this event once.
      take(1),
      switchMap(questionsState => {
        //2) I'm checking if the list of questions of the current state is empty
        //to know if I need to fetch the questions from the server or not.
        if (questionsState.questions.length === 0) {
          //2.1) In case that the list is empty I'm dispatching the Fetch action
          //to get them from the server as an observable
          this.store.dispatch(new QuestionsStateActions.FetchQuestions());
          return this.actions$.pipe(
            //2.1.1) the fetch action dispatching the set action so I'm listening
            //to the QuestionsStateActions.SET_QUESTIONS action type to acc ur
            // then I'm taking the observable's result which containing the list
            //of question that fetched from the server and return this observable
            ofType(QuestionsStateActions.SET_QUESTIONS),
            //*) I use the take operator the same reason from the begining of this method.
            take(1)
            //2.1.2)Only after the function return the observable the loaded route can get the questions state
            // from the store and by then I already fetched al of the questions from the server.
          );
        } else {
          //2.2) Incase the list isn't empty I just return the current state
          // and no need to fetch it fro the server.
          return of(questionsState.questions);
        }
      })
    );

  }
}
