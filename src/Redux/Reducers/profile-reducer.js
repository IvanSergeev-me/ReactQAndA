import { ProfileApi } from "../../Api/Api";

const SET_QUESTIONS = "SET_QUESTIONS";
const TOGGLE_FETCHING = "SET_FETCHING";
const DELETE_QUESTION = "DELETE_QUESTION";

let initialState = {
    userQuestions:[],
    isFetching: false,
};

const profileReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_QUESTIONS:
            return{
                ...state,
                userQuestions:action.userQuestions
            }
        case TOGGLE_FETCHING:{
            return(state.isFetching)?{...state, isFetching: false}:{...state, isFetching:true};
        } 
        case DELETE_QUESTION:{
            let idToRemove = action.id;
            const newQuestions = state.userQuestions.filter((item) => item.id !== idToRemove);
            return{
                ...state,
                userQuestions:newQuestions
            }
        }
        default: return state;
    };
};

const setQuestionsAC = (userQuestions) =>({type:SET_QUESTIONS, userQuestions});
const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
const deleteQuestionAC = (id) => ({type:DELETE_QUESTION, id});

export const setQuestionsThunk = (id) =>{
    return(dispatch) =>{
        dispatch(toggleFetchingAC());
        ProfileApi.getMyQuestions(id)
        .then(response =>{
            dispatch(setQuestionsAC(response.data))
            dispatch(toggleFetchingAC());
        })
    }
}
//CORS Мешает удалить
export const deleteMyQuestionThunk = (id) =>{
    return(dispatch) =>{
        dispatch(toggleFetchingAC());
        dispatch(deleteQuestionAC(id));
        ProfileApi.deleteMyQuestion(id)
        .then(response =>{
            
            dispatch(toggleFetchingAC());
        })
    }
}
export default profileReducer;