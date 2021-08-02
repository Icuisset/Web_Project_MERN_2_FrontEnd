import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

function Card(props) {
  return (
    <li className='card'>
      <img
        src={props.card.image}
        alt={props.card.title}
        className='card__image'
      />
      {props.isHomePage ? (
        <>
          <button
            className='card__button card__button-bookmark'
            type='button'
            aria-label='card button'
            onClick=''></button>
          <div className='card__message-signin'>Sign in to save articles</div>
        </>
      ) : (
        <>
          <button
            className='card__button card__button-delete'
            type='button'
            aria-label='card button'
            onClick=''></button>
          {props.card.keyword ? (
            <div className='card__keyword'>{props.card.keyword}</div>
          ) : null}
        </>
      )}
      <div className='card__text-zone'>
        <div>
          <p className='card__date'>{props.card.date}</p>
          <h2 className='card__title'>{props.card.title}</h2>
          <p className='card__text'>{props.card.text}</p>
        </div>
        <p className='card__source'>{props.card.source}</p>
      </div>
    </li>
  );
}

export default Card;
