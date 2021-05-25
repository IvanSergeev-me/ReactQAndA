import React from 'react';
import s from './Login.module.css';
import { Field, reduxForm } from 'redux-form';
import {requiredField, maxLength} from '../../../Assets/Utils/validators/validator.js';
import { Input } from '../../Common/Forms/Input.js';
import { connect } from 'react-redux';

const Login = (props) =>{
    const onSubmit = (data) =>{
        
        //props.loginThunk(data);
    }
    
    return(
        <section className={s.login_section}>
            <div className={s.login_wrapper}>
                <div className={s.login_left_part}>
                    <h1 className={s.title_login_section}>
                        С возвращением!
                    </h1>
                    <div className={s.login_section_description}>
                        <span>Войдите, используя ваш существующий логин или пароль.</span>        
                        <span>Или же зарегистрируйтесь!</span> 
                    </div>
                </div>
                <div className={s.login_right_part}>
                    <div className={s.login_right_part_container}>
                        <h2 className={s.title_login_above_form}>
                            Авторизация
                        </h2>
                        <LoginReduxForm onSubmit={onSubmit}/>
                    </div>
                </div>
                
            </div>
        </section>
    );
};
const LoginForm = (props) =>{
    return(
        <form className={s.login_form} onSubmit={props.handleSubmit}>
            {props.error?<div className={s.form_login_password_error}>{props.error}</div>:null}
            <Field validate={[requiredField,maxLength]} name="Login" placeholder={"Введите ваш логин"}  type="text" component={Input}/>
            <Field validate={[requiredField,maxLength]} name="Password" placeholder={"Пароль"}  type="password" component={Input}/>
            <div className={s.login_form__checkbox_container}>
                <Field name="rememberMe" component={"input"} className={s.login_form__checkbox_container_checkbox} id="checkbox_rememberme" type="checkbox"/> 
                <label htmlFor="checkbox_rememberme" className={s.login_form__checkbox_container_text}>Запомнить меня</label>
            </div>
            <div className={s.login_form__buttons}>
                <button className={s.login_form__button}>
                    Войти
                </button>
                <button className={s.login_form__button}>
                    Зарегистрироваться
                </button>
            </div>

        </form>
    );
};
const LoginReduxForm = reduxForm({
    form:"loginForm"
})(LoginForm);




class LoginClass extends React.Component {
    constructor(props) {
        super(props);


    };
    componentDidMount(){
        
    };
    render(){
        return(
            <Login />
        );
        
    };
};

let mapStateToProps = (state) => ({
    
});


export default connect(mapStateToProps, {})(LoginClass) ;