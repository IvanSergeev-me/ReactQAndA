import React from 'react';
import s from './Registration.module.css';
import { Field, reduxForm } from 'redux-form';
import {requiredField, maxLength} from '../../../Assets/Utils/validators/validator.js';
import { Input } from '../../Common/Forms/Input.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { registerThunk } from '../../../Redux/Reducers/app-reducer';

const Registration = (props) =>{
    const onSubmit = (data) =>{
        props.registerMe(data)
       
    }
    
    return(
        <section className={s.login_section}>
            <div className={s.login_wrapper}>
                <div className={s.login_left_part}>
                    <h1 className={s.title_login_section}>
                        Добро пожаловать!
                    </h1>
                    <div className={s.login_section_description}>
                        <span>Создайте новую учетную запись.</span>        
                        <span>Вы так же можете войти, если у вас уже есть аккаунт!</span> 
                    </div>
                </div>
                <div className={s.login_right_part}>
                    <div className={s.login_right_part_container}>
                        <h2 className={s.title_login_above_form}>
                            Регистрация
                        </h2>
                        <RegistrationReduxForm onSubmit={onSubmit}/>
                    </div>
                </div>
                
            </div>
        </section>
    );
};
const RegistrationForm = (props) =>{
    return(
        <form className={s.login_form} onSubmit={props.handleSubmit}>
            {props.error?<div className={s.form_login_password_error}>{props.error}</div>:null}
            <Field validate={[requiredField,maxLength]} name="Login" placeholder={"Введите ваш логин"}  type="text" component={Input}/>
            <Field validate={[requiredField,maxLength]} name="Password" placeholder={"Пароль"}  type="password" component={Input}/>
            <Field validate={[requiredField,maxLength]} name="RepeatPassword" placeholder={"Повторите пароль"}  type="password" component={Input}/>
            <div className={s.login_form__checkbox_container}>
                <Field name="rememberMe" component={"input"} className={s.login_form__checkbox_container_checkbox} id="checkbox_rememberme" type="checkbox"/> 
                <label htmlFor="checkbox_rememberme" className={s.login_form__checkbox_container_text}>Запомнить меня</label>
            </div>
            <div className={s.login_form__buttons}>
                <button className={s.login_form__button}>
                    Зарегистрироваться
                </button>
                <NavLink to="/Login" className={s.login_form__button}>
                    У меня уже есть аккаунт
                </NavLink>
            </div>

        </form>
    );
};
const RegistrationReduxForm = reduxForm({
    form:"registrationForm"
})(RegistrationForm);




class RegistrationClass extends React.Component {
    constructor(props) {
        super(props);


    };
    componentDidMount(){
        
    };
    registerMe = (data) =>{
        this.props.registerThunk(data);
    }
    render(){
        return(
            <Registration registerMe={this.registerMe}/>
        );
        
    };
};

let mapStateToProps = (state) => ({
   isAuth:state.appDataReducer.isAuth
});


export default connect(mapStateToProps, {registerThunk})(RegistrationClass) ;