import React from 'react';
import s from './Footer.module.css';
import { withRouter } from 'react-router';
const Footer = (props) =>{
    let needToShow = props.location.pathname != "/Login";
    //console.log(props.location.pathname)
    if(needToShow){
        return(
       
            <section className={s.footer_wrapper}>
                <div className={s.footer_column}>
                    <h1 className={s.footer_title}>О проекте</h1>
                    <div className={s.footer_text}>
                        Информация
                    </div>
                </div>
                <div className={s.footer_column}>
                    <h1 className={s.footer_title}>Ссылки</h1>
                    <div className={s.footer_text}>
                        Информация
                    </div>
                </div>
                <div className={s.footer_column}>
                    <h1 className={s.footer_title}>Разработчик</h1>
                    <div className={s.footer_text}>
                        Информация
                    </div>
                </div>
            </section>
        );

    }
    else return (<></>)
    
}
export default withRouter(Footer)