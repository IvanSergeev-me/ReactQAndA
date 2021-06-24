import { stopSubmit } from 'redux-form';
import {AuthorisationApi} from '../../Api/Api.js';

const SET_USER_DATA = "SET_USER_DATA";
const LOGOUT_USER = "LOGOUT_USER";

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
            console.log("dataset")
            return {
                ...state,
                data: action.userData,
                isAuth:action.isAuth
            };
        case LOGOUT_USER:{
            return {
                ...state,
                data: {id:null, login:null, password:null, image:null},
                isAuth:false
            }
        }
        default: return state;
    };
};

export const setUserData = (userData, isAuth) => ({type:SET_USER_DATA, userData:userData, isAuth:isAuth});
const logoutUser = () => ({type:LOGOUT_USER});

export const loginThunk = (data) =>{
    return(dispatch) =>{
        AuthorisationApi.loginMe(data.Login, data.Password, data.rememberMe)
        .then(response => {
          
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
export const registerThunk = (data) =>{
    return(dispatch) =>{
        console.log(data);
        if(data.Password !== data.RepeatPassword){
            dispatch(stopSubmit("registrationForm", {_error:"Пароли не совпадают"}));
        }
        else{
            AuthorisationApi.registerNewUser(data.Login, data.Password, data.RepeatPassword, data.rememberMe)
            .then(response => {
               if(response.status == 200){
                   if (response.data.status!="exception"){
                        dispatch(setUserData(response.data, true));
                   }
                   else{
                        let message = response.data.message;
                        dispatch(stopSubmit("registrationForm", {_error:message}));
                   }
                    
               }
               else{
                   let message = response.messages;
                   
                    dispatch(stopSubmit("registrationForm", {_error:message}));
               };
            });
        }
       
    };
};
export const logoutThunk = () =>{
    return(dispatch) =>{
        dispatch(logoutUser());
    };
};

export default authReducer;

