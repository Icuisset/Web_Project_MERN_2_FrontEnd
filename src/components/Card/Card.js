import React, { useEffect, useState } from "react";
import UserContext from "../../contexts/CurrentUserContext";

import "./Card.css";

function Card(props) {
  const date = new Date(props.card.publishedAt);
  const formattedDate = `${date.toLocaleString("en-us", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  const user = React.useContext(UserContext);

  const truncatedTitle = props.card.title.slice(0, 29);
  const truncatedContent = props.card.title.slice(0, 499);

  const indexAlreadySaved = props.savedArticles.findIndex(
    (article) => article.link === props.card.url
  );

  const [isSavedinAPI, setisSavedinAPI] = useState(indexAlreadySaved <= -1);

  useEffect(() => {
    if (indexAlreadySaved <= -1) {
      setisSavedinAPI(false);
    } else {
      setisSavedinAPI(true);
    }
    console.log(indexAlreadySaved);
  }, [user]);

  const handleAddClick = () => {
    if (props.isLoggedIn) {
      if (!isSavedinAPI) {
        props.onArticleSave(
          props.keyword,
          truncatedTitle,
          truncatedContent,
          formattedDate,
          props.card.source.name,
          props.card.url,
          props.card.urlToImage
        );
        setisSavedinAPI(true);
      }
    }
  };

  const handleDeleteClick = () => {
    const articleToDelete = props.savedArticles.find(
      (article) => article.link === props.card.url
    );
    console.log(articleToDelete);
    props.onArticleDelete(articleToDelete._id);
    setisSavedinAPI(false);
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
            className={`card__button ${
              props.isLoggedIn
                ? "card__button-bookmark_signedin_yes"
                : "card__button-bookmark_signedin_no"
            } ${isSavedinAPI ? "card__button-bookmark_saved" : null}
            `}
            type='button'
            aria-label='card button'
            onClick={
              isSavedinAPI ? handleDeleteClick : handleAddClick
            }></button>
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
