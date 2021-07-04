import { ProfileApi, ChangeUserApi } from "../../Api/Api";
import { stopSubmit } from "redux-form";

const SET_USERS = "USERS";
const TOGGLE_FETCHING = "SET_FETCHING";
const DELETE_USER = "DELETE_USER";

let initialState = {
    users:[],
    isFetching: false,
};

const adminReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_USERS:
            return{
                ...state,
                users:action.users
            }
        case TOGGLE_FETCHING:{
            return(state.isFetching)?{...state, isFetching: false}:{...state, isFetching:true};
        } 
        case DELETE_USER:{
            let idToRemove = action.id;
            const newUsers = state.users.filter((item) => item.id !== idToRemove);
            return{
                ...state,
                users:newUsers
            }
        }
        default: return state;
    };
};


const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
const setUsersAC = (users) => ({type:SET_USERS, users});
const deleteUserAC = (id) => ({type:DELETE_USER, id});


/*export const deleteQuestionThunk = (id) =>{
    return(dispatch) =>{
        dispatch(toggleFetchingAC());
     
        ProfileApi.deleteQuestion(id)
        .then(response =>{
           
            dispatch(toggleFetchingAC());
        })
    }
}*/
export const getUsersThunk = () =>{
    return(dispatch) =>{      
        dispatch(toggleFetchingAC());
        ChangeUserApi.getAllUser()
        .then(response =>{ 
            dispatch(setUsersAC(response.data));
            dispatch(toggleFetchingAC());       
        })
    }
}
export const deleteUserThunk = (id) =>{
    return(dispatch) =>{      
        dispatch(toggleFetchingAC());
        ChangeUserApi.deleteUser(id)
        .then(response =>{ 
            dispatch(deleteUserAC(id));
            dispatch(toggleFetchingAC());       
        })
    }
}
export default adminReducer;