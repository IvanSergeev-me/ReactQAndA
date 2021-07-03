import { QuestionsApi, AnswersApi} from '../../Api/Api.js';
import { reset } from 'redux-form';

const SET_QUESTION_PAGE = "SET_QUESTION_PAGE";
const TOGGLE_FETCHING = "SET_FETCHING";
const DELETE_ANSWER = "DELETE_ANSWER";
const SET_USER_ANSWER = "SET_USER_ANSWER";
const MAKE_ANSWER_BEST = "M_A_B";
const ADD_SCORE = "ADD_SCORE";
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
            return{
                ...state,
                answers:newAnswers
            }
        }
        case  MAKE_ANSWER_BEST:{
            let idToChange = action.id;
            let newAnswer = state.answers.filter((item) => item.id === idToChange);
            newAnswer[0].isBest = true;
            const newAnswers = state.answers.map(a => {
                if (a.id === newAnswer.id) {
                  return newAnswer;
                }
                return a;
              });
            let newQuestion = state.question;
            newQuestion.isAnswerGiven = true;
            return{
                ...state,
                question:newQuestion,
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
const makeBestAC = (id) => ({type:MAKE_ANSWER_BEST,  id});
const addScoreAC = (id) => ({type:ADD_SCORE}); 

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
            //Todo
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
            dispatch( makeBestAC(id));
        })
    };
};
export const addScoreThunk = (userId, answerId, score) =>{
    return(dispatch) =>{
        score = normalizeScore(score);
        AnswersApi.createScore(userId, answerId, score)
        .then(response=>{
            //Todo
        })
    }
}
export const addQuestionScoreThunk = (userId, questionId, score) =>{
    return(dispatch) =>{
        score = normalizeScore(score);
        QuestionsApi.createScore(userId, questionId, score)
        .then(response=>{
           //Todo
        })
    }
}
let normalizeScore = (score) =>{
    if(score > 5) score = 5;
    if (score < 0) score = 0;
    return score;
}
export default questionPageReducer;