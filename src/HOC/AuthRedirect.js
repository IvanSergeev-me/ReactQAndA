import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

let mapStateToProps = (state) => ({
    isAuth: state.appDataReducer.isAuth
});

export let withAuthRedirectComponent = (Component) =>{
   class RedirectComponent extends React.Component{
       render(){
            if (!this.props.isAuth){
                return <Redirect to="/Login"/>
            };
            return <Component {...this.props}/>;
       };
       
   };
   return connect(mapStateToProps)(RedirectComponent);
};
