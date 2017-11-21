import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const API_URL = 'http://localhost:3000/api';

export default class ReviewButton extends Component {
  constructor() {
    super();
    this.state = {
      reviewReveal: false,
      reviewInput: "",
      reviewRating: 0,
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      reviewReveal: !prevState.reviewReveal
    }))
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleReviewRating = (event) => {
    const rating = event.target.innerHTML;

    this.setState({
      reviewRating: Number(rating)
    });
  }

  addReview = (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    const token = cookies.get('token');
    const reviewData = {
      content: this.state.reviewInput,
      movieName: this.props.movie.movieTitle,
      rating: this.state.reviewRating
    };
    
    this.setState({
      reviewRating: this.state.reviewRating
    });

    axios.post(`${API_URL}/user/addreview`, { reviewData }, {
      headers: { Authorization: token }
    })
    .then(res => {
      console.log(res);
      this.props.collectionSync();
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {

    return (
      <div>
        {
          (this.state.reviewReveal)
            ? <form onSubmit={this.addReview}>
                <div>{this.props.movie.movieTitle}</div>
                <textarea onChange={this.handleChange} name="reviewInput" placeholder="Write your review" value={this.state.reviewInput}/>
                <div>
                  <span onClick={this.handleReviewRating}>1</span>
                  <span onClick={this.handleReviewRating}>2</span>
                  <span onClick={this.handleReviewRating}>3</span>
                  <span onClick={this.handleReviewRating}>4</span>
                  <span onClick={this.handleReviewRating}>5</span>
                </div>
                <button>Submit</button>
              </form>
            : null
        }
        <button onClick={this.handleClick}>Write your thoughts!</button>
      </div>
    )
  }
}

ReviewButton.propTypes = {
  reviewReveal: PropTypes.bool,
  reviewInput: PropTypes.string,
  reviewRating: PropTypes.number,
}