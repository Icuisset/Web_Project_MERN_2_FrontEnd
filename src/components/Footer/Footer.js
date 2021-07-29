/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Link } from "react-router-dom";
import GithubIcon from "../../images/github-icon.svg";
import FacebookIcon from "../../images/fb-icon.svg";
import './Footer.css';

function Footer() {
    return(
        <footer className="footer">
        <p className="footer__copyright">© 2021 Supersite, Powered by News API</p>
        <div className="footer__link-zone">
        <Link className='footer__link' to={'/'}>Home</Link>
        <a className='footer__link' href='https://practicum.yandex.com/' target="_blank">Practicum by Yandex</a>
        <a className='footer__icon' href="https://github.com/Icuisset/" target="_blank"><img src={GithubIcon} alt="GitHub icon" /></a>
        <a className='footer__icon' href="https://www.facebook.com/isawabi.london/" target="_blank"><img src={FacebookIcon} alt="Facebook icon" /></a>
        </div>
        </footer>
    );
}

export default Footer;