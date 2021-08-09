/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./MobileMenu.css";

import SigninoutButton from "../SigninoutButton/SigninoutButton";

function MobileMenu(props) {
  return (
    <div className={`popup-mobile ${props.isOpen && "popup_opened"}`}>
      <div className='popup__overlay' onClick={props.onClose} />
      <div
        className={`popup__container-mobile popup__container-mobile_textcolor_${props.hasTextColor}`}>
       <section className='mobile-menu'>
         <div className={`mobile__logo-zone mobile__logo-zone_textcolor_${props.hasTextColor}`}>
        <Link
          className={`header__logo header__logo_textcolor_${props.hasTextColor}`}
          to={"/"}>
          NewsExplorer
        </Link>
        <button
          type='button'
          className={`close-button-mobile close-button-mobile_textcolor_${props.hasTextColor}`}
          aria-label='close button'
          onClick={props.onClose}
        />
        </div>
        <div className='mobile__links'>
          <Link
            className={`mobile__link mobile__link_textcolor_${props.hasTextColor} header__link_focused_textcolor_${props.textColor}`}
            to={"/"}>
            Home
          </Link>
          <Link
            className={`mobile__link mobile__link_textcolor_${props.hasTextColor}`}
            to={"/saved-news"}>
            Saved articles
          </Link>
          </div>
          <div className='mobile__signinout'>
            <SigninoutButton
              isLoggedIn={props.isLoggedIn}
              textColor={props.hasTextColor}
              signinClick={props.signinClick}
              signoutClick={props.signoutClick}
              isMobileMenu={true}></SigninoutButton>
          </div>
  
      </section>
        
   
      </div>
    </div>
  );
}

export default MobileMenu;
