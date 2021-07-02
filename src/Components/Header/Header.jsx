import React from 'react';
import s from './Header.module.css';
import loupe from '../../Assets/Images/loupe.svg';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import ProfileSvg from './user.svg'
import { logoutThunk } from '../../Redux/Reducers/app-reducer';
import { Field, reduxForm } from 'redux-form';
import { getSearchResultThunk, getQuestionsThunk } from '../../Redux/Reducers/questions-reducer';
const Header = (props) =>{
    const logoutMe = () =>{
        props.logoutMe();
    }
    let onSubmit= (values) =>{
        
        props.searchQuestions(values.searchQuestions);
    }
    let getQuestions = () => {
        props.getQuestions();
    }
    return(
        <header className={s.header}>
            <div className={s.header__wrapper}>
                <div onClick={getQuestions} className={s.logo}>
                   <NavLink to={"/Questions"} className={s.logo__image}> Q AND A</NavLink>
                </div>
                <HeaderSearchForm onSubmit={onSubmit}/>
                {props.isAuth?
                <div className={s.enter_wrapper}>
                    <NavLink to={"/Questions"} onClick={logoutMe} className={s.button_enter}>Выйти</NavLink>
                    <NavLink to={"/Profile/Settings"} className={s.profile_link}> <img src={ProfileSvg} className={s.profile_image} alt="profile" /></NavLink>
                </div>
                :<div className={s.enter_wrapper}>
                    <NavLink to={"/Login"} className={s.button_enter}>Войти</NavLink>
                </div>}
              
               
            </div>
        </header>
    );
}
const SearchForm = (props) =>{
    return(
        <form action="#" className={s.seacrh_form} onSubmit={props.handleSubmit}>
                    <Field name="searchQuestions" placeholder={"Любой вопрос или тема..."} type="text" className={s.seacrh_form__input} component={"input"}/>
                    <button type="submit" className={s.search__button}>
                        <img src={loupe} alt="loupe" className={s.search__icon}/>
                    </button>
        </form>
    );
};
const HeaderSearchForm = reduxForm({
    form:"searchForm"
})(SearchForm);
class HeaderClass extends React.Component{
    constructor(props){
        super(props);
    }
    logoutMe = () =>{
        this.props.logoutThunk();
    }
    searchQuestions = (query) =>{
        this.props.getSearchResultThunk(query);
    }
    getQuestions = () =>{
        this.props.getQuestionsThunk();
    }
    render( ){
        return(
            <Header logoutMe={this.logoutMe} getQuestions={this.getQuestions} searchQuestions={this.searchQuestions} isAuth={this.props.appDataReducer.isAuth}/>
        );
    }
}
let mapStateToProps = (state) =>({
    appDataReducer:state.appDataReducer
})
export default connect(mapStateToProps, {logoutThunk, getSearchResultThunk,getQuestionsThunk})(HeaderClass)