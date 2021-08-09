import React, { useState } from "react";

import "./SigninPopup.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function SigninPopup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* below states are only to test CSS for now */
  const [inputsAreValid, setInputsAreValid] = React.useState(true);
  const [errorEmail, setErrorEmail] = React.useState(true);
  const [errorPassword, setErrorPassword] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <PopupWithForm
      popupName={"signin"}
      title={"Sign in"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <div className='form__inputs-zone'>
        <div className='form__input-zone'>
          <label className='form__label' htmlFor='profileEmail'>
            Email
          </label>
          <input
            id='profileEmail'
            className='form__input'
            name='emailInput'
            placeholder='Enter email'
            type='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errorEmail ? (
            <span id='profileEmail-error' className='popup__input-error'>
              Invalid email adress
            </span>
          ) : null}
        </div>
        <div className='form__input-zone'>
          <label className='form__label' htmlFor='profilePassword'>
            Password
          </label>
          <input
            id='profilePassword'
            className='form__input'
            name='passwordInput'
            placeholder='Enter password'
            type='text'
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={2}
            maxLength={40}
          />
          {errorPassword ? (
            <span id='profilePassword-error' className='popup__input-error'>
              Invalid Password
            </span>
          ) : null}
        </div>
      </div>
      <button
        type='submit'
        className={`popup__button ${
          !inputsAreValid && "popup__button_deactivated"
        }`}
        aria-label='submit button'>
        Sign in
      </button>
      <div className='popup__alternative-link-zone'>
        <p className='popup__alternative-text'>or</p>
        <button
          type='button'
          className='popup__alternative-link'
          onClick={props.signupClick}>
          Sign up
        </button>
      </div>
    </PopupWithForm>
  );
}

export default SigninPopup;
