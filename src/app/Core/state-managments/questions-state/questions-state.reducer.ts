import { IQuestionModel } from 'src/app/core/models/question.model';

//Because I exports the identifier and the class from the 
//same file i can import everything from that file with the star and give
//an alias to group all the thing that imported from that file.
import * as QuestionsStateActions from './questions-state.actions';

const questions: IQuestionModel[] = [
    { name: "Interaction 1", creationDate: "2021-01-11T10:23:13.432Z", description: "What annoys you most?", id: "Q43" },
    { name: "Interaction 2", creationDate: "2021-01-11T10:44:13.432Z", description: "What’s your favorite thing about your current job?", id: "Q42" },
    { name: "Interaction 4", creationDate: "2021-01-11T12:22:13.432Z", description: "Do you think you’ll stay in your current gig awhile? Why or why not?", id: "Q45" },
    { name: "Interaction 5", creationDate: "2021-01-11T12:22:13.432Z", description: "What type of role do you want to take on after this one?", id: "Q46" },
    { name: "Interaction 6", creationDate: "2021-01-11T12:54:13.432Z", description: "Are you more of a 'work to live' or a 'live to work' type of person?", id: "Q47" },
    { name: "Interaction 7", creationDate: "2021-01-12T10:01:16.799Z", description: "How do you take your coffee?", id: "Q36" },
    { id: "Q85", name: "Job", creationDate: "Tue Feb 16 2021 18:23:00 GMT+0200 (שעון ישראל (חורף))", description: "What to say in a job interview?" },
    { id: "Q86", name: "Tell", creationDate: "Tue Feb 16 2021 20:28:32 GMT+0200 (שעון ישראל (חורף))", description: "Is there anything you wanna tell me?" },
    { id: "Q87", name: "Covid-19", creationDate: "Wed Feb 17 2021 10:18:14 GMT+0200 (שעון ישראל (חורף))", description: "Do you think the vaccin would be affective?" }
]

/**for checking */
const initialState = {
    questions: [...questions]
};

/**
 * the NgRx reducer function. 
 * these two arguments are passed in automatically by NgRx.
 * @param state The current state before it was change. state gets initialState as a default value,
 * so if the state is not set or would be null, the initial state is passed instead.
 * @param action the action that triggers the reducer.
 */
export function questionsStateReducer(state = initialState, action: QuestionsStateActions.AddQuestion) {
    switch (action.type) {
        //Convention to use all uppercase text
        case QuestionsStateActions.ADD_QUESTION:
            return {
                //return a new object which will replace the old state
                ...state,
                //to not lose all the old data copy the old state with the spread operator.
                questions: [...state.questions, action.addQuestionPayload]
            }
        /**At the first time when this application starts up and
        * NgRx loads our reducer, it would initialize our state with the initialState,
        * to use that initial state and return it unchanged we need a default case in our switch
        * statement to handle any cases we're not explicitly handling. NgRx will dispatch
        * automatically when it starts (kind of dispatchiing an initialization action),
        * and we can handle this with the default case. So I just want to return 
        * the unchanged state that will now be the initial state.
        */
        default:
            return state;
    }
}