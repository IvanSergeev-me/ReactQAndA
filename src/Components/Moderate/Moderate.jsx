import React from 'react';
import s from './Moderate.module.css';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withAdminRedirect} from '../../HOC/AdminRedirect.js';

let Moderate = (props) =>{
    return(
        <div>moderate</div>
    )
}

class ModerateClass extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <Moderate />;
    }
}
let mapStateToProps = (state) =>({
    appDataReducer: state.appDataReducer
})
export default compose(connect(mapStateToProps, {}),
withAdminRedirect
)(ModerateClass);