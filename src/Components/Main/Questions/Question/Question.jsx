import React from 'react';
import s from './Question.module.css'
import eye from '../../../../Assets/Images/view.svg';
import starYellow from '../../../../Assets/Images/starYellow.svg';
import { NavLink } from 'react-router-dom';
class Question extends React.Component{
    constructor(props) {
        super(props);
    };
    render = () =>{
        let ratingScale = this.props.averageRating;
        let questionTextPreview = this.props.text;
        let maxTextLength = 100;
        if(this.props.text.length > maxTextLength) questionTextPreview = this.props.text.substr(0, maxTextLength-3) + "..."
        return(
            <NavLink to={`/Question/${this.props.id}`} className={s.question_wrapper}>
                <div className={s.question_info}>
                    <div className={s.question_info__left}>
                        <div className={s.question_author}>{this.props.author.login}</div>
                        <div className={s.question_date}>{this.props.date}</div>
                    </div>
                    <div className={s.question_info__right}>
                        <div className={s.question_views}>
                            <img className={s.question_views_eye} src={eye} alt="eye" />
                            <span className={s.question_views_count}>{this.props.views}</span>
                        </div>
                        <div className={s.question_rating}> 
                            <img  className={s.rating__image} src={starYellow} alt="star" />
                            <div className={s.rating__scale}>
                                <span className={ratingScale>=0&&ratingScale<3?s.low_rating:ratingScale>=3&&ratingScale<4?s.medium_rating:s.high_rating}>{ratingScale}</span>/5
                            </div>
                        </div>
                        <div className={s.question_answers}>
                            answers:
                            <span className={s.question_views_count}> {this.props.answers}</span>
                        </div>
                    </div>
                </div>
                <div className={s.question_body}>
                    <h1 className={s.question_title}>
                    {this.props.title}
                    </h1>
                    <p className={s.question_text}>
                        {questionTextPreview}
                    </p>
                   
                </div>
                {this.props.isAnswerGiven?<p className={s.question_answer_given}>Ответ дан</p>:<p className={s.question_answer_notgiven}>Нет ответа</p>}
                
            </NavLink>
         );
    }

}
export default Question;