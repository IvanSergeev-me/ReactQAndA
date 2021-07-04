import React from 'react';
import s from './UserCard.module.css';
import defaultImg from './account.png';


let UserCard = (props) =>{
    let deleteUser = (e) =>{
        props.deleteUser(props.id);
        e.preventDefault();
    }
    let condition =  props.myId !== props.id;
    if (condition){
        return(
            <div className={s.card__wrapper}>
                <div className={s.card__left_part}>
                    <div  className={s.right__image_container}>
                        <img className={s.right__image} src={props.image?props.image:defaultImg} alt="avatar" />
                    </div>
                </div>
                <div  className={s.card__right_part}>
                    <div className={s.right__top}>
                        <div className={s.card__column}>
                            <p className={s.column__title}>Логин</p>
                            <p className={s.column__value}>{props.login}</p>
                        </div>
                        <div className={s.card__column}>
                            <p className={s.column__title}>Номер пользователя</p>
                            <p className={s.column__value}>{props.id}</p>
                        </div>
                        <div className={s.card__column}>
                            <button onDoubleClick={deleteUser} className={s.delete_button}>Удалить</button>
                        </div>
                    </div>
                    <div className={s.right__bottom}>
                        <p className={s.column__title}>Является администратором</p>
                        <p className={s.column__value}>{props.isAdmin?"Да":"Нет"}</p>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(null)
    }
  
}
export default UserCard;
