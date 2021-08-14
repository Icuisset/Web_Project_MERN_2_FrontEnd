import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HeaderNavBar.css";
import SigninoutButton from "../SigninoutButton/SigninoutButton";

function HeaderNavBar(props) {
  return (
    <>
      <header className='header__navbar'>
        <Link
          className={`header__logo header__logo_textcolor_${props.textColor}`}
          to={"/"}>
          NewsExplorer
        </Link>
        <div className='header__navigation'>
          <Link
            className={`header__link header__link_textcolor_${
              props.textColor
            } ${props.isHomePage && "header__link_focused_home"}`}
            to={"/"}>
            Home
          </Link>
          {props.isLoggedIn ? (
            <Link
              className={`header__link header__link_textcolor_${
                props.textColor
              } ${props.isNewsPage && "header__link_focused_news"}`}
              to={"/saved-news"}>
              Saved articles
            </Link>
          ) : null}

          <button
            type='button'
            onClick={props.mobileMenuClick}
            className={`header__menu-icon header__menu-icon_textcolor_${props.textColor}`}
          />
          <div className='header__signinout'>
            <SigninoutButton
              isLoggedIn={props.isLoggedIn}
              textColor={props.textColor}
              signinClick={props.signinClick}
              signoutClick={props.signoutClick}
              ></SigninoutButton>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderNavBar;
