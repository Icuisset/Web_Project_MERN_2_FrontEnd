import React, { useState } from "react";

import HeaderSection from "../HeaderSection/HeaderSection";
import AboutSection from "../AboutSection/AboutSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";
import ResultsLoadingSection from "../ResultsLoadingSection/ResultsLoadingSection";
import NothingFoundSection from "../NothingFoundSection/NothingFoundSection";

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
      />
      <SearchResultsSection cards={props.cards} isHomePage={isHomePage} />
      <ResultsLoadingSection></ResultsLoadingSection>
      <NothingFoundSection></NothingFoundSection>
      <AboutSection />
    </>
  );
}

export default Homepage;
