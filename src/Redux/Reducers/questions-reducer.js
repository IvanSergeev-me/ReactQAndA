import { QuestionsApi} from '../../Api/Api.js';
import { reset } from 'redux-form';

const SET_QUESTIONS_PAGE = "SET_QUESTIONS_PAGE";
const TOGGLE_FETCHING = "SET_FETCHING";

let initialState = {
    questions: [
        
    ],
    totalQuestionsCount: 0,
    currentPage: 1,
    pageSize:10,
    isFetching: false,
};
const questionsReducer = (state = initialState, action) => { 
    switch (action.type) {
        case TOGGLE_FETCHING:{    
            return(state.isFetching)?{...state, isFetching: false}:{...state, isFetching:true};
        } 
        case SET_QUESTIONS_PAGE:
            return{
                ...state, 
                questions: [ ...action.questions]
            };
        default: return state;
    };
};

const setQuestionsAC = (questions) => ({type:SET_QUESTIONS_PAGE, questions});
const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
export const getQuestionsThunk = (currentPage, pageSize) =>{
    return (dispatch) =>{
        dispatch(toggleFetchingAC());
        QuestionsApi.getQuestionsPage(currentPage, pageSize)
        .then(response => {
            dispatch(setQuestionsAC(response.data));
        }).then(dispatch(toggleFetchingAC()));
        
    };
};
export const getSearchResultThunk = (query) =>{
    return (dispatch) =>{
        dispatch(toggleFetchingAC());
        QuestionsApi.getSearchResult(query)
        .then(response => {
            dispatch(setQuestionsAC(response.data));
            dispatch(reset('searchForm'));
        }).then(dispatch(toggleFetchingAC()));
        
    };
};
export const getSortedThunk = (type, dateFrom) =>{
    return (dispatch) =>{
        dispatch(toggleFetchingAC());
        QuestionsApi.getSortedQuestions(type, dateFrom)
        .then(response => {
            dispatch(setQuestionsAC(response.data));
        }).then(dispatch(toggleFetchingAC()));
        
    };
};
export default questionsReducer;