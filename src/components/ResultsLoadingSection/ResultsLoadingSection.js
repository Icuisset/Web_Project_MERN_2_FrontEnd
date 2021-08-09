import React from "react";

import './ResultsLoadingSection.css';

function ResultsLoadingSection() {
    return(
        <section className="results-loading">
        <i className="circle-preloader"></i>
        <p className='results-loading__message'>Searching for news...</p>
        </section>
    );
}

export default ResultsLoadingSection;