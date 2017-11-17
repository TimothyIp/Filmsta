import React, { Component } from 'react';

const backdropPath = 'https://image.tmdb.org/t/p/w1280'
const avatar_url = 'https://avatars.io/facebook/'

export default class UsersInfo extends Component {
  constructor() {
    super();
  }

  render() {
    const { viewedUser, usersCollection, usersReviewBackdrop, numberOfReviews } = this.props;
    return (
      <div>
        <img src={`${backdropPath}${usersReviewBackdrop}`} alt=""/>
        <img src={`${avatar_url}${viewedUser.username}/128`} alt=""/>
        <h1>{viewedUser.username}</h1>
        <p>Number of Movies Watched: {usersCollection.length}</p>
        <p>Number of Movies Reviewed: {numberOfReviews}</p>
      </div>
    )
  }
}