import React from 'react';
import s from './Moderate.module.css';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withAdminRedirect} from '../../HOC/AdminRedirect.js';
import {deleteUserThunk, getUsersThunk} from '../../Redux/Reducers/admin-reducer.js';
import UserCard from './UserCard/UserCard.jsx';

let Moderate = (props) =>{
    let deleteUser=(id) =>{
        props.deleteUser(id);
    }
    let userList = props.users.map(u=>
        <UserCard
            key={u.id}
            id={u.id}
            image={u.image}
            login={u.login}
            isAdmin={u.isAdmin}
            deleteUser={deleteUser}
            myId = {props.myId}
        />);
    return(
        <div className={s.moderate__wrapper}>
            <h2 className={s.moderate__title}>Список всех пользователей</h2>
            {userList}
        </div>
    )
}

class ModerateClass extends React.Component {
    constructor(props){
        super(props);
    }
    deleteUser = (id) =>{
        console.log("aaaa")
        this.props.deleteUserThunk(id);
    }
    componentDidMount = () =>{
        this.props.getUsersThunk();
    }
    render(){
        let myId = this.props.appDataReducer.data.id;
        return <Moderate users={this.props.adminReducer.users} deleteUser={this.deleteUser}  myId={myId}/>;
    }
}
let mapStateToProps = (state) =>({
    appDataReducer: state.appDataReducer,
    adminReducer: state.adminReducer
})
export default compose(connect(mapStateToProps, {deleteUserThunk, getUsersThunk}),
withAdminRedirect
)(ModerateClass);