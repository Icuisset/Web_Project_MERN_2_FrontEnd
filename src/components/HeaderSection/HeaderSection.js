import React from "react";

import "./HeaderSection.css";

import SearchBox from "../SearchBox/SearchBox";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";

function HeaderSection(props) {
  return (
    <div className='heading-zone'>
      <HeaderNavBar
        isLoggedIn={props.isLoggedIn}
        textColor={props.textColor}
        signinClick={props.signinClick}
        signoutClick={props.signoutClick}
        mobileMenuClick={props.mobileMenuClick}
        isHomePage={props.isHomePage}></HeaderNavBar>
      <div className='heading-zone__search'>
        <h1 className='heading-zone__title'>What's going on in the world?</h1>
        <p className='heading-zone__subtitle'>
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchBox></SearchBox>
      </div>
    </div>
  );
}

export default HeaderSection;
