import React from "react";

import HeaderSection from "../HeaderSection/HeaderSection";
import AboutSection from "../AboutSection/AboutSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";

function Homepage(props) {
  return (
    <>
      <HeaderSection isLoggedIn={props.isLoggedIn} textColor={"light"} />
      <SearchResultsSection cards={props.cards} isHomePage={true} />
      <AboutSection />
    </>
  );
}

export default Homepage;
