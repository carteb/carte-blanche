import React from 'react';

function UserPreview({firstName, lastName, imgurl}) {
	return (
		<div className="user-preview">
			{imgurl ? <img src={imgurl} height="50" width="50" /> : null}
			<h5>{firstName} {lastName}</h5>
		</div>
	)
}

export default UserPreview
