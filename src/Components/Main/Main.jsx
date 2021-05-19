import React from 'react';
import Aside from './Aside/AsidePanel.jsx';
import Questions from './Questions/Questions.jsx';
import QuestionPage from './Questions/QuestionPage/QuestionPage.jsx';
import AskQuestion from './AskQuestion/AskQuestion.jsx';
import {Route} from "react-router-dom";
import s from './Main.module.css';
const Main = (props) =>{
    return(
        <main>
            <Route path="/Question/:questionID?" render={()=><QuestionPage />}/>
            <Route path="/Questions" render={()=><Questions />} />
            <Route path="/AskQuestion" render={()=><AskQuestion />} />
            <Aside />

        </main>
    );
}
export default Main