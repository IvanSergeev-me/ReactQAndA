import { QuestionsApi} from '../../Api/Api.js';
const SET_QUESTION_PAGE = "SET_QUESTION_PAGE";
const TOGGLE_FETCHING = "SET_FETCHING";
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
        
        default: return state;
    };
};
const setQuestionPageAC = (question, answers) => ({type:SET_QUESTION_PAGE, question,answers});
const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
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