import React, { useState, useEffect } from "react";

import "./SearchResultsSection.css";
import Cards from "../Cards/Cards";
import newsApi from "../../utils/NewsApi";

function SearchResultsSection(props) {
  return (
    <section className='searchResults'>
      <Cards
        cards={props.cards}
        isHomePage={props.isHomePage}
        keyword={props.keyword}
        isLoggedIn={props.isLoggedIn}
        onArticleSave={props.onArticleSave}
      />
      {props.cards.length !== 0 ? (
        <button
          className='searchResults__showmoreButton'
          type='button'
          aria-label='show more'
          onClick={props.showMore}>
          Show more
        </button>
      ) : null}
    </section>
  );
}

export default SearchResultsSection;
