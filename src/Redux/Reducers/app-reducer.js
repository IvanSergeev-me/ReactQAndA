import { stopSubmit } from 'redux-form';
import {AuthorisationApi} from '../../Api/Api.js';

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    resultCode: null,
    messages: [],
    data: {
        id: null,
        login: null,
        password:null,
        image:null
    },
    isFetching: false,
    isAuth:false
};
const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_USER_DATA:
            
            return {
                ...state,
                data: action.userData,
                isAuth:action.isAuth
            };
        default: return state;
    };
};

export const setUserData = (userData, isAuth) => ({type:SET_USER_DATA, userData:userData, isAuth:isAuth});
export const loginThunk = (data) =>{
    return(dispatch) =>{
        AuthorisationApi.loginMe(data.Login, data.Password, data.rememberMe)
        .then(response => {
            console.log(response)
           if(response.status == 200){
               if (response.data.status!="exception"){
                    dispatch(setUserData(response.data, true));
               }
               else{
                    let message = response.data.message;
                    dispatch(stopSubmit("loginForm", {_error:message}));
               }
                
           }
           else{
               let message = response.messages;
               
                dispatch(stopSubmit("loginForm", {_error:message}));
           };
        });
    };
};

export default authReducer;

