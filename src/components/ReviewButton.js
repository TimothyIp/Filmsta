import React, { Component } from 'react';

export default class ReviewButton extends Component {
  constructor() {
    super();
    this.state = {
      reviewReveal: false
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      reviewReveal: !prevState.reviewReveal
    }))
  }


  render() {
    return (
      <div>
        {
          (this.state.reviewReveal)
            ? <form>
                <textarea rows="10"></textarea>
                <button>Submit</button>
              </form>
            : null
        }
        <button onClick={this.handleClick}>Write your thoughts!</button>
      </div>
    )
  }
}