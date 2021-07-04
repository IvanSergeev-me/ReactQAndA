import { ProfileApi, ChangeUserApi } from "../../Api/Api";
import { stopSubmit } from "redux-form";
import { setUserData } from "./app-reducer";

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
export const changeUserThunk = (id, login, password, image) =>{
    return(dispatch) =>{
        
        dispatch(toggleFetchingAC());
        ChangeUserApi.changeUser(id, login, password, image)
        .then(response =>{
            dispatch(setUserData({id, login, password, image}, true));
            dispatch(toggleFetchingAC());
            
        })
    }
}
export const deleteUserThunk = (id) =>{
    return(dispatch) =>{
        
        dispatch(toggleFetchingAC());
        ChangeUserApi.deleteUser(id)
        .then(response =>{
            dispatch(setUserData({id:null, login:null, password:null, image:null}, false));
            dispatch(toggleFetchingAC());
            
        })
    }
}
export default profileReducer;