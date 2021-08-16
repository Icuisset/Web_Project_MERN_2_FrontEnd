import React, { useState } from "react";

import "./SearchBox.css";

function SearchBox(props) {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    console.log(keyword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(keyword);
  };

  return (
    <form className='search'>
      <fieldset className='search__box'>
        <input
          className='search__input'
          type='text'
          placeholder='Enter topic'
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button className='search__button' type='submit' onClick={handleSubmit}>
          Search
        </button>
      </fieldset>
    </form>
  );
}

export default SearchBox;
