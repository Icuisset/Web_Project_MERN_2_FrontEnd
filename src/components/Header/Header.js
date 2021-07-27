import React from "react";
import { Link } from "react-router-dom";

import './Header.css';
import SearchBox from "../SearchBox/SearchBox";

function Header(props) {

  return (
    <div className="header">
    <header className='header__top'>
      <div className='logo' />
      <div className='header__navigation'>
      <p className="header__email">{props.userEmail}</p>
			<Link className="header__link header__link_loggedin" to={props.link} onClick={props.onClick}>{props.message}</Link>
      </div>
    </header>
    <div className='header__search'>
    <h1>What's going on in the world?</h1>
    <p>Find the latest news on any topic and save them in your personal account.</p>
    <SearchBox></SearchBox>
    </div>
    </div>
  );
}

export default Header;
