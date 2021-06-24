import React from 'react';
import s from './Change.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import {changeUserThunk} from '../../../Redux/Reducers/profile-reducer.js';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../Common/Forms/Input.js';
import {requiredField, maxLength} from '../../../Assets/Utils/validators/validator.js';

const Change = (props) =>{
    let onSubmit = (values) =>{
        let newLogin = values.UserNewLogin;
        let newPassword = values.UserNewPassword;
        let newImage = values.UserNewImage;
        props.updateUser(newLogin, newPassword, newImage);
    }
    return(
        <div className={s.change_wrapper}>
            change 
            <ChangeUserForm onSubmit={onSubmit}/>
        </div>
    );
}
const ChangeForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={s.form} >
            <Field validate={[requiredField,maxLength]} component={Input} name={"UserNewLogin"} placeholder="Измените логин"/>
            <Field validate={[requiredField,maxLength]} component={Input} name={"UserNewPassword"} placeholder="Измените пароль"/>
            <Field validate={[requiredField]} component={Input} name={"UserNewImage"} placeholder="Измените ссылку на изображение"/>
            <div className={s.form_button_container}>
                <button type="submit" className={s.form_send}>Отправить</button>
            </div>
            
        </form>
    );
};
const ChangeUserForm = reduxForm({
    form:"changeForm"
})(ChangeForm);
class ChangeClass extends React.Component{
    constructor(props){
        super(props);
    }
    updateUser = (login, password, image) =>{
        let myId = this.props.appDataReducer.data.id;
        this.props.changeUserThunk( myId, login, password, image);
    }
    render(){
        let type = this.props.match.params.type;
        return(
            <Change updateUser={this.updateUser} typeChange={type}/>
        );
    }
}
let mapStateToProps = (state) =>({
    appDataReducer:state.appDataReducer,
    profileReducer:state.profileReducer
});
export default compose(connect(mapStateToProps, {changeUserThunk})
,withRouter,
)(ChangeClass);
