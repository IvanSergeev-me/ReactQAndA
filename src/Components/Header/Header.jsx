import React from 'react';
import s from './Header.module.css';
import loupe from '../../Assets/Images/loupe.svg';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import ProfileSvg from './user.svg'
import { logoutThunk } from '../../Redux/Reducers/app-reducer';
const Header = (props) =>{
    const logoutMe = () =>{
        props.logoutMe();
    }
    return(
        <header className={s.header}>
            <div className={s.header__wrapper}>
                <div className={s.logo}>
                   <NavLink to={"/Questions"} className={s.logo__image}> Q AND A</NavLink>
                </div>
                <form action="#" className={s.seacrh_form}>
                    <input placeholder={"Любой вопрос или тема..."} type="text" className={s.seacrh_form__input}/>
                    <button type="submit" className={s.search__button}>
                        <img src={loupe} alt="loupe" className={s.search__icon}/>
                    </button>
                </form>
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
class HeaderClass extends React.Component{
    constructor(props){
        super(props);
    }
    logoutMe = () =>{
        this.props.logoutThunk();
    }
    render( ){
        return(
            <Header logoutMe={this.logoutMe} isAuth={this.props.appDataReducer.isAuth}/>
        );
    }
}
let mapStateToProps = (state) =>({
    appDataReducer:state.appDataReducer
})
export default connect(mapStateToProps, {logoutThunk})(HeaderClass)