import React from "react";

import "./PopupWithForm.css";

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className='popup__overlay' onClick={props.onClose} />
      <div
        className={`popup__container popup__container_type_${props.popupName}`}>
        <form
          className={`popup__form popup__form_type_${props.popupName}`}
          method='POST'
          name={props.popupName}
          onSubmit={props.onSubmit}>
          <h3 className='popup__title'>{props.title}</h3>
          {props.children}
          <button
            type='submit'
            className='popup__button'
            aria-label='submit button'>
            {props.buttonText}
          </button>
        </form>
        <button
          type='button'
          className='close-button'
          aria-label='close button'
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
