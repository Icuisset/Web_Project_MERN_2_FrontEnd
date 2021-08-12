import React from "react";

import "./Card.css";

function Card(props) {

  const date = new Date(props.card.publishedAt);
  const formattedDate = `${date.toLocaleString('en-us', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

  const handleBookmarkClick = () => {
    console.log("Bookmark has been clicked");
  };

  const handleDeleteClick = () => {
    console.log("Remove from saved has been clicked");
  };

  return (
    <li className='card'>
      <img
        src={props.card.urlToImage}
        alt={props.card.title}
        className='card__image'
      />
      {props.isHomePage ? (
        <>
          <button
            className='card__button card__button-bookmark'
            type='button'
            aria-label='card button'
            onClick={handleBookmarkClick}></button>
          <div className='card__message-signin'>Sign in to save articles</div>
        </>
      ) : (
        <>
          <button
            className='card__button card__button-delete'
            type='button'
            aria-label='card button'
            onClick={handleDeleteClick}></button>
          <div className='card__message-delete'>Remove from saved</div>
          {props.keyword ? (
            <div className='card__keyword'>
              <p className='card__keyword-text'>{props.keyword}</p>
            </div>
          ) : null}
        </>
      )}
      <div className='card__text-zone'>
        <div>
          <p className='card__date'>{formattedDate}</p>
          <h2 className='card__title'>{props.card.title}</h2>
          <p className='card__text'>{props.card.content}</p>
        </div>
        <p className='card__source'>{props.card.source.name}</p>
      </div>
    </li>
  );
}

export default Card;
