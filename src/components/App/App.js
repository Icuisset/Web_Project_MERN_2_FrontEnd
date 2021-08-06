import React, { useState, useEffect } from "react";
import UserContext from "../../contexts/CurrentUserContext";
import { Switch, Route, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

import HomePage from "../HomePage/HomePage";
import NewsPage from "../NewsPage/NewsPage";
import Login from "../Login";
import Register from "../Register";
import Footer from "../Footer/Footer";
import SigninPopup from "../SigninPopup/SigninPopup";
import SignupPopup from "../SignupPopup/SignupPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import api from "../../utils/api";
import initialCards from "../../utils/initialCards";
import authorize from "../../utils/authorize";

function App() {
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));

  const history = useHistory();

  /**
   * initial call to api to get user information
   */

  useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then((result) => {
          console.log(result);
          setCurrentUser(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * handle all general click actions
   */

  const handleSigninClick = () => {
    setIsSigninPopupOpen(true);
  };

  /**
   * handle the closing of all popups
   */

  const closeAllPopups = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsInfoTooltipOpen(false);
    console.log("popup closed");
  };

  /**
   * handle updates to the api after collecting inputs from form popups
   */

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo(name, about, token)
      .then((result) => {
        console.log(result);
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * handle user registration
   */

  const handleSignUp = ({ email, password }) => {
    authorize
      .register(email, password)
      .then((result) => {
        console.log(result);
        if (result.err) {
          console.log(result.err);
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        } else {
          setIsSuccessful(true);
          setIsInfoTooltipOpen(true);
          setUserEmail(email);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

  /**
   * handle user authorization with token
   */

  const handleSignIn = ({ email, password }) => {
    authorize
      .authorizeWithToken(email, password)
      .then((result) => {
        console.log(result);
        if (result.statusCode === 401) {
          console.log(result);
          setIsSuccessful(false);
          setIsInfoTooltipOpen(true);
        }
        const JWT = localStorage.getItem("jwt");
        if (JWT) {
          handleCheckTokenIsValid(JWT);
        }
        setUserEmail(email);
        console.log(email);
        setToken(result.token);
        localStorage.setItem("token", result.token);
        console.log(result.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

  /**
   * check token is valid and return user id and email
   */

  const handleCheckTokenIsValid = (JWT) => {
    authorize
      .checkTokenIsValid(JWT)
      .then((result) => {
        console.log(result.email, result);
        const thisUserEmail = result.email;
        setUserEmail(thisUserEmail);
        setIsLoggedIn(true);
        setIsSuccessful(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
      });
  };

  /**
   * handle auto login
   */

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");
    console.log(JWT);
    if (JWT) {
      handleCheckTokenIsValid(JWT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * handle Log out
   */

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  };

  return (
    <UserContext.Provider value={currentUser}>
      <>
        <Switch>
          <Route path='/saved-news'>
            <>
              <NewsPage isLoggedIn={true} cards={initialCards}></NewsPage>
            </>
          </Route>
          <Route path='/'>
            <>
              <HomePage
                isLoggedIn={false}
                cards={initialCards.slice(0, 3)}></HomePage>
            </>
          </Route>
          {/*
          <Route path='/signin'>
            <>
              <Header
                userEmail={""}
                link={"/signup"}
                message={"Sign up"}></Header>
              <Login onLogin={handleSignIn}></Login>
            </>
          </Route>
          <Route path='/signup'>
            <>
              <Header
                userEmail={""}
                link={"/signin"}
                message={"Log in"}></Header>
              <Register onRegistration={handleSignUp}></Register>
            </>
          </Route>
          <ProtectedRoute
            path='/'
            component={Main}
            loggedIn={isLoggedIn}
            userEmail={userEmail}
            onLogOut={handleLogOut}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}></ProtectedRoute>
            */}
        </Switch>
        <Footer></Footer>
      </>

      <SigninPopup isOpen={false} onClose={closeAllPopups} />

      <SignupPopup isOpen={false} onClose={closeAllPopups} />

      <SuccessPopup
        isOpen={true}
        onClose={closeAllPopups}
        popupName='success'
        isSuccessful={isSuccessful}
      />
    </UserContext.Provider>
  );
}

export default App;
