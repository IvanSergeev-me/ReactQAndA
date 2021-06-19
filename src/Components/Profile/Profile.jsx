import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../../HOC/AuthRedirect';
import { withRouter } from 'react-router-dom';
import AccountImg from './account.png';
import UserQuestion from './UserQuestion/UserQuestion.jsx';
import s from './Profile.module.css';
import { setQuestionsThunk,deleteMyQuestionThunk } from '../../Redux/Reducers/profile-reducer';
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

            </div>
            <div className={s.profile_actions}>
                {myQuestions}
            </div>
        </section>
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