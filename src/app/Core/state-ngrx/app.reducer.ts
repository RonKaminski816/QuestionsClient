import { Action, ActionReducerMap } from "@ngrx/store";
import * as fromQuestionsState from "./questions-state/questions-state.reducer";
import * as fromUserAuthState from "./users-state/user-auth-state.reducer";




/** Represent the all the different reducers of the application's NgRx store */
export interface IAppState {
  questionsState: fromQuestionsState.IQuestionsState;
  usersAuthState: fromUserAuthState.IUserAuthState;
}

//We need to tel NgRx which reducers are involved and for that we call the forRoot(). we pass inside a
//'action reducer map', it's a JS object where I can define any identifier, and then the reducer that belongs to that identifier.
export const appReducer: ActionReducerMap<IAppState> = {
  questionsState: fromQuestionsState.questionsStateReducer,
  usersAuthState: fromUserAuthState.userAuthStateReducer
};
