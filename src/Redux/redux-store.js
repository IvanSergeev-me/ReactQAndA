import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import questionsReducer from './Reducers/questions-reducer.js';
import asideReducer from './Reducers/aside-reducer.js';
import headerReducer from './Reducers/header-reducer.js';
import questionPageReducer from './Reducers/question-page-reducer.js';
import askReducer from './Reducers/ask-reducer.js';

let reducers = combineReducers({
   form:formReducer,
   questions:questionsReducer,
   aside:asideReducer,
   header:headerReducer,
   questionPage: questionPageReducer,
   askQuestion: askReducer,
   
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;