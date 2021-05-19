import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getQuestionPageThunk } from '../../../../Redux/Reducers/question-page-reducer.js';
import Answer from './Answers/Answer.jsx';
import s from './QuestionPage.module.css';
import eye from '../../../../Assets/Images/view.svg';
const QuestionPage = (props) =>{
    let ratingScale = props.question.averageRating;
    let answers_list = props.answers.map(
        a => {
            return <Answer
            key={a.id}
            id = {a.id}
            questionId ={a.questionId}
            userId = {a.userId}
            averageRating = {a.averageRating}
            answer = {a.answer}
            isBest = {a.isBest}
        />
        }
    )
    return(
        <section className={s.questionPage_wrapper}>
            <div  className={s.questionPage_header}>
                <div className={s.questionPage_header_left}>
                    <div className={s.question_category_container}>
                        Категория: <h1 className={s.question_category}>{props.question.category}</h1>/<h2 className={s.question_subcategory}>{props.question.subcategory}</h2>  
                    </div>
                    <div className={s.question_id}>
                        Номер вопроса: {props.question.id}
                    </div>
                    <div className={s.question_date}>
                        {props.question.date}
                    </div>
                </div>
                <div className={s.questionPage_header_right}>
                    <h1 className={s.question_title}>{props.question.title}</h1>
                    <div className={s.question_views}>
                        <img className={s.question_views_eye} src={eye} alt="eye" />
                        <span className={s.question_views_count}>{props.question.views}</span>
                    </div>
                </div>
            </div>
            <div className={s.questionPage_body}>
                <div className={s.body_author}>
                    Автор  <span className={s.body_author_name}>{props.question.author} </span> спрашивает:
                </div>
                <div className={s.body_content}>
                    <div className={s.body_text}>
                        {props.question.text}
                    </div>
                    <div className={s.body_review}>
                        <div>Этот вопрос решен? {props.question.isAnswerGiven?<span className={s.answerGiven}>Да</span>:<span  className={s.answerNotGiven}>Нет</span>}</div>
                        <div>Этот вопрос полезен? <span className={ratingScale>=0&&ratingScale<3?s.low_rating:ratingScale>=3&&ratingScale<4?s.medium_rating:s.high_rating}>{props.question.averageRating}</span>/5</div>
                    </div>
                </div>
            </div>
            <div className={s.questionPage_answers}>
                <div className={s.answers_header}>
                    Ответы: <span className={s.totalAnswers}>{props.question.answers}</span>
                </div>
                <div>
                    {answers_list}
                </div>
            </div>
        </section>
    )
}
class QuestionPageClass extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let questionId = this.props.match.params.questionID;
        this.props.getQuestionPageThunk(questionId);
        
    }
    render = () =>{
        return(
            <QuestionPage question={this.props.currentPage.question} answers={this.props.currentPage.answers}/>
        )
    }
}
let mapStateToProps = (state) => ({
    currentPage: state.questionPage
    
});
export default compose(connect(mapStateToProps, { getQuestionPageThunk }),withRouter,)(QuestionPageClass);