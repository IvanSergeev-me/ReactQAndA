import React from 'react';
import Aside from './Aside/AsidePanel.jsx';
import Questions from './Questions/Questions.jsx';
import QuestionPage from './Questions/QuestionPage/QuestionPage.jsx';
import AskQuestion from './AskQuestion/AskQuestion.jsx';
import {Route} from "react-router-dom";
import s from './Main.module.css';
import Login from '../EnterPages/Login/Login.jsx';
import Registration from '../EnterPages/Registration/Registration.jsx';
import Profile from '../Profile/Profile.jsx';
import Moderate from '../Moderate/Moderate.jsx';
const Main = (props) =>{
    return(
        <main className={s.main_wrapper}>
            <Route path="/Question/:questionID?" render={()=><QuestionPage />}/>
            <Route exact path={["/","/Questions"]} render={()=><Questions />} />
            <Route path="/AskQuestion" render={()=><AskQuestion />} />
            <Route path="/Login" render={()=><Login />} />
            <Route path="/Registration" render={()=> <Registration />}/>
            <Route path="/Profile" render={()=><Profile />} />
            <Route path="/Moderate" render={()=><Moderate />} />
            <Aside />

        </main>
    );
}
export default Main