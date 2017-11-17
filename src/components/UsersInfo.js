import React, { Component } from 'react';

export default class UsersInfo extends Component {
  constructor() {
    super();
  }

  render() {
    const { viewedUser, usersCollection } = this.props;
    return (
      <div>
        <h1>{viewedUser.username}</h1>
        <p>Number of Movies Watched: {usersCollection.length}</p>
      </div>
    )
  }
}