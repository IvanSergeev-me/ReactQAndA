import React from 'react';
import s from './Questions.module.css'
import Question from './Question/Question.jsx';
import Preloader from '../../Common/Preloader/Preloader.jsx';
import { compose } from 'redux';
import {connect} from 'react-redux';
import {getQuestionsThunk} from '../../../Redux/Reducers/questions-reducer.js';
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
        />
    });
    return(
        <section className={s.questions_wrapper}>
            {question_list}
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
    render =() =>{

        return (
            <>
                {this.props.questions.isFetching ? <Preloader /> : null}
                <Questions questions={this.props.questions.questions} 
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


export default compose(connect(mapStateToProps, {getQuestionsThunk}))(QuestionsClass);
