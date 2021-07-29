import React from "react";
import { Link } from "react-router-dom";


import './Header.css';
import Signinout from "../Signinout/Signinout";
import SearchBox from "../SearchBox/SearchBox";

function Header(props) {

  return (
    <div className="header">
    <header className='header__top'>
      <Link className='header__logo' to={'/'}>NewsExplorer</Link>
      <div className='header__navigation'>
      <Link className='header__link header__link_focused' to={'/'}>Home</Link>
      <Link className='header__link' to={'/saved-news'}>Saved articles</Link>
      <div className='header__menu-icon'/>
      <div className='header__signinout'>
      <Signinout></Signinout>
      </div>
      </div>
    </header>
    <div className='header__search'>
    <h1 className="header__title">What's going on in the world?</h1>
    <p className="header__subtitle">Find the latest news on any topic and save them in your personal account.</p>
    <SearchBox></SearchBox>
    </div>
    </div>
  );
}

export default Header;
