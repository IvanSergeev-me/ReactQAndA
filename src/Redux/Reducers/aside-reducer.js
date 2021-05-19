const TOGGLE_OPEN = "TOGGLE_OPEN";
let initialState = {
    isActive: false
};
const asideReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case TOGGLE_OPEN:{
            
          
            return {
                ...state,
                isActive:state.isActive?false:true
            };
            
        }
        default: return state;
    };
};
export default asideReducer;

const toggleOpenAC = () =>({type:TOGGLE_OPEN});
export const toggleOpen = () =>{
    
    return(dispatch) =>{
       dispatch(toggleOpenAC());
    };
};