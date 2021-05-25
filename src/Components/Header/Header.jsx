import React from 'react';
import s from './Header.module.css';
import loupe from '../../Assets/Images/loupe.svg';
import { NavLink } from 'react-router-dom';
const Header = (props) =>{
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
                <div className={s.enter_wrapper}>
                    <NavLink to={"/Login"} className={s.button_enter}>Войти</NavLink>
                </div>
               
            </div>
        </header>
    );
}
export default Header