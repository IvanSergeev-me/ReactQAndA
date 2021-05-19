import React from 'react';
import s from './Answer.module.css';
import defaultImg from './account.png';
const Answer = (props) =>{
    let ratingScale = props.averageRating;
    return(
        <div className={props.isBest?s.answer_wrapper + " " + s.best_answer:s.answer_wrapper}>
            <div className={s.answer_left}>
                <img className={s.left_avatar} src={defaultImg} alt="avatar" />
                <div className={s.left_name}>{props.userId}-Автор</div>
            </div>
            <div className={s.answer_right}>
                <p className={s.right_text}>{props.answer}</p>
                <div className={s.right_rating}><span className={ratingScale>=0&&ratingScale<3?s.low_rating:ratingScale>=3&&ratingScale<4?s.medium_rating:s.high_rating}>{ratingScale}</span>/5</div>
            </div>
        </div>
    )
}
export default Answer;