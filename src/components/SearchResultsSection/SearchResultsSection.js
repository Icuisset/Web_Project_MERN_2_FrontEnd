import React from "react";

import './SearchResultsSection.css';
import Cards from '../Cards/Cards';

function SearchResultsSection(props) {

  return (
    <section className="searchResults">
        <h2 className="searchResults__title">Search results</h2>
        <Cards cards={props.cards} />
    </section>
  );
}

export default SearchResultsSection;