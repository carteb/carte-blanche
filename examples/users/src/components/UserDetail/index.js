import React from 'react';

function UserDetail({ firstName, lastName, avatarUrl, activity = 60 }) {
  return (
    <div className="user-preview">
      {avatarUrl ? <img src={avatarUrl} height="50" width="50" role="presentation" /> : null}
      <h5>{firstName} {lastName}</h5>
      <div>Activity: {activity}</div>
    </div>
  );
}

export default UserDetail;
