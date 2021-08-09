import React from "react";
import { Link } from "react-router-dom";

import './SearchBox.css';

function SearchBox(props) {

  return (
    <form className="search">
      <fieldset className="search__box">
        <input className="search__input" type="text" placeholder="Enter topic"/>
        <button className="search__button" type="submit">Search</button>
      </fieldset>

    </form>
  );
}

export default SearchBox;