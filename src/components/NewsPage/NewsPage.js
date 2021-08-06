import React from "react";

import "./NewsPage.css";

import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";

function Newspage(props) {
  return (
    <>
      <div className='newspage__header-zone'>
        <HeaderNavBar
          isLoggedIn={props.isLoggedIn}
          textColor={"dark"}
          signinClick={props.signinClick}
          signoutClick={props.signoutClick}></HeaderNavBar>
      </div>
      <section className='newspage__top-section'>
        <p className='newspage__subtitle'>Saved articles</p>
        <h1 className='newspage__title'>Elise, you have 5 saved articles</h1>
        <p className='newspage__keywords'>
          By keywords:
          <span>
            <b> Nature, Yellowstone, and 2 others.</b>
          </span>
        </p>
      </section>
      <SearchResultsSection cards={props.cards} isHomePage={false} />
    </>
  );
}

export default Newspage;
