import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getQuestionPageThunk, addAnswerThunk, deleteAnswerThunk, updateAnswerThunk, setBestAnswerThunk,addScoreThunk,addQuestionScoreThunk } from '../../../../Redux/Reducers/question-page-reducer.js';
import Answer from './Answers/Answer.jsx';
import s from './QuestionPage.module.css';
import eye from '../../../../Assets/Images/view.svg';
import defaultImg from './account.png';
import { AnswerTextarea } from '../../../Common/Forms/AnswerTextarea.js';
import { Field, reduxForm } from 'redux-form';
import { deleteMyQuestionThunk } from '../../../../Redux/Reducers/profile-reducer.js';
import StarRating from '../../../Common/StartRating/StarRating';


const QuestionPage = (props) =>{
    let ratingScale = props.question.averageRating;
    let userImage = props.appDataReducer.data.image;
    let isAdmin = props.appDataReducer.data.isAdmin;
    let isAuth = props.appDataReducer.isAuth;
    let myId = props.appDataReducer.data.id;
    let questionId = props.question.id;
    const deleteThisAnswer = (id) =>{
        props.deleteAnswer(id);
    }
    const updateAnswer = (id,  answerText) =>{
        props.updateAnswer(id,questionId,myId, answerText)
        
    }
    const onSubmit = (data) =>{
        props.addAnswer(data);
    }
    const deleteQuestion = (e) =>{
        props.deleteQuestion(questionId);
        e.preventDefault();
    }
    let rateQuestion = (score) =>{
        props.addQuestionScore(questionId, score);
    }
    let answers_list = props.answers.map(
        a => {
            return <Answer
            key={a.id}
            id = {a.id}
            questionId ={a.questionId}
            myId = {myId}
            averageRating = {a.averageRating}
            answer = {a.answer}
            isBest = {a.isBest}
            isAuth = {isAuth}
            isAdmin = {isAdmin}
            deleteThisAnswer={deleteThisAnswer}
            updateAnswer={updateAnswer}
            isMyQuestion={props.isMyQuestion}
            setBestAnswer={props.setBestAnswer}
            addScore={props.addScore}
            author={a.author}
            isAnswerAlreadyGiven = {props.question.isAnswerGiven}
            
        />
        }
    )
    //Лучшие ответы попадают в топ
    answers_list.sort(
        function (a, b) {
            if (b.props.isBest) {
                return 1; 
            }
            else {
                return -1; 
            }
            return 0;
        }     
    );
  
   
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
                    
                    Автор  <span className={s.body_author_name}>{props.question.author?props.question.author.login:"anonymus"} </span> спрашивает:
                </div>
                <div className={s.body_content}>
                    <div className={s.body_text}>
                        {props.question.text}
                    </div>
                    <div className={s.body_review}>
                        <div>Этот вопрос решен? {props.question.isAnswerGiven?<span className={s.answerGiven}>Да</span>:<span  className={s.answerNotGiven}>Нет</span>}</div>
                        <div> {isAuth? <StarRating currentRating={0} addScore={rateQuestion}/>:null} Этот вопрос полезен? <span className={ratingScale>=0&&ratingScale<3?s.low_rating:ratingScale>=3&&ratingScale<4?s.medium_rating:s.high_rating}>{ratingScale}</span>/5</div>
                    </div>
                </div>
                {isAdmin?<button onDoubleClick={deleteQuestion} className={s.delete_question_button}>Удалить вопрос</button>:null}
            </div>
            <div className={s.questionPage_answers}>
                <div className={s.answers_header}>
                    Ответы: <span className={s.totalAnswers}>{props.question.answers}</span>
                </div>
                <div>
                    {answers_list}
                </div>
                {isAuth?<div className={s.answers_add_wrapper}>
                        <div className={s.answer_add_left}>
                            <img className={s.left_avatar} src={userImage?userImage:defaultImg} alt="avatar" />
                            <div className={s.left_name}>{props.appDataReducer.data.login}</div>
                        </div>
                        <div className={s.answer_add_right}>
                            <AddAnswerReduxForm onSubmit={onSubmit}/>
                           
                        </div>
                </div>:null}
                
            </div>
            
            
        </section>
    )
  
}

const AddAnswerForm = (props) =>{
    return(
        <form className={s.add_form} onSubmit={props.handleSubmit}>
            <Field  name="Answer" placeholder={"Оставьте ваш ответ здесь..."}  type="text" component={AnswerTextarea}/>
            <button className={s.addAnswer_form__button}>
                    Отправить
            </button>
            
        </form>
    );
};
const AddAnswerReduxForm = reduxForm({
    form:"addAnswerForm"
})( AddAnswerForm);
class QuestionPageClass extends React.Component{
    constructor(props){
        super(props);
    }
    addAnswer = ( data) =>{
        let questionId = this.props.match.params.questionID;
        let userId = this.props.appDataReducer.data.id;
        let answerContent = data.Answer;
        this.props.addAnswerThunk(questionId, userId, answerContent);
        //this.props.getQuestionPageThunk(questionId);
        
    }
    deleteAnswer = (id) =>{
        this.props.deleteAnswerThunk(id);
    }
    updateAnswer = (id,questionId,myId, answerText) =>{
        
        this.props.updateAnswerThunk(id,questionId,myId, answerText);
    }
    setBestAnswer = (id) =>{
        this.props.setBestAnswerThunk(id);
    }
    addScore = (answerId, score) =>{
        let userId = this.props.appDataReducer.data.id;
        if(!userId) userId = -1;
        this.props.addScoreThunk(userId, answerId, score);
    }
    addQuestionScore = (questionId, score) =>{
        let userId = this.props.appDataReducer.data.id;
        if(!userId) userId = -1;

        this.props.addQuestionScoreThunk(userId, questionId, score)
    }
    deleteQuestion = (id) =>{
        this.props.deleteMyQuestionThunk(id);
    }
    componentDidMount(){
        let questionId = this.props.match.params.questionID;
        this.props.getQuestionPageThunk(questionId);
        
    }
    render = () =>{
        const myId = this.props.appDataReducer.data.id;
        const authorId = this.props.currentPage.question.author.id;
        let isMyQuestion = false;
        if (myId && authorId && (myId === authorId)) isMyQuestion = true;
        
        return(
            <QuestionPage 
            addAnswer={this.addAnswer} appDataReducer={this.props.appDataReducer} 
            question={this.props.currentPage.question} answers={this.props.currentPage.answers}
            deleteAnswer={this.deleteAnswer} updateAnswer={this.updateAnswer}
            isMyQuestion={isMyQuestion} setBestAnswer={this.setBestAnswer}
            addScore={this.addScore} deleteQuestion={this.deleteQuestion}
            addQuestionScore={this.addQuestionScore}
            />
        )
    }
}
let mapStateToProps = (state) => ({
    currentPage: state.questionPage,
    appDataReducer: state.appDataReducer
    
});
export default compose(connect(mapStateToProps, { getQuestionPageThunk ,setBestAnswerThunk, 
    addAnswerThunk,deleteAnswerThunk, updateAnswerThunk,addScoreThunk, deleteMyQuestionThunk,addQuestionScoreThunk}),withRouter,)(QuestionPageClass);