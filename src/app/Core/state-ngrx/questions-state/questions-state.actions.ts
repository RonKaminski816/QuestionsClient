/**An Interface that forces any action to have a 'type' property*/
import { Action } from '@ngrx/store';
import { IQuestionModel } from 'src/app/shared/models/iquestion.model';


//A convension to save the action identifier by using a
//const whose name is the same name as the identifier.
//then we can import it to the reducer and the IDE will yell at
//us if we mess up the import unlike if we mess up a string.
export const SET_QUESTIONS = '[Questions State] Set Questions';
export const FETCH_QUESTIONS = '[Questions State] Fetch Questions';
export const ADD_QUESTION = '[Questions State] Add Question';
export const ADD_QUESTION_SUCCESS = '[Questions State] Add Question Success';
export const UPDATE_QUESTION = '[Questions State] Update Question';
export const UPDATE_QUESTION_SUCCESS = '[Questions State] Update Question Success';
export const DELETE_QUESTION = '[Questions State] Delete Question';
export const DELETE_QUESTION_SUCCESS = '[Questions State] Delete Question Success';
export const QUESTION_ACTION_FAIL = '[Questions State] Questions Action Fail';

/**
 * It's a class because the action is an object
 * and objects can be created based on classes.
 */
export class SetQuestions implements Action {
  readonly type = SET_QUESTIONS;
  constructor(public payload: IQuestionModel[]) { }
}

export class FetchQuestions implements Action {
  readonly type = FETCH_QUESTIONS;
}

export class AddQuestion implements Action {
  /**The identifier of this action and it will alaways be an add question action */
  //The 'readonly' indicates to TypeScript that this must never be changed from the outside.
  readonly type = ADD_QUESTION;
  constructor(public payload: IQuestionModel) { }
  /**We are getting the payload of the action inside the constructor
   * to the payload as an argument when the action is dispatched.
   * It has to be public because I want to access the payload from the
   * inside of my reducer where I'm extracting it to store the question in
   * the Questions array.
  */
}

export class AddQuestionSuccess implements Action {
  readonly type = ADD_QUESTION_SUCCESS;
  constructor(public payload: IQuestionModel) { }
}

export class UpdateQuestion implements Action {
  readonly type = UPDATE_QUESTION;
  constructor(public payload: IQuestionModel) { }
}

export class UpdateQuestionSuccess implements Action {
  readonly type = UPDATE_QUESTION_SUCCESS;
  constructor(public payload: IQuestionModel) { }
}

export class DeleteQuestion implements Action {
  readonly type = DELETE_QUESTION;
  constructor(public payload: string) { }
}

export class DeleteQuestionSuccess implements Action {
  readonly type = DELETE_QUESTION_SUCCESS;
  constructor(public payload: string) { }
}

/**A general Failure Action to be dispatched every time when a NgRx question state related error accurs*/
export class QuestionsStateFailureAction implements Action {
  readonly type = QUESTION_ACTION_FAIL;
  constructor(public payload: { message: string }) { }
}
/**
 * I export an additional type that will be a combination of all the types
 * I want to include in my QuestionsStateActions. So I create a union of
 * the different action types I want to support in this part of the store.
 */
export type QuestionsStateActions =
  | SetQuestions
  | FetchQuestions
  | AddQuestion
  | AddQuestionSuccess
  | UpdateQuestion
  | UpdateQuestionSuccess
  | DeleteQuestion
  | DeleteQuestionSuccess
  | QuestionsStateFailureAction

// The pipe symbol 'AddQuestion | DeleteQuestion' is a TypeScript feature, that simply says the
// type of QuestionsStateActions is AddQuestion or DeleteQuestion.
