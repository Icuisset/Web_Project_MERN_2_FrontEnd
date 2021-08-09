import React from "react";

import "./NothingFoundSection.css";

function NothingFoundSection() {
  return (
    <section className='nothing-found'>
      <div className='nothing-found__icon'></div>
      <h3 className='nothing-found__title'>Nothing found</h3>
      <p className='nothing-found__message'>
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}

export default NothingFoundSection;
