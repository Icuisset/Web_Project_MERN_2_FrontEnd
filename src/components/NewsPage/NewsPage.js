import React from "react";

import './NewsPage.css';

import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";

function Newspage(props) {

  return (
    <>
    <div className='newspage-top'>
    <HeaderNavBar isLoggedIn={props.isLoggedIn} textColor={"dark"}></HeaderNavBar>
    </div>
    <SearchResultsSection
     cards ={props.cards}
     isHomePage={false} />
    </>
  );
}

export default Newspage;
