import React, { useState, useEffect } from "react";
import UserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Switch, Route, useHistory } from "react-router-dom";

import HomePage from "../HomePage/HomePage";
import NewsPage from "../NewsPage/NewsPage";
import Footer from "../Footer/Footer";
import SigninPopup from "../SigninPopup/SigninPopup";
import SignupPopup from "../SignupPopup/SignupPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import MobileMenu from "../MobileMenu/MobileMenu";
import initialCards from "../../utils/initialCards";
import authorize from "../../utils/authorize";
import api from "../../utils/MainApi";
import newsApi from "../../utils/NewsApi";
import ResultsLoadingSection from "../ResultsLoadingSection/ResultsLoadingSection";

function App() {
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState("light");

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [articles, setArticles] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [cards, setCards] = useState([]);
  const [numberCardsShown, setNumberCardsShown] = useState("3");
  const [isLoading, setIsLoading] = useState(false);
  const [noArticleFound, setNoArticleFound] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popupErrorMessage, setPopupErrorMessage] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  const history = useHistory();

  /**
   * handle user registration
   */

  const handleSignUp = ({ name, email, password }) => {
    authorize
      .register(name, email, password)
      .then((result) => {
        console.log(result);
        if (result.err) {
          console.log(result.err);
          setPopupErrorMessage(result.err);
        } else {
          setIsSuccessPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setPopupErrorMessage(err);
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
          setPopupErrorMessage(result.err);
        }
        const JWT = localStorage.getItem("jwt");
        if (JWT) {
          handleCheckTokenIsValid(JWT);
        }
        setToken(result.token);
        localStorage.setItem("token", result.token);
        console.log(result.token);
        setIsSigninPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setPopupErrorMessage(err);
      });
  };

  /**
   * check token is valid and return user id and email
   */

  const handleCheckTokenIsValid = (JWT) => {
    authorize
      .checkTokenIsValid(JWT)
      .then((result) => {
        console.log(result.name, result);
        const thisUserName = result.name;
        setUserName(thisUserName);
        setCurrentUser(result);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setPopupErrorMessage(err);
      });
  };

  /**
   * handle auto login
   */

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");
    const KEYWORD = localStorage.getItem("kwd");

    console.log(JWT);
    if (JWT) {
      handleCheckTokenIsValid(JWT);
    }
    if (KEYWORD) {
      handleArticleSearch(KEYWORD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * handle Log out
   */

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setUserName("");
    setPopupErrorMessage("");
  };

  /**
   * initial call to main api to get user information
   */

  useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then((result) => {
          console.log(result);
          setCurrentUser(result);
          setUserName(result.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * initial call to api to get all saved articles by the user from main api
   */

  useEffect(() => {
    if (token) {
      api
        .getSavedArticles(token)
        .then((result) => {
          setArticles(result);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  /**
   * handle updates to the main api
   */

  const handleAddArticle = ({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  }) => {
    console.log(keyword, title, text, date, source, link, image);
    api
      .postNewArticle(keyword, title, text, date, source, link, image, token)
      .then((newArticle) => {
        console.log(newArticle);
        setArticles([newArticle, ...articles]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteArticle = (article) => {
    api
      .deleteCard(article._id, token)
      .then((result) => {
        console.log(result);
        const newArticles = articles.filter((a) => a._id !== article._id);
        console.log(newArticles);
        setArticles(newArticles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * handle search in news api
   */

  const handleArticleSearch = (keyword) => {
    setIsLoading(true);
    setNoArticleFound(false);
    newsApi
      .getNewsResults(keyword)
      .then((result) => {
        if (result.articles.length === 0) {
          setNoArticleFound(true);
        }
        setNumberCardsShown("3");
        console.log(result.articles);
        setCards(result.articles);
        setSearchKeyword(keyword);
        localStorage.setItem("kwd", keyword);
        setIsLoading(false);
        setIsSearchError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSearchError(true);
        setIsLoading(false);
      });
  };

  /**
   * handle all general click actions
   */

  const handleSuccessSigninClick = () => {
    setIsSuccessPopupOpen(false);
    setIsSigninPopupOpen(true);
  };

  const handleHeaderSigninClick = () => {
    setIsMobileMenuOpen(false);
    setIsSigninPopupOpen(true);
  };

  const handleHeaderSignoutClick = () => {
    setIsMobileMenuOpen(false);
    handleLogOut();
    console.log("you are signed out");
  };

  const handlePopupSignupClick = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(true);
  };

  const handlePopupSigninClick = () => {
    setIsSignupPopupOpen(false);
    setIsSigninPopupOpen(true);
  };

  const handleHomeMobileMenuClick = () => {
    setTextColor("light");
    setIsMobileMenuOpen(true);
  };

  const handleNewsMobileMenuClick = () => {
    setTextColor("dark");
    setIsMobileMenuOpen(true);
  };

  /**
   * handle number of articles shown
   */

  const handleShowMoreButtonClick = () => {
    const newCardNumber = Number(numberCardsShown) + 3;
    console.log(newCardNumber);
    setNumberCardsShown(newCardNumber);
  };

  /**
   * handle the closing of all popups
   */

  const closeAllPopups = () => {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsMobileMenuOpen(false);
    console.log("popup closed");
  };

  return (
    <UserContext.Provider value={currentUser}>
      <>
        <Switch>
          <ProtectedRoute
            path='/saved-news'
            component={NewsPage}
            isLoggedIn={isLoggedIn}
            userName={userName}
            cards={initialCards}
            signinClick={() => handleHeaderSigninClick()}
            signoutClick={() => handleHeaderSignoutClick()}
            mobileMenuClick={() => handleNewsMobileMenuClick()}
          />

          <Route path='/'>
            <>
              <HomePage
                isLoggedIn={isLoggedIn}
                userName={userName}
                isLoading={isLoading}
                noArticleFound={noArticleFound}
                isSearchError={isSearchError}
                cards={cards.slice(0, numberCardsShown)}
                keyword={searchKeyword}
                onSearch={handleArticleSearch}
                showMore={handleShowMoreButtonClick}
                signinClick={() => handleHeaderSigninClick()}
                signoutClick={() => handleHeaderSignoutClick()}
                mobileMenuClick={() => handleHomeMobileMenuClick()}></HomePage>
            </>
          </Route>
        </Switch>
        <Footer></Footer>
      </>

      <SigninPopup
        isOpen={isSigninPopupOpen}
        onClose={closeAllPopups}
        signupClick={() => handlePopupSignupClick()}
        onSignin={handleSignIn}
      />

      <SignupPopup
        isOpen={isSignupPopupOpen}
        onClose={closeAllPopups}
        signinClick={() => handlePopupSigninClick()}
        onSignup={handleSignUp}
      />

      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        popupName='success'
        signinClick={() => handleSuccessSigninClick()}
      />
      <MobileMenu
        isLoggedIn={isLoggedIn}
        isOpen={isMobileMenuOpen}
        onClose={closeAllPopups}
        popupName='mobile'
        hasTextColor={textColor}
        signinClick={() => handleHeaderSigninClick()}
        signoutClick={() => handleHeaderSignoutClick()}
      />
    </UserContext.Provider>
  );
}

export default App;
