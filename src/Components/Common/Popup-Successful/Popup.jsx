import React,{useState,useEffect} from 'react';
import s from './Popup.module.css';
import crossSvg from './cross.svg'
const Popup=(props)=>{
    let PopupText = `${props.popupAction} выполнено успешно!`;
    const [show, setShow] = useState(props.needToShow);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    return(
        <div className={show?s.popup_login:s.popup_login_hidden} id="popup_new_order">
            <div onClick={handleClose} className={s.popup_login_area}></div>
            <div className={s.popup_login_body}>
                <div className={s.popup_login_content}>
                    <div className={s.pupup_content_header}>
                     
                        <span>Действие выполнено успешно</span>
                        <a href="#" className={s.popup_login_close}><img src={crossSvg} alt="cross"/></a>
                    </div>
                    
                    <p className={s.popup_login_title}>
                        {PopupText}
                    </p>    
                </div>
            </div>
        </div>
    )
}
export default Popup;