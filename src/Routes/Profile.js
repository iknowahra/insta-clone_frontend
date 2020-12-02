import React from 'react';
import { withRouter } from 'react-router-dom';
import FollowButton from '../Components/FollowButton';

export default withRouter(({ location: { pathname } }) => {
  const userName = pathname.split('/profile/')[1];
  return <FollowButton id={8} amIFollowing={false} />;
});
