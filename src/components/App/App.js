import React, { useState, useEffect } from "react";
import UserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import HomePage from "../HomePage/HomePage";
import NewsPage from "../NewsPage/NewsPage";
import Footer from "../Footer/Footer";
import SigninPopup from "../SigninPopup/SigninPopup";
import SignupPopup from "../SignupPopup/SignupPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import MobileMenu from "../MobileMenu/MobileMenu";
import authorize from "../../utils/authorize";
import api from "../../utils/MainApi";
import newsApi from "../../utils/NewsApi";

function App() {
  const location = useLocation();
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState("light");

  const [currentUser, setCurrentUser] = useState({});

  const [savedArticles, setSavedArticles] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [cards, setCards] = useState([]);
  const [numberCardsShown, setNumberCardsShown] = useState("3");
  const [isLoading, setIsLoading] = useState(false);
  const [noArticleFound, setNoArticleFound] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [isNoKeyword, setIsNoKeyword] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotAvailableEmail, SetIsNotAvailableEmail] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));

  // eslint-disable-next-line no-unused-vars
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
        } else {
          setIsSignupPopupOpen(false);
          setIsSuccessPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Error: 409") {
          SetIsNotAvailableEmail(true);
        }
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
        setCurrentUser(result);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
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
    SetIsNotAvailableEmail(false);
    setSavedArticles([]);
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
          console.log(result);
          const cardFormatResult = result.map((article) => {
            return {
              publishedAt: article.date,
              urlToImage: article.image,
              keyword: article.keyword,
              url: article.link,
              owner: article.owner,
              source: { name: article.source },
              content: article.text,
              title: article.title,
              _id: article._id,
            };
          });
          setSavedArticles(cardFormatResult);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  /**
   * handle updates to the main api
   */

  const handleAddArticle = (
    keyword,
    title,
    text,
    date,
    source,
    link,
    image
  ) => {
    console.log(keyword, title, text, date, source, link, image);
    const isAlreadySaved = savedArticles.findIndex(
      (article) => article.url === link
    );
    console.log(isAlreadySaved);
    if (isAlreadySaved <= -1) {
      api
        .postNewArticle(keyword, title, text, date, source, link, image, token)
        .then((newArticle) => {
          console.log(newArticle);
          console.log(newArticle._id, newArticle.link);
          const newFormatArticle = {
            publishedAt: newArticle.date,
            urlToImage: newArticle.image,
            keyword: newArticle.keyword,
            url: newArticle.link,
            owner: newArticle.owner,
            source: { name: newArticle.source },
            content: newArticle.text,
            title: newArticle.title,
            _id: newArticle._id,
          };
          setSavedArticles([newFormatArticle, ...savedArticles]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("article is already saved");
    }
  };

  const handleDeleteArticle = (id) => {
    api
      .deleteArticle(id, token)
      .then((result) => {
        console.log(result);
        const newSavedArticles = savedArticles.filter((a) => a._id !== id);
        setSavedArticles(newSavedArticles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * handle search in news api
   */

  const handleArticleSearch = (keyword) => {
    if (keyword === "") {
      setIsNoKeyword(true);
    }
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
    SetIsNotAvailableEmail(false);
    console.log("popup closed");
  };

  /**
   * handle opening of signin popup on protected route when not logged in
   */
  useEffect(() => {
    if (!isLoggedIn && location.signin) {
      setIsSigninPopupOpen(true);
    }
    location.signin = false;
  }, [location, isLoggedIn]);

  return (
    <UserContext.Provider value={currentUser}>
      <>
        <Switch>
          <ProtectedRoute
            path='/saved-news'
            component={NewsPage}
            isLoggedIn={isLoggedIn}
            cards={savedArticles}
            totalCards={cards}
            keyword={searchKeyword}
            savedArticles={savedArticles}
            onArticleDelete={handleDeleteArticle}
            signinClick={() => handleHeaderSigninClick()}
            signoutClick={() => handleHeaderSignoutClick()}
            mobileMenuClick={() => handleNewsMobileMenuClick()}
          />

          <Route path='/'>
            <>
              <HomePage
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                noArticleFound={noArticleFound}
                isNoKeyword={isNoKeyword}
                isSearchError={isSearchError}
                cards={cards.slice(0, numberCardsShown)}
                totalCards={cards}
                keyword={searchKeyword}
                savedArticles={savedArticles}
                onArticleSave={handleAddArticle}
                onArticleDelete={handleDeleteArticle}
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
        isNotAvailableEmail={isNotAvailableEmail}
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
