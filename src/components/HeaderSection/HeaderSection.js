import React from "react";

import "./HeaderSection.css";

import SearchBox from "../SearchBox/SearchBox";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";

function HeaderSection(props) {
  return (
    <div className='header-zone'>
      <HeaderNavBar isLoggedIn={props.isLoggedIn} textColor={props.textColor}></HeaderNavBar>
      <div className='header__search'>
        <h1 className='header__title'>What's going on in the world?</h1>
        <p className='header__subtitle'>
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchBox></SearchBox>
      </div>
    </div>
  );
}

export default HeaderSection;
