import React, { Component } from 'react';

const API_URL = 'http://localhost:3000/api';

export default class ReviewButton extends Component {
  constructor() {
    super();
    this.state = {
      reviewReveal: false,
      reviewInput: ""
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

  // addReview = () => {
  //   const review = this.state.reviewInput;
  //   axios.post(`${API_URL}/addreview`, { review }, {
  //     headers: { Authorization: }
  //   })
  // }

  render() {
    return (
      <div>
        {
          (this.state.reviewReveal)
            ? <form onSubmit={this.addReview}>
                <textarea onChange={this.handleChange} name="reviewInput" value="Write your review" />
                <button>Submit</button>
              </form>
            : null
        }
        <button onClick={this.handleClick}>Write your thoughts!</button>
      </div>
    )
  }
}