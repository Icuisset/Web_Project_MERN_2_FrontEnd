import React, { useState, useEffect } from "react";
import UserContext from "../../contexts/CurrentUserContext";
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

function App() {
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState("light");

  /* Adding fake constants to remove errors in the console for now ! :-) */
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

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
          <Route path='/saved-news'>
            <>
              <NewsPage
                isLoggedIn={isLoggedIn}
                cards={initialCards}
                signinClick={() => handleHeaderSigninClick()}
                signoutClick={() => handleHeaderSignoutClick()}
                mobileMenuClick={() => handleNewsMobileMenuClick()}></NewsPage>
            </>
          </Route>
          <Route path='/'>
            <>
              <HomePage
                isLoggedIn={isNotLoggedIn}
                cards={initialCards.slice(0, 3)}
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
      />

      <SignupPopup
        isOpen={isSignupPopupOpen}
        onClose={closeAllPopups}
        signinClick={() => handlePopupSigninClick()}
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
