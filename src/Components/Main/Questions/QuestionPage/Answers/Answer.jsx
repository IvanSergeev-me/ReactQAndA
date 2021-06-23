import React, {useState, useEffect}  from 'react';
import s from './Answer.module.css';
import defaultImg from './account.png';
import editImg from './edit.svg';

const Answer = (props) =>{
    let ratingScale = props.averageRating;
    let isAuth = props.isAuth;
    let itsId = props.id;
    let conditionToEdit = isAuth & !props.isBest & (props.userId === props.myId)
    let [editMode, toggleEditMode] = useState(false);
    let [answerText, setAnswerText] = useState(props.answer);
    useEffect(()=>{
        setAnswerText(props.answer)
    },[props.answer]);
    const toggleEdit = () =>{
        if(conditionToEdit){
            console.log("toggleEdit")
            
            editMode?toggleEditMode(false):toggleEditMode(true);
            console.log(editMode)
            if (!editMode){
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
    return(
        <div className={props.isBest?s.answer_wrapper + " " + s.best_answer:s.answer_wrapper}>
            <div className={s.answer_left}>
                <img className={s.left_avatar} src={defaultImg} alt="avatar" />
                <div className={s.left_name}>{props.userId}-Автор</div>
                {conditionToEdit?<div className={s.edit_or_delete}>
                    <div onClick={deleteThisAnswer} className={s.delete_button}>X</div>
                    <div onClick={toggleEdit} className={s.edit_button}>
                        <img className={s.edit_button__image}src={editImg} alt="edit" />
                    </div>
                </div>:null}
                
            </div>
            <div className={s.answer_right}>
                {editMode?
                <textarea onChange={onAnswerChange} onBlur={toggleEdit}  autoFocus={true} className={s.right_input_area} value = {answerText}/>:
                <p onClick={toggleEdit} className={s.right_text}>{props.answer}</p>}
                <div className={s.right_rating}><span className={ratingScale>=0&&ratingScale<3?s.low_rating:ratingScale>=3&&ratingScale<4?s.medium_rating:s.high_rating}>{ratingScale}</span>/5</div>
            </div>
        </div>
    )
}
export default Answer;