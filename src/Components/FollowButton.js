import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import Button from './Button';

const FOLLOW_USER = gql`
  mutation followUser($id: Int!) {
    followUser(id: $id)
  }
`;
const UNFOLLOW_USER = gql`
  mutation unfollowUser($id: Int!) {
    unfollowUser(id: $id)
  }
`;

const FollowButton = ({ amIFollowing, id, size }) => {
  const [follow, setFollow] = useState(amIFollowing);
  const [followUser] = useMutation(FOLLOW_USER, {
    variables: { id },
  });
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: { id },
  });

  const onClick = () => {
    if (follow) {
      setFollow(!follow);
      unfollowUser();
    } else {
      setFollow(!follow);
      followUser();
    }
  };

  return (
    <Button
      text={follow ? 'Unfollow' : 'Follow'}
      onClick={onClick}
      size={size}
    />
  );
};

FollowButton.prototype = {
  id: PropTypes.number.isRequired,
  amIFollowing: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

export default FollowButton;
