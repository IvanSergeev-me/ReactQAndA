import React, {useState, useEffect}  from 'react';
import s from './Answer.module.css';
import defaultImg from './account.png';
import editImg from './edit.svg';
import StarRating from '../../../../Common/StartRating/StarRating';

const Answer = (props) =>{
    let isMyQuestion = props.isMyQuestion
    let ratingScale = props.averageRating;
    let isBest = props.isBest;
    let isAuth = props.isAuth;
    let itsId = props.id;
    let isAnswerAlreadyGiven = props.isAnswerAlreadyGiven;
    let author = props.author;
    let isAdmin = props.isAdmin;
    let conditionToEdit = ((isAuth & !props.isBest & (author.id === props.myId))||isAdmin);
    let [editMode, toggleEditMode] = useState(false);
    let [makeBest, toggleMakeBest] = useState(false);
    let [answerText, setAnswerText] = useState(props.answer);
   
    useEffect(()=>{
        setAnswerText(props.answer)
    },[props.answer]);
    const toggleBest = () =>{
        if (isMyQuestion && !isBest && !isAnswerAlreadyGiven){
            //console.log("toggleBest")
            makeBest?toggleMakeBest(false):toggleMakeBest(true);
        }
    }
    const toggleEdit = () =>{
        if(conditionToEdit){
            //console.log("toggleEdit")
            
            editMode?toggleEditMode(false):toggleEditMode(true);
            console.log(editMode)
            if (editMode){
                
                props.updateAnswer(itsId, answerText)
            };
            console.log(editMode)
        }
       
    }
    const deleteThisAnswer = () =>{
        props.deleteThisAnswer(itsId);
    }
    const onAnswerChange = (e) =>{
        setAnswerText(e.currentTarget.value);
    };
    const makeAnswerBest = (e) =>{
        props.setBestAnswer(itsId);
        e.preventDefault();
    }
    const addScore = (score) =>{
        props.addScore (itsId, score);
    }
    return(
        <div onClick={toggleBest} className={props.isBest?s.answer_wrapper + " " + s.best_answer:s.answer_wrapper}>
            <div className={s.answer_left}>
                <img className={s.left_avatar} src={author.image?author.image:defaultImg} alt="avatar" />
                <div className={s.left_name}>{author.login}-Автор</div>
                {conditionToEdit?<div className={s.edit_or_delete}>
                    <div onClick={deleteThisAnswer} className={s.delete_button}>X</div>
                    <div onClick={toggleEdit} className={s.edit_button}>
                        <img className={s.edit_button__image}src={editImg} alt="edit" />
                    </div>
                </div>:null}
                
            </div>
            <div className={s.answer_right}>
                {isBest?<p className={s.answer_best_title}>Автор считает этот ответ самым лучшим</p>:null}
                {editMode?
                <textarea onChange={onAnswerChange} onBlur={toggleEdit}  autoFocus={false} className={s.right_input_area} value = {answerText}/>:
                <p onDoubleClick={toggleEdit} className={s.right_text}>{answerText}</p>}
                <div className={s.right_bottom_options}>
                    <div className={s.right_rating}>
                        <span className={ratingScale>=0&&ratingScale<3?s.low_rating:ratingScale>=3&&ratingScale<4?s.medium_rating:s.high_rating}>{ratingScale}</span>/5 
                        {isAuth?<StarRating currentRating={ratingScale} addScore={addScore}/>:null}
                    </div>
                    {makeBest?<button onClick={makeAnswerBest} className={s.makeBest_button}>Это лучший ответ</button>:null}
                </div>
              
            </div>
        </div>
    )
}
export default Answer;