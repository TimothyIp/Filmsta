import React from 'react';
import EditBioBtn from './EditBioBtn';

const backdropPath = 'https://image.tmdb.org/t/p/w1280'
const avatar_url = 'https://api.adorable.io/avatars/250/'

const UsersInfo = (props) => {
    const { viewedUser, usersCollection, usersReviewBackdrop, numberOfReviews } = props;
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
                {...props}
              />
            </div>
            <div className="profile__stats">
              <p>Movies Watched: {usersCollection.length}</p>
              <p>Movies Reviewed: {numberOfReviews}</p>
            </div>
          </div>
          </div>
      </div>
    )
}

export default UsersInfo;
