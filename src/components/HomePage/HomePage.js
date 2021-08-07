import React from "react";

import HeaderSection from "../HeaderSection/HeaderSection";
import AboutSection from "../AboutSection/AboutSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";
import ResultsLoadingSection from "../ResultsLoadingSection/ResultsLoadingSection";
import NothingFoundSection from "../NothingFoundSection/NothingFoundSection";

function Homepage(props) {
  return (
    <>
      <HeaderSection
        isLoggedIn={props.isLoggedIn}
        textColor={"light"}
        signinClick={props.signinClick}
        signoutClick={props.signoutClick}
        mobileMenuClick={props.mobileMenuClick}
      />
      <SearchResultsSection cards={props.cards} isHomePage={true} />
      <ResultsLoadingSection></ResultsLoadingSection>
      <NothingFoundSection></NothingFoundSection>
      <AboutSection />
    </>
  );
}

export default Homepage;
