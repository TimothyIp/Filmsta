import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditBioBtn from './EditBioBtn';

const backdropPath = 'https://image.tmdb.org/t/p/w1280'
const avatar_url = 'https://api.adorable.io/avatars/250/'

export default class UsersInfo extends Component {
  constructor() {
    super();
  
  }

  render() {
    const { viewedUser, usersCollection, usersReviewBackdrop, numberOfReviews } = this.props;
    return (
      <div className="user__info">
        <div className="user__backdrop--container">
          <div className="user__backdrop--overlay"></div>
            <img className="user__backdrop" src={`${backdropPath}${usersReviewBackdrop}`} alt=""/>
        </div>
        <div className="user__info--section">
          <img className="profile__avatar" src={`${avatar_url}${viewedUser.username}.png`} alt=""/>
          <div className="profile__info--container">
            <div className="profile__names">
              <h1>{viewedUser.username}</h1>
              <p>{viewedUser.profile_bio}</p>
              <EditBioBtn 
                {...this.props}
              />
            </div>
            <div className="profile__stats">
              <p>Number of Movies Watched: {usersCollection.length}</p>
              <p>Number of Movies Reviewed: {numberOfReviews}</p>
            </div>
          </div>
          </div>
      </div>
    )
  }
}
