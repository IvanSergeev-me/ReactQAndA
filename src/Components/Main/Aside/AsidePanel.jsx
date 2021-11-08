import s from './Aside.module.css';
import React from 'react';
import arrow from '../../../Assets/Images/left-arrow.svg';
import { compose } from 'redux';
import {connect} from 'react-redux';
import {toggleOpen} from '../../../Redux/Reducers/aside-reducer.js';
import { NavLink } from 'react-router-dom';
const ShowedAside = (props) =>{
    let closeAside = (e) =>{
        props.toggleActiveAside();
        e.preventDefault();
    }
    return(
        <section className={s.aside_showed}>
            <div className={s.aside_container}>
                <button className={s.aside_close_button} onClick={closeAside}>Закрыть</button>
                <nav className={s.aside_nav}>
                    <NavLink  to="/AskQuestion" className={s.aside_nav_element}>Задать вопрос</NavLink>
                   
                    <NavLink to="/Questions" className={s.aside_nav_element} >Домой</NavLink>
                </nav>
                
            </div>
        </section>
    
    )
}
//Need to use hooks
class Aside extends React.Component{
    constructor(props){
        super(props);
    }
    toggleActiveAside = () =>{
        this.props.toggleOpen();
    }
    render(){        
        return(
            <>          
                {
                this.props.aside.isActive? 
                <ShowedAside toggleActiveAside={this.toggleActiveAside}/>:
                  <section className={s.aside_collapsed}>
                      <img className={s.aside_collapsed_arrow} src={arrow} alt="arrow"  onClick={this.toggleActiveAside}/> 
                  </section>
                }          
            </>
        );
    }   
}
let mapStateToProps = (state) =>{
    return {
       aside:state.aside
    };
};


export default compose(connect(mapStateToProps, {toggleOpen}))(Aside);