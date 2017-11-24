import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StarRatings extends Component {

  showStars = (rating) => {
    const renderStars = [];

    for(let i = 0; i < rating; i++) {
      renderStars.push("*")
    }

    return renderStars;
  }

  render() {
    return (
      <div>
        <ul>
          {this.showStars(this.props.rating).map((star, index) => {
            return (
              <li key={`starId-${index}`}>{star}</li>
            ) 
          })}
        </ul>
      </div>
    )
  }
}

StarRatings.propTypes = {
  stars: PropTypes.array
}