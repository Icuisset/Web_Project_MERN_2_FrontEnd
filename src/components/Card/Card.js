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
      <div className='card__text-zone'>
        <p className='card__date'>{props.card.date}</p>
        <h2 className='card__title'>{props.card.title}</h2>
        <p className='card__text'>{props.card.text}</p>
        <p className='card__source'>{props.card.source}</p>
      </div>
    </li>
  );
}

export default Card;
