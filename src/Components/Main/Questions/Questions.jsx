import React from 'react';
import s from './Questions.module.css'
import Question from './Question/Question.jsx';
import Preloader from '../../Common/Preloader/Preloader.jsx';
import { compose } from 'redux';
import {connect} from 'react-redux';
import {getQuestionsThunk, getSortedThunk} from '../../../Redux/Reducers/questions-reducer.js';
const Questions = (props) =>{
    let question_list = props.questions.map(q => {
        return <Question
            key={q.id}
            id={q.id}
            author={q.author}
            date={q.date}
            views={q.views}
            answers={q.answers}
            title={q.title}
            text={q.text}
            isAnswerGiven={q.isAnswerGiven}
            averageRating = {q.averageRating}
        />
    });
    let sortQuestions = (e) =>{
        let type = "default";
        if(e.target.value){
            type=e.target.value
        }
        props.sortQuestions(type);
    }
    //Сортировка вопросов сделана на беке, а не на фронте, так как подразумевается, что ответ будет приходить постранично.
    //Поэтому, если сортировка будет на фронте, то сортироваться будет лишь конкретная страница, а не все вопросы сразу.
    return(
        <section className={s.questions_section}>
            <div className={s.wrapper__sort}>
                <div className={s.sort__column}>
                    <span className={s.sort__title}>Сортировать по:</span>
                    <select defaultValue={"Стандарт"} onChange={sortQuestions}  className={s.sort__select} name="sortQuestions" id="sortQ">
                        <option onClick={sortQuestions} className={s.select__option}  value="DATE">Дате</option>
                        <option onClick={sortQuestions} className={s.select__option} value="ALPHABET">Алфавиту</option>
                        <option onClick={sortQuestions} className={s.select__option} value="RATING">Рейтингу</option>
                    </select>
                </div>
                <div className={s.sort__column}>
                    <span className={s.sort__title}>Фильровать по категории:</span>
                    <select className={s.sort__select} name="filterQuestions" id="filterQ">
                        <option className={s.select__option}  value="date">test</option>
                    </select>
                </div>
            </div>
            <div className={s.questions_wrapper}>
            
                {question_list}
            </div>
        </section>
    );
}

class QuestionsClass extends React.Component {
    constructor(props) {
        super(props);
    };
    componentDidMount() {
        this.props.getQuestionsThunk(0, 0);
         
    };
    componentDidUpdate(){
    }
    sortQuestions = (type) =>{
        this.props.getSortedThunk(type, "2000-01-01");
    }
    render =() =>{
        return (
            <>
                {this.props.questions.isFetching ? <Preloader /> : null}
                <Questions questions={this.props.questions.questions} 
                    sortQuestions={this.sortQuestions}
                   />
            </>
        );
    };

};

let mapStateToProps = (state) =>{
    return {
        questions:state.questions
    };
};

export default compose(connect(mapStateToProps, {getQuestionsThunk, getSortedThunk}))(QuestionsClass);
