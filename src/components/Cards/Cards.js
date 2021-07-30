import React from "react";

import './Cards.css';
import Card from '../Card/Card';

function Cards(props) {

  return (
        <ul className='cards'>
            {props.isHomePage ? <h2 className="cards__title">Search results</h2> : null }
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardSave={props.onCardSave}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
  );
}

export default Cards;