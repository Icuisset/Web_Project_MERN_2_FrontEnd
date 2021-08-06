import React from "react";

import './AboutSection.css';

function AboutSection() {
    return(
        <section className="about">
        <div className="about__picture"></div>
        <div className="about__text">
            <h2 className="about__title">About Isabelle</h2>
            <p className="about__paragraph">I just launched my own web design and development business, called isaWabi.
                I have worked for 20 years in the fashion world for major luxury brands , collaborating with talented designers and highly inspiring people . 
                <br /><br />
                Today, I want to continue to balance aesthetic and functionality in everything I do and put my skills and experience at the service of small businesses and solopreneurs.
                I joined Practicum in order to learn everything about Front End Web development, including how to build dynamic web applications.</p>
        </div>
        </section>
    );
}

export default AboutSection;