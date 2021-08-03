import React from "react";

import SearchResultsSection from "../SearchResultsSection/SearchResultsSection";

function Newspage(props) {

  return (
    <>
    <SearchResultsSection
     cards ={props.cards}
     isHomePage={false} />
    </>
  );
}

export default Newspage;
