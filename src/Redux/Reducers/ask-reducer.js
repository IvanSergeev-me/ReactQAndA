import {AskQuestionApi} from '../../Api/Api.js';
const SET_CATEGORIES = "SET_CAT";
const SET_SUBCATEGORIES = "SET_SUBCAT";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
const SET_SELECTED_SUBCATEGORY = "SET_SELECTED_SUBCATEGORY";
const SET_MESSAGE = "SET_MESSAGE";
const CLEAR_STATE = "CLEAR_STATE";


let initialState = {
    message:"",
    categories:[],
    subCategoriesForCategory:[],
    selectedCategory:{},
    selectedSubCategory:{},
    isFetching:false,
};
const askReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_SELECTED_CATEGORY:{
            return {
                ...state,
                selectedCategory:{id:action.id, name:action.name},
                selectedSubCategory:{}
            }
        }
        case SET_SELECTED_SUBCATEGORY:{
            return {
                ...state,
                selectedSubCategory:{id:action.id, name:action.name}
            }
        }
        case SET_CATEGORIES:{
           return {
               ...state,
               categories: action.categories,
               subCategoriesForCategory:[]

           } 
        }
        case SET_SUBCATEGORIES:{
            return {
                ...state,
                subCategoriesForCategory: action.subcategories
            } 
         }
        case TOGGLE_FETCHING:{
            return(state.isFetching)?{...state, isFetching: false}:{...state, isFetching:true};
        } 
        case SET_MESSAGE:{
            return {...state, message:action.message}
        }
        case CLEAR_STATE:{
            return{...initialState}
        }
        default: return state;
    };
};

const setCategoriesAC = (categories) => ({type:SET_CATEGORIES, categories});
const setSubCategoriesAC = (subcategories) => ({type:SET_SUBCATEGORIES, subcategories});
const setSelectedCategoryAC = (id,name) => ({type:SET_SELECTED_CATEGORY, id, name});
const setSelectedSubCategoryAC = (id, name) => ({type:SET_SELECTED_SUBCATEGORY, id, name});
const setMessage = (message) => ({type:SET_MESSAGE, message});
export const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
export const clearState = () => ({type:CLEAR_STATE});

export const askQuestionThunk = (subcategoryId, userId, title, description) =>{
    return(dispatch) =>{
        if(subcategoryId&&userId&&title&&description){
            dispatch(toggleFetchingAC());
            dispatch(setMessage("Fetching"));
            AskQuestionApi.askQuestion(subcategoryId, userId, title, description)
            .then(response =>{
                if (response.data.status==="exception"){
                    dispatch(dispatch(setMessage("Error")));
                }
                else dispatch(setMessage("Success"));
                dispatch(toggleFetchingAC());  
            })
        }
        else{
            dispatch(setMessage("Error"));
        }
    }
}
export const getSubcategoriesForCategory = (id, name) =>{
    return (dispatch) =>{
       
        dispatch(setSelectedCategoryAC(id, name));
        AskQuestionApi.getSubcategories(id)
        .then(response => {
            
            dispatch(setSubCategoriesAC(response.data));
        });
        
    };
};
export const getCategories = () =>{
    return (dispatch) =>{
        dispatch(clearState());
        AskQuestionApi.getCategories()
        .then(response => {

            if(response.status == 200){
                dispatch(setCategoriesAC(response.data));
            }
            else{
                dispatch(setCategoriesAC([{id:"1",name:"Ошибка"}]))
            }
 
        });
        
    };
};
export const selectSubCategory = (id,name) =>{
    return (dispatch) =>{
         dispatch(setSelectedSubCategoryAC(id,name))
    }; 
};
export default askReducer;