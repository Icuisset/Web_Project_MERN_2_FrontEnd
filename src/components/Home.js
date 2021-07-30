import React from "react";
import { Link } from "react-router-dom";

import About from "./About/About";
import SearchResults from "./SearchResults/SearchResults";


function Home(props) {

  return (
    <>
    <SearchResults
     cards ={props.cards} />
    <About />
    </>
  );
}

export default Home;
