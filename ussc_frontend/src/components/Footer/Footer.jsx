import React from 'react';
import s from './Footer.module.css';
import phoneIcon from "../../img/phoneIcon.svg";
import mailIcon from "../../img/mailIcon.svg";

const Footer = () => {
  return (
      <div className={s.footer} id='footer'>
          <div className={s.footerContainer}>
              <div className={s.footerContacts}>
              <div className={s.footerPhone}>
                  <img src={phoneIcon}/>
                  <div className={s.footerPhoneText}>
                      <span className={s.footerContactsHeader}>Телефон:</span>
                      <a href='tel:83433799834'>+7 (343) 379-98-34</a>
                  </div>
              </div>
              <div className={s.footerPhone}>
                  <img src={mailIcon}/>
                  <div className={s.footerPhoneText}>
                      <span className={s.footerContactsHeader}>Электронная почта:</span>
                      <a href='mailto:resume@ussc.ru'>resume@ussc.ru</a>
                  </div>

              </div>
              </div>

          </div>
          © ООО «УЦСБ». All rights reserved, 2022
      </div>);
};

export default Footer;
