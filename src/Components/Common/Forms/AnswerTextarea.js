import React from 'react';
import s from './answerTextarea.module.css';
export const AnswerTextarea = ({input, meta,...props}) =>{
    const hasError = meta.touched && meta.error;
    
    return(
        
        <div className={s.container}>
            {hasError&&<span className={s.error_message}>{meta.error}</span>}
            <textarea className={s.textarea + " " + (hasError?s.textarea_error:"")} {...input} {...props}/>
        
            
        </div>
        
    )
}