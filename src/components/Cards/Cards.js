import React from "react";

import './Cards.css';
import Card from '../Card/Card';

function Cards(props) {

  return (
        <ul className='cards'>
            {props.isHomePage ? <h2 className="cards__title">Search results</h2> : null }
            {props.cards.map((card, index) => (
              <Card
                keyword={props.keyword}
                key={index}
                card={card}
                onArticleSave={props.onArticleSave}
                onCardDelete={props.onCardDelete}
                isHomePage={props.isHomePage}
                isLoggedIn={props.isLoggedIn}
              />
            ))}
          </ul>
  );
}

export default Cards;