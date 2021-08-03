import React from "react";

import "./SearchResultsSection.css";
import Cards from "../Cards/Cards";

function SearchResultsSection(props) {
  return (
    <section className='searchResults'>
      <Cards cards={props.cards} isHomePage={props.isHomePage} />
      <button
        className='searchResults__showmoreButton'
        type='button'
        aria-label='show more'
        onClick=''>
        Show more
      </button>
    </section>
  );
}

export default SearchResultsSection;
