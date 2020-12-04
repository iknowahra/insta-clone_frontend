import React from 'react';
import PropTypes from 'prop-types';
import Presenter from './Presenter';

const Container = ({
  id,
  caption,
  location,
  user,
  files,
  likeCount,
  amILiking,
  comments,
  createdAt,
  commentCount,
}) => {
  return (
    <Presenter
      id={id}
      user={user}
      caption={caption}
      location={location}
      files={files}
      comments={comments}
      amILiking={amILiking}
      likeCount={likeCount}
      createdAt={createdAt}
      commentCount={commentCount}
    />
  );
};

Container.propTypes = {
  id: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  amILiking: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
    }),
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default Container;
