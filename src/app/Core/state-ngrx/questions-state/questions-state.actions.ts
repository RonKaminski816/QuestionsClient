/**An Interface that forces any action to have a 'type' property*/
import { Action } from '@ngrx/store';
import { IQuestionModel } from 'src/app/shared/models/iquestion.model';


//A convension to save the action identifier by using a
//const whose name is the same name as the identifier.
//then we can import it to the reducer and the IDE will yell at
//us if we mess up the import unlike if we mess up a string.
export const ADD_QUESTION_START = '[Questions State] Add Question Start';
export const ADD_QUESTION = '[Questions State] Add Question';
export const UPDATE_QUESTION = '[Questions State] Update Question';
export const DELETE_QUESTION = '[Questions State] Delete Question';

/**
 * It's a class because the action is an object
 * and objects can be created based on classes.
 */
export class AddQuestion implements Action {
  /**The identifier of this action and it will alaways be an add question action */
  readonly type = ADD_QUESTION;
  //The 'readonly' indicates to TypeScript that this must never be changed from the outside.

  /**We are getting the payload of the action inside the constructor
   * to the payload as an argument when the the action get dispatched.
   * It has to be public because I want to access the payload fron
   * inside my reducer where I'm extracting it to store the question in
   * the Questions array.
  */
  constructor(public payload: IQuestionModel) { }
}

export class AddQuestionStart implements Action {
  readonly type = ADD_QUESTION_START;

  constructor(public payload: IQuestionModel) { }
}

export class UpdateQuestion implements Action {
  readonly type = UPDATE_QUESTION;
  // constructor(public payload: { index: number, question: IQuestionModel }) { }
  constructor(public payload: IQuestionModel) { }
}

export class DeleteQuestion implements Action {
  readonly type = DELETE_QUESTION;
  constructor(public payload: string) { }
}


/**
 * I export an additional type that will be a combination of all the types
 * I want to include in my QuestionsStateActions. So I create a union of
 * the different action types I want to support in this part of the store.
 */
export type QuestionsStateActions =
  | AddQuestion
  | UpdateQuestion
  | DeleteQuestion

// The pipe symbol 'AddQuestion | DeleteQuestion' is a TypeScript feature, that simply says the
// type of QuestionsStateActions is AddQuestion or DeleteQuestion.
