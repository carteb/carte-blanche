import React from 'react';

function UserPreview({ firstName, lastName, avatarUrl }) {
  return (
    <div className="user-preview">
      {avatarUrl ? <img src={avatarUrl} height="50" width="50" role="presentation" /> : null}
      <h5>{firstName} {lastName}</h5>
    </div>
  );
}

export default UserPreview;
