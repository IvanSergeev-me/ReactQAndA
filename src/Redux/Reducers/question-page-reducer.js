import { QuestionsApi, ActionsApi} from '../../Api/Api.js';
import { reset } from 'redux-form';

const SET_QUESTION_PAGE = "SET_QUESTION_PAGE";
const TOGGLE_FETCHING = "SET_FETCHING";
//const ADD_ANSWER = "ADD_ANSWER";
let initialState = {
    question: {
        
    },
    answers: [
        
    ],
    isFetching: false,
};
const  questionPageReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case TOGGLE_FETCHING:{
            return(state.isFetching)?{...state, isFetching: false}:{...state, isFetching:true};
        } 
        case SET_QUESTION_PAGE:
            return{
                ...state, 
                question: { ...action.question},
                answers: [...action.answers]
            };
        /*case ADD_ANSWER:
            let answer = {
                id: "",
                questionId:"",
                userId:"",
                answer:"",
                isAnswerGiven: false,
            };
            return{
                ...state,
                answers:[...state.answers, answer]
            }*/
        default: return state;
    };
};
const setQuestionPageAC = (question, answers) => ({type:SET_QUESTION_PAGE, question,answers});
const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
export const addAnswerThunk = (questionId, userId, answer) =>{
    return (dispatch) =>{
        dispatch(toggleFetchingAC());
        ActionsApi.postAnswerForQuestion(questionId, userId, answer)
        .then(response => {
            console.log(response);
            
            dispatch(reset('addAnswerForm'));
            dispatch(toggleFetchingAC());
           
            
        })
        .then(()=> dispatch(getQuestionPageThunk(questionId)));
        
    };
};
export const getQuestionPageThunk = (id) =>{
    return (dispatch) =>{
        dispatch(toggleFetchingAC());
        QuestionsApi.getCurrentQuestion(id)
        .then(response => {
            
            dispatch(setQuestionPageAC(response.data.question, response.data.answers));
            
            dispatch(toggleFetchingAC());
            
        });
        
    };
};
export default questionPageReducer;