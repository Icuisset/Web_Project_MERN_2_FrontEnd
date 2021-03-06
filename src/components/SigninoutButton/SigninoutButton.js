import React from "react";
import UserContext from "../../contexts/CurrentUserContext";

import "./SigninoutButton.css";

function SigninoutButton(props) {
  const user = React.useContext(UserContext);

  return (
    <>
      {props.isLoggedIn ? (
        <button
          className={`signout signout_textcolor_${props.textColor} ${props.isMobileMenu && "button_type_mobile"}`}
          type='button'
          onClick={props.signoutClick}>
          {user.name}
          {props.textColor === "dark" ? (
            <svg
              className='signout__logo'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z'
                fill='#1A1B22'
              />
            </svg>
          ) : (
            <svg
              className='signout__logo'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z'
                fill='white'
              />
            </svg>
          )}
        </button>
      ) : (
        <button
          className={`signin signin_textcolor_${props.textColor} ${props.isMobileMenu && "button_type_mobile"}`}
          type='button'
          onClick={props.signinClick}>
          Sign in
        </button>
      )}
    </>
  );
}

export default SigninoutButton;
