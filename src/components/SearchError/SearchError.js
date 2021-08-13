import React from "react";

import "./SearchError.css";

function SearchErrorSection() {
  return (
    <section className='search-error'>
      <div className='search-error__icon'></div>
      <p className='search-error__message'>
      Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.
      </p>
    </section>
  );
}

export default SearchErrorSection;
