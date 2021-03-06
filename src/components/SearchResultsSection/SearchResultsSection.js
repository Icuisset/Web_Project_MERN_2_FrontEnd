import React from "react";

import "./SearchResultsSection.css";
import Cards from "../Cards/Cards";

function SearchResultsSection(props) {
  const allCardsShown = props.cards.length >= props.totalCards.length;

  return (
    <section className='searchResults'>
      <Cards
        cards={props.cards}
        isHomePage={props.isHomePage}
        keyword={props.keyword}
        isLoggedIn={props.isLoggedIn}
        onArticleSave={props.onArticleSave}
        onArticleDelete={props.onArticleDelete}
        savedArticles={props.savedArticles}
        openLoginPopup={props.openLoginPopup}
      />
      {props.cards.length !== 0 && !allCardsShown && props.isHomePage ? (
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
