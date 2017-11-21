import React from 'react';
import { Link } from 'react-router-dom';

const IntroPage = () => {
  return (
    <div className="introduction">
      <div className="hero__banner">
        <div className="hero__header">
          <p>
            Welcome to Filmsta<span>.</span>
          </p>
          <p className="hero__text">
            Connecting you with other film <span><em>lovers</em></span>
          </p>
          <Link to="/register">
            <button className="hero__btn">Get Started</button>
          </Link>
        </div>
        <img src={require('../assets/intro.jpeg')} alt=""/>
      </div>
    </div>
  )
}

export default IntroPage;