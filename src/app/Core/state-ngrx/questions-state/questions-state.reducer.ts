import { IQuestionModel } from 'src/app/shared/models/iquestion.model';

//Because I exports the identifier and the class from the
//same file i can import everything from that file with the star and give
//an alias to group all the thing that imported from that file.
import * as QuestionsStateActions from './questions-state.actions';

/** Represent the different parts of the question'ss state */
export interface IQuestionsState {
  //It's more flexible because now if I want to add a new part
  //I can add it just in this interface and not in every use
  //of this interface across my application
  questions: IQuestionModel[];
}


/**for checking */
const initialState: IQuestionsState = {
  questions: [
    { name: "Interaction 1", creationDate: new Date("2021-01-11T10:23:13.432Z"), description: "What annoys you most?", id: "Q43" },
    { id: "Q87", name: "Covid-19", creationDate: new Date("Wed Feb 17 2021 10:18:14 GMT+0200 (שעון ישראל (חורף))"), description: "Do you think the vaccin would be affective?" },
    { name: "Interaction 2", creationDate: new Date("2021-01-11T10:44:13.432Z"), description: "What’s your favorite thing about your current job?", id: "Q42" },
    { name: "Interaction 4", creationDate: new Date("2021-01-11T12:22:13.432Z"), description: "Do you think you’ll stay in your current gig awhile? Why or why not?", id: "Q45" },
    { id: "Q85", name: "Job", creationDate: new Date("Tue Feb 16 2021 18:23:00 GMT+0200 (שעון ישראל (חורף))"), description: "What to say in a job interview?" },
    { name: "Interaction 5", creationDate: new Date("2021-01-11T12:22:13.432Z"), description: "What type of role do you want to take on after this one?", id: "Q46" },
    { name: "Interaction 7", creationDate: new Date("2021-01-12T10:01:16.799Z"), description: "How do you take your coffee?", id: "Q36" },
    { id: "Q88", name: "covid-19", creationDate: new Date("Wed Feb 17 2021 10:18:14 GMT+0200 (שעון ישראל (חורף))"), description: "Do you think the vaccin would be affective?" },
    { id: "Q86", name: "Tell", creationDate: new Date("Tue Feb 16 2021 20:28:32 GMT+0200 (שעון ישראל (חורף))"), description: "Is there anything you wanna tell me?" },
    { name: "Interaction 6", creationDate: new Date("2021-01-11T12:54:13.432Z"), description: "Are you more of a 'work to live' or a 'live to work' type of person?", id: "Q47" },
  ],
};

/**
 * the NgRx reducer function.
 * these two arguments are passed in automatically by NgRx.
 * @param state The current state before it was change. state gets initialState as a default value,
 * so if the state is not set or would be null, the initial state is passed instead.
 * @param action the action that triggers the reducer.
 */
export function questionsStateReducer(state = initialState, action: QuestionsStateActions.QuestionsStateActions) {
  switch (action.type) {
    //Convention to use all uppercase text
    case QuestionsStateActions.ADD_QUESTION:
      const newQuestionPayload = action.payload;
      return {
        //return a new object which will replace the old state
        ...state,
        //to not lose all the old data copy the old state with the spread operator.
        questions: [...state.questions, newQuestionPayload]
      };
    case QuestionsStateActions.UPDATE_QUESTION:
      const qPayload = action.payload;
      const qIndex = state.questions.findIndex(q => q.id === qPayload.id)
      const question = state.questions[qIndex];
      const updatedQuestion = {
        //We copy the old data to keep things like ID unchanged and not overwrite it by mistake
        ...question,
        ...qPayload
      }
      //We creating a copy of the current questions list state
      const updatedQuestions = [...state.questions];
      //In the copy we assign a new element or overwriting the existing element at
      //this index with new element, and that new element is the updatedQuestion.
      //So I'm replacing the old element with that index in the copied updatedQuestions
      //array with the copied updatedQuestion.
      updatedQuestions[qIndex] = updatedQuestion;
      return {
        ...state,
        questions: updatedQuestions
      };
    case QuestionsStateActions.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(ques => ques.id !== action.payload)
      };

    /**
    * At the first time when this application starts up and
    * NgRx loads our reducer, it would initialize our state with the initialState,
    * to use that initial state and return it unchanged we need a default case in our switch
    * statement to handle any cases we're not explicitly handling. NgRx will dispatch
    * automatically when it starts (kind of dispatchiing an initialization action),
    * and we can handle this with the default case. So I just want to return
    * the unchanged state that will now be the initial state.*/
    default:
      return state;
  }
}
