import React from 'react';
import s from './Change.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import {changeUserThunk} from '../../../Redux/Reducers/profile-reducer.js';
import { Field, reduxForm } from 'redux-form';
import { ChangeInput } from '../../Common/Forms/ChangeInput.js';
import {requiredField, maxLength} from '../../../Assets/Utils/validators/validator.js';
import { NavLink } from 'react-router-dom';

const Change = (props) =>{
    
    let onSubmit = (values) =>{
        let newLogin = values.UserNewLogin;
        let newPassword = values.UserNewPassword;
        let newImage = values.UserNewImage;
        if(!newLogin) newLogin = "old";
        if(!newPassword) newPassword = "old";
        if(!newImage) newImage = "old";
        props.updateUser(newLogin, newPassword, newImage);
    }
    return(
        <div className={s.change_wrapper}>
            <ChangeUserForm onSubmit={onSubmit} type={props.typeChange}/>
            <NavLink className={s.form_send} to={"/Profile/Settings"}>Вернуться</NavLink>
        </div>
    );
}
const ChangeForm = (props) =>{
    let type = props.type;
    return(
        <form onSubmit={props.handleSubmit} className={s.form} >
            {type==="login"?<Field validate={[requiredField,maxLength]} component={ChangeInput} name={"UserNewLogin"} placeholder="Измените логин"/>:null}
            {type==="password"?<Field validate={[requiredField,maxLength]} component={ChangeInput} name={"UserNewPassword"} placeholder="Измените пароль"/>:null}
            {type==="image"?<Field validate={[requiredField]} component={ChangeInput} name={"UserNewImage"} placeholder="Измените ссылку на изображение"/>:null}
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
        if (login === "old") login = this.props.appDataReducer.data.login;
        if (password === "old") password = this.props.appDataReducer.data.password;
        if (image === "old") image = this.props.appDataReducer.data.image;
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
