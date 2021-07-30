import React from "react";

import './Cards.css';
import Card from '../Card/Card';

function Cards(props) {

  return (
        <ul className='cards'>
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