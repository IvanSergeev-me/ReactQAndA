import {AskQuestionApi} from '../../Api/Api.js';
const SET_CATEGORIES = "SET_CAT";
const SET_SUBCATEGORIES = "SET_SUBCAT";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
const SET_SELECTED_SUBCATEGORY = "SET_SELECTED_SUBCATEGORY";


let initialState = {
    categories:[],
    subCategoriesForCategory:[],
    selectedCategory:{},
    selectedSubCategory:{},
    
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
        default: return state;
    };
};

const setCategoriesAC = (categories) => ({type:SET_CATEGORIES, categories});
const setSubCategoriesAC = (subcategories) => ({type:SET_SUBCATEGORIES, subcategories});
const setSelectedCategoryAC = (id,name) => ({type:SET_SELECTED_CATEGORY, id, name});
const setSelectedSubCategoryAC = (id, name) => ({type:SET_SELECTED_SUBCATEGORY, id, name});
const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
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
        AskQuestionApi.getCategories()
        .then(response => {
            dispatch(setCategoriesAC(response.data));
 
        });
        
    };
};
export const selectSubCategory = (id,name) =>{
    return (dispatch) =>{
         dispatch(setSelectedSubCategoryAC(id,name))
    }; 
};
export default askReducer;