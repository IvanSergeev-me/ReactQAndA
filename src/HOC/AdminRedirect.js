import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

let mapStateToProps = (state) => ({
    isAdmin: state.appDataReducer.data.isAdmin
});

export let withAdminRedirect = (Component) =>{
   class RedirectComponent extends React.Component{
       render(){
            if (!this.props.isAdmin){
                return <Redirect to="/Questions"/>
            };
            return <Component {...this.props}/>;
       };
       
   };
   return connect(mapStateToProps)(RedirectComponent);
};