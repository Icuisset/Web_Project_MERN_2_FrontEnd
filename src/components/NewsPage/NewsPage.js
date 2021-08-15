import React, { useState } from "react";
import UserContext from "../../contexts/CurrentUserContext";

import "./NewsPage.css";

import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";

function Newspage(props) {
  const user = React.useContext(UserContext);

  const [newsTextColor, setNewsTextColor] = useState("dark");
  const [isHomePage, setisHomePage] = useState(false);

  return (
    <>
      <div className='newspage__header-zone'>
        <HeaderNavBar
          isLoggedIn={props.isLoggedIn}
          textColor={newsTextColor}
          signinClick={props.signinClick}
          signoutClick={props.signoutClick}
          mobileMenuClick={props.mobileMenuClick}
          isNewsPage={true}></HeaderNavBar>
      </div>
      <section className='newspage__top-section'>
        <p className='newspage__subtitle'>Saved articles</p>
        <h1 className='newspage__title'>
          {`${user.name}, you have ${props.savedArticles.length} saved articles`}
        </h1>
        <p className='newspage__keywords'>
          By keywords:
          <span>
            <b> Nature, Yellowstone, and 2 others.</b>
          </span>
        </p>
      </section>
      <SearchResultsSection
        cards={props.cards}
        totalCards={props.totalCards}
        keyword={props.keyword}
        savedArticles={props.savedArticles}
        isHomePage={isHomePage}
      />
    </>
  );
}

export default Newspage;
