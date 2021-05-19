import React from 'react';
import s from './AskQuestion.module.css';
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../Common/Forms/Textarea.js';
import { Input } from '../../Common/Forms/Input';
import {requiredField, maxLength} from '../../../Assets/Utils/validators/validator.js';
const AskQuestion = (props) =>{
    let sendQuestion = (values) =>{
        props.askNewQuestion(values);
        
    };
    return(
        <div>
           <h1>Создание вопроса</h1>
           <NewQuestionForm onSubmit={sendQuestion}/>
        </div>
        );
};
const AskQuestionForm = (props) =>{
    return(
        <form  onSubmit={props.handleSubmit} className={s.form} >
            <Field validate={[requiredField,maxLength]} component={Input} name={"newQuestionTitle"} placeholder="Придумайте заголовок"/>
            <Field  validate={[requiredField]} component={Textarea} name={"newQuestionContent"} placeholder="Задайте Ваш вопрос..." />
            <button type="submit" className={s.form_send}>Отправить</button>
        </form>
    );
};
const NewQuestionForm = reduxForm({
    form:"askQuestionForm"
})(AskQuestionForm);
class AskQuestionClass extends React.Component{
    constructor(props){
        super(props);
    }
    askNewQuestion = (values) =>{
        console.log(values);
        alert("aaa");
        
    }
    render = () =>{
        //Тут проверка если не залогинен то на логин кидать
        return <AskQuestion askNewQuestion={this.askNewQuestion}/>
    }
}
let mapStateToProps = (state) => ({
    
});
export default connect(mapStateToProps, {})(AskQuestionClass);