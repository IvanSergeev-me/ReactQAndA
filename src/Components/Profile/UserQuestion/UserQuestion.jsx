import React from "react";
import s from './UserQuestion.module.css';
import { NavLink } from "react-router-dom";
import eye from '../../../Assets/Images/view.svg';
const UserQuestion = (props) =>{
    let thisId = props.id;
    let deleteThisQuestion = () =>{
       
        props.deleteQuestion(thisId);
    }
 return(
    
    <div className={s.question_wrapper}>
                <div className={s.question_info}>
                    <div className={s.question_info__left}>
                        <div className={s.question_author}>{props.author.login}</div>
                        <div className={s.question_date}>{props.date}</div>
                        <div onClick={deleteThisQuestion} className={s.delete_button}>X</div>
                    </div>
                    <div className={s.question_info__right}>
                        <div className={s.question_views}>
                            
                            <img className={s.question_views_eye} src={eye} alt="eye" />
                            <span className={s.question_views_count}>{props.views}</span>
                        </div>
                        <div className={s.question_answers}>
                            answers:
                            <span className={s.question_views_count}> {props.answers}</span>
                        </div>
                    </div>
                </div>
                <NavLink  to={`/Question/${thisId}`} className={s.question_body}>
                    <h1 className={s.question_title}>
                    {props.title}
                    </h1>
                    <p className={s.question_text}>
                        {props.text}
                    </p>
                   
                </NavLink>
                {props.isAnswerGiven?<p className={s.question_answer_given}>Answer Given</p>:<p className={s.question_answer_notgiven}>No Answer</p>}
                
    </div >
 )
}
export default UserQuestion;