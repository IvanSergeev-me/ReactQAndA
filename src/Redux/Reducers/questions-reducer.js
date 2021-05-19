import { QuestionsApi} from '../../Api/Api.js';
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
            //console.log(response.data);
            dispatch(toggleFetchingAC());
            //dispatch(setTotalCount(response.data.totalCount));
        });
        
    };
};
export default questionsReducer;