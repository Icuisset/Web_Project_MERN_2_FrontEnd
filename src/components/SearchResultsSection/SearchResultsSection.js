import React, { useState, useEffect } from "react";

import "./SearchResultsSection.css";
import Cards from "../Cards/Cards";
import newsApi from "../../utils/NewsApi";

function SearchResultsSection(props) {
  const handleSearchResultsClick = () => {
    console.log("Search Results button has been clicked");
  };

  return (
    <section className='searchResults'>
      <Cards
        cards={props.cards}
        isHomePage={props.isHomePage}
        keyword={props.keyword}
      />
      {props.cards.length === 3 ? (
        <button
          className='searchResults__showmoreButton'
          type='button'
          aria-label='show more'
          onClick={handleSearchResultsClick}>
          Show more
        </button>
      ) : null}
    </section>
  );
}

export default SearchResultsSection;
