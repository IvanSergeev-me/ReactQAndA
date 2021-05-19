const SET_CATEGORIES = "SET_CAT";
const SET_SUBCATEGORIES = "SET_SUBCAT";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";


let initialState = {
    
};
const askReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case TOGGLE_FETCHING:{
            return(state.isFetching)?{...state, isFetching: false}:{...state, isFetching:true};
        } 
        default: return state;
    };
};

const setCategoriesAC = () => ({type:SET_CATEGORIES});
const toggleFetchingAC = () => ({type:TOGGLE_FETCHING});
export const getCategories = () =>{
    return (dispatch) =>{
        
        
    };
};
export default askReducer;