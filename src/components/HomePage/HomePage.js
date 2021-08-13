import React, { useState } from "react";

import HeaderSection from "../HeaderSection/HeaderSection";
import AboutSection from "../AboutSection/AboutSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";
import ResultsLoadingSection from "../ResultsLoadingSection/ResultsLoadingSection";
import NothingFoundSection from "../NothingFoundSection/NothingFoundSection";
import SearchErrorSection from "../SearchError/SearchError";

function Homepage(props) {
  const [homeTextColor, setHomeTextColor] = useState("light");
  const [isHomePage, setIsHomePage] = useState(true);

  return (
    <>
      <HeaderSection
        isLoggedIn={props.isLoggedIn}
        textColor={homeTextColor}
        signinClick={props.signinClick}
        signoutClick={props.signoutClick}
        mobileMenuClick={props.mobileMenuClick}
        isHomePage={isHomePage}
        userName={props.userName}
        onSearch={props.onSearch}
      />
      {props.isLoading || props.noArticleFound || props.isSearchError ? null : (
        <SearchResultsSection
          cards={props.cards}
          keyword={props.keyword}
          isHomePage={isHomePage}
          showMore={props.showMore}
        />
      )}
      {props.isSearchError ? <SearchErrorSection></SearchErrorSection> : null}
      {props.isLoading ? <ResultsLoadingSection></ResultsLoadingSection> : null}
      {props.noArticleFound ? (
        <NothingFoundSection></NothingFoundSection>
      ) : null}
      <AboutSection />
    </>
  );
}

export default Homepage;
