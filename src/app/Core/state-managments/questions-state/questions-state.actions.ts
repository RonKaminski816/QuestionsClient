/**An Interface that forces any action to have a 'type' property*/
import { Action } from '@ngrx/store';
import { IQuestionModel } from '../../models/question.model';


//A convension to save the action identifier by using a 
//const whose name is the same name as the identifier.
//then we can import it to the reducer and the IDE will yell at 
//us if we mess up the import unlike if we mess up a string.
export const ADD_QUESTION = 'ADD_QUESTION';

/**
 * It's a class because the action is an object
 * and objects can be created based on classes.
 */
export class AddQuestion implements Action {
    /**The identifier of this action and it will alaways be an add question action */
    readonly type: string = ADD_QUESTION;
    //The 'readonly' indicates to TypeScript that this must never be changed from the outside.

    /**The payload of the action */
    addQuestionPayload: IQuestionModel

}