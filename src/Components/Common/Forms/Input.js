import React from 'react';
import s from './input.module.css';
export const Input = ({input, meta,...props}) =>{
    const hasError = meta.touched && meta.error;
    
    return(
        
        <div className={s.container}>
             {hasError&&<span className={s.error_message}>{meta.error}</span>}
            <input className={s.login_form__input + " " + (hasError?s.login_form__input_error:"")} {...input} {...props}/>
        </div>
        
    )
}