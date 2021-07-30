import React from "react";
import { Link } from "react-router-dom";

import './SearchResults.css';
import Card from '../Card/Card';

function SearchResults(props) {

  return (
    <section className="searchResults">
        <h2 className="searchResults__title">Search results</h2>
        <ul className='cards'>
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
    </section>
  );
}

export default SearchResults;