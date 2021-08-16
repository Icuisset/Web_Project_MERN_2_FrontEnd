import React from "react";

import './Cards.css';
import Card from '../Card/Card';

function Cards(props) {

  return (
        <ul className='cards'>
            {props.isHomePage ? <h2 className="cards__title">Search results</h2> : null }
            {props.cards.map((card, index) => (
              <Card
                keyword={props.isHomePage? props.keyword: card.keyword}
                key={index}
                card={card}
                onArticleSave={props.onArticleSave}
                onArticleDelete={props.onArticleDelete}
                savedArticles={props.savedArticles}
                isHomePage={props.isHomePage}
                isLoggedIn={props.isLoggedIn}
                openLoginPopup={props.openLoginPopup}
              />
            ))}
          </ul>
  );
}

export default Cards;