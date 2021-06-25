import { QuestionsApi, AnswersApi} from '../../Api/Api.js';
import { reset } from 'redux-form';

const SET_QUESTION_PAGE = "SET_QUESTION_PAGE";
const TOGGLE_FETCHING = "SET_FETCHING";
const DELETE_ANSWER = "DELETE_ANSWER";
const SET_USER_ANSWER = "SET_USER_ANSWER";
//const ADD_ANSWER = "ADD_ANSWER";

let initialState = {
    question: {
        id: null,
        category: "-",
        subcategory: "-",
        date: "00-00-00",
        views: null,
        answers: null,
        averageRating: null,
        author: {
            id: null,
            login: "-",
            image: null,
        },
        title: "-",
        text: "-",
        isAnswerGiven: false,
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
        case DELETE_ANSWER:
            let idToRemove = action.id;
            console.log(idToRemove);
            const newAnswers = state.answers.filter((item) => item.id !== idToRemove);
            return{
                ...state,
                answers:newAnswers
            }
        case SET_USER_ANSWER:{
            let idToChange = action.id;
            let newAnswer = state.answers.filter((item) => item.id === idToChange);
            newAnswer.answer = action.userAnswer;
            const newAnswers = state.answers.map(a => {
                if (a.id === newAnswer.id) {
                  return newAnswer;
                }
                return a;
              });
            console.log(newAnswers)
            return{
                ...state,
                answers:newAnswers
            }
        }
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
const deleteAnswerAC =(id) =>({type:DELETE_ANSWER, id});
const setUserAnswerAC = (userAnswer, id) => ({type:SET_USER_ANSWER, userAnswer, id});

export const addAnswerThunk = (questionId, userId, answer) =>{
    return (dispatch) =>{
        dispatch(toggleFetchingAC());
        AnswersApi.postAnswerForQuestion(questionId, userId, answer)
        .then(response => {
            dispatch(reset('addAnswerForm'));
            dispatch(toggleFetchingAC());
        })
        .then(()=> dispatch(getQuestionPageThunk(questionId)));
        
    };
};
export const deleteAnswerThunk = (id) =>{
    return (dispatch) =>{
        AnswersApi.deleteAnswer(id)
        .then(response =>{
            dispatch(deleteAnswerAC(id));
        });
    };
};
export const updateAnswerThunk = (id,questionId, userId, answer) =>{
    return (dispatch) =>{
        AnswersApi.updateAnswer(id,questionId, userId, answer)
        .then(response =>{
            //dispatch(setUserAnswerAC( answer, id));
            console.log("success")
        });
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
export const setBestAnswerThunk = (id) =>{
    return (dispatch) =>{
        AnswersApi.setBestAnswer(id)
        .then(response =>{
            console.log("setted")
        })
    };
};
export default questionPageReducer;