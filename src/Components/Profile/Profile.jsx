import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../../HOC/AuthRedirect';
import { withRouter } from 'react-router-dom';
import AccountImg from './account.png';
import UserQuestion from './UserQuestion/UserQuestion.jsx';
import s from './Profile.module.css';
import { setQuestionsThunk,deleteMyQuestionThunk } from '../../Redux/Reducers/profile-reducer';
import { NavLink } from 'react-router-dom';
import Change from './Change/Change.jsx';
import {Route} from "react-router-dom";
const Profile = (props) =>{
    let personalData = props.personalData;
    let myQuestions = props.userQuestions.map(
        q =>{
            return <UserQuestion 
                key = {q.id}
                id = {q.id}
                title = {q.title}
                text = {q.text}
                deleteQuestion={props.deleteQuestion}
                author={q.author}
                date={q.date}
                views={q.views}
                answers={q.answers}
                isAnswerGiven={q.isAnswerGiven}
            />
        }
    )
    return(
        <section className={s.profile_wrapper}>
            <div className={s.profile_header}>
                <div className={s.profile_header__personal}>
                    <div className={s.personal__avatar_container}>
                        <img className={s.avatar__image} src={personalData.image?personalData.image:AccountImg} alt="avatar" /> 
                    </div>
                    <div className={s.personal__login}>{personalData.login}</div>
                </div>
               
                <Route path="/Profile/Settings" render={()=><ProfileOptions personalData={personalData}/> }/>
                <Route path="/Profile/Change/:type?" render={()=><Change />}/>
            </div>
            <div className={s.profile_actions}>
                <h2 className={s.actions__title}>Ваши действия {myQuestions.length>0?`: ${myQuestions.length}`:null} </h2>
                {myQuestions}
            </div>
        </section>
    )
}
const ProfileOptions = (props) =>{
    return(
        <div className={s.profile_header__options}>
            <div className={s.options__column}>
                <NavLink to={"/Profile/Change/login"} className={s.column__option}>Изменить логин</NavLink>
                <NavLink to={"/Profile/Change/password"} className={s.column__option}>Изменить пароль</NavLink>
                <NavLink to={"/Profile/Change/image"} className={s.column__option}>Загрузить аватар</NavLink>       
            </div>
            <div className={s.options__column}>
                <div className={s.column__option}>Удалить учетную запись</div>
                {props.personalData.isAdmin?<NavLink to={"/Moderate"} className={s.column__option}>Модерация пользователей</NavLink>:null}   
            </div>
        </div>
    )
}
class ProfileClass extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let id = this.props.appDataReducer.data.id;
        this.props.setQuestionsThunk(id);
    }
    deleteQuestion = (id) =>{
        this.props.deleteMyQuestionThunk(id);
    }
    render(){
        return(
            <Profile deleteQuestion={this.deleteQuestion} userQuestions={this.props.profileReducer.userQuestions} personalData={this.props.appDataReducer.data}/>
        )
    }
}
let mapStateToProps = (state) =>({
    appDataReducer:state.appDataReducer,
    profileReducer:state.profileReducer
});
export default compose(connect(mapStateToProps, {setQuestionsThunk,deleteMyQuestionThunk})
,withRouter,
withAuthRedirectComponent
)(ProfileClass);