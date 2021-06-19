import React from 'react';
import s from './AskQuestion.module.css';
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../Common/Forms/Textarea.js';
import { Input } from '../../Common/Forms/Input';
import {requiredField, maxLength} from '../../../Assets/Utils/validators/validator.js';
import {getCategories, getSubcategoriesForCategory,selectSubCategory, askQuestionThunk } from '../../../Redux/Reducers/ask-reducer.js';
import { withAuthRedirectComponent } from '../../../HOC/AuthRedirect';
import { compose } from 'redux';
const AskQuestion = (props) =>{
    
    let categoriesList = props.categories.map(
        c =>{
            return <CategoryBrick     
                key = {c.id}
                id = {c.id}
                name = {c.name}
                loadSubcategories={props.loadSubcategories}
                
                isCategory={true}
             />
        }
    );
    let subcategoryList = props.subcategories.map(
        c =>{
            return <CategoryBrick     
                key = {c.id}
                id = {c.id}
                name = {c.name}  
                selectSubcategory={props.selectSubcategory}  
               
                isCategory={false}
             />
        }
    );
    let sendQuestion = (values) =>{
        props.askNewQuestion(values);
    };
    return(
        <div className={s.ask_wrapper}>
           <h1 className={s.ask_title}>Создание вопроса</h1>
           <div className={s.ask_categories_choise}>
                <div className={s.categories_choise_column}>
                    <h3>Категории</h3>
                    {categoriesList}
                </div>
                <div className={s.categories_choise_column}>
                    <h3>Подкатегории</h3>
                    {subcategoryList}
                </div>
           </div>
           {props.selectedCategory.id?<div className={s.question_category_container}>
                Выбрана категория: <h1 className={s.question_category}>{props.selectedCategory.name}</h1>/<h2 className={s.question_subcategory}>{props.selectedSubCategory.name}</h2>  
            </div>:<></>}
           
           <NewQuestionForm onSubmit={sendQuestion}/>
        </div>
        );
};
const AskQuestionForm = (props) =>{
    return(
        <form  onSubmit={props.handleSubmit} className={s.form} >
            <Field validate={[requiredField,maxLength]} component={Input} name={"newQuestionTitle"} placeholder="Придумайте заголовок"/>
            <Field  validate={[requiredField]} component={Textarea} name={"newQuestionContent"} placeholder="Задайте Ваш вопрос..." />
            <div className={s.form_button_container}>
                <button type="submit" className={s.form_send}>Отправить</button>
            </div>
            
        </form>
    );
};

const CategoryBrick = (props) =>{
    let loadSubcategories = () =>{
        
        props.loadSubcategories(props.id, props.name);
    };
    let selectSubcategory = () =>{

        props.selectSubcategory(props.id, props.name);
    };
    return(
        <div onClick={props.isCategory?loadSubcategories:selectSubcategory} className={s.categoryBrick}>
            <span className={s.categoryBrick_id}>{props.id}.</span>
            <span className={s.categoryBrick_name}>{props.name}</span>
        </div>
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
        let title = values.newQuestionTitle;
        let description = values.newQuestionContent
        this.props.askQuestionThunk(1, 1, title,description);
        
    }
    loadSubcategories =(id, name) =>{
        this.props.getSubcategoriesForCategory(id,name);
    }
    selectSubcategory = (id,name) =>{
        this.props.selectSubCategory(id,name);
    }
   
    componentDidMount(){
        this.props.getCategories();
    }
    render = () =>{
        return <AskQuestion
        selectedCategory={this.props.askQuestion.selectedCategory} selectedSubCategory={this.props.askQuestion.selectedSubCategory}
         loadSubcategories={this.loadSubcategories} 
        subcategories={this.props.askQuestion.subCategoriesForCategory} categories={this.props.askQuestion.categories} 
        askNewQuestion={this.askNewQuestion} selectSubcategory={this.selectSubcategory}/>
    }
}
let mapStateToProps = (state) => ({
    askQuestion: state.askQuestion
});

export default compose(connect(mapStateToProps, {getCategories,  getSubcategoriesForCategory, selectSubCategory,  askQuestionThunk}),
withAuthRedirectComponent
)(AskQuestionClass);