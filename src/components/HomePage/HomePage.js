import React from "react";
import { Link } from "react-router-dom";

import AboutSection from "../AboutSection/AboutSection";
import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";


function Homepage(props) {

  return (
    <>
    <SearchResultsSection
     cards ={props.cards} />
    <AboutSection />
    </>
  );
}

export default Homepage;
