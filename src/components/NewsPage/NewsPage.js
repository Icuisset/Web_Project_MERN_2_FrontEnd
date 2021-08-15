/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UserContext from "../../contexts/CurrentUserContext";

import "./NewsPage.css";

import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";

function Newspage(props) {
  const user = React.useContext(UserContext);

  const [newsTextColor, setNewsTextColor] = useState("dark");
  const [isHomePage, setisHomePage] = useState(false);

  const initialKeywordsList = props.savedArticles.map(
    (article) => article.keyword
  );
  const keywordsMap = initialKeywordsList.reduce(
    // eslint-disable-next-line no-sequences
    (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
    {}
  );

  const sortedKeywordsMap = Object.fromEntries(
    Object.entries(keywordsMap).sort(([, a], [, b]) => b - a)
  );

  const keywordCount = Object.keys(keywordsMap).length;

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

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
        {keywordCount >= 0 ? (
          <p className='newspage__keywords'>
            By keywords:
            <span>
              {keywordCount >= 4 ? (
                <b>
                  {` ${capitalize(
                    Object.keys(sortedKeywordsMap)[0]
                  )}, ${capitalize(Object.keys(sortedKeywordsMap)[1])}, and ${
                    keywordCount - 2
                  } others.`}
                </b>
              ) : null}
              {keywordCount === 3 ? (
                <b>
                  {` ${capitalize(
                    Object.keys(sortedKeywordsMap)[0]
                  )}, ${capitalize(
                    Object.keys(sortedKeywordsMap)[1]
                  )}, and ${capitalize(Object.keys(sortedKeywordsMap)[2])}.`}
                </b>
              ) : null}
              {keywordCount === 2 ? (
                <b>
                  {` ${capitalize(
                    Object.keys(sortedKeywordsMap)[0]
                  )} and ${capitalize(Object.keys(sortedKeywordsMap)[1])}.`}
                </b>
              ) : null}
              {keywordCount === 1 ? (
                <b>{` ${capitalize(Object.keys(sortedKeywordsMap)[0])}.`}</b>
              ) : null}
            </span>
          </p>
        ) : null}
      </section>
      <SearchResultsSection
        cards={props.cards}
        totalCards={props.totalCards}
        keyword={props.keyword}
        savedArticles={props.savedArticles}
        isHomePage={isHomePage}
        onArticleDelete={props.onArticleDelete}
      />
    </>
  );
}

export default Newspage;
