import React from "react";

import AboutSection from "../AboutSection/AboutSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";


function Homepage(props) {

  return (
    <>
    <SearchResultsSection
     cards ={props.cards}
     hasSectionTitle={true} />
    <AboutSection />
    </>
  );
}

export default Homepage;
