import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import useInput from '../../Hooks/EnterInput';
import Presenter from './Presenter';

import { TOGGLE_LIKE, ADD_COMMENT } from './Queries';

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
}) => {
  const comment = useInput('');
  const [amILikingS, setAmILiking] = useState(amILiking);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [commentS, setCommentS] = useState([...comments]);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  const onToggleLike = () => {
    if (amILikingS) {
      setAmILiking(!amILikingS);
      setLikeCount(likeCountS - 1);
    } else {
      setAmILiking(!amILikingS);
      setLikeCount(likeCountS + 1);
    }
    toggleLikeMutation();
  };

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.value !== '') {
      try {
        const {
          data: { addComment },
        } = await addCommentMutation();
        setCommentS([addComment, ...commentS]);
      } catch {
        toast.error('Cant send comment');
      }
    }
  };

  const onPressEnter = (e) => {
    e.preventDefault();
    const { keyCode } = e;
    if (keyCode === 13) {
      comment.setValue('');
      onSubmitComment(e);
    }
  };

  return (
    <Presenter
      id={id}
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      amILiking={amILikingS}
      comments={commentS}
      createdAt={createdAt}
      newComment={comment}
      setAmILiking={setAmILiking}
      setLikeCount={setLikeCount}
      onToggleLike={onToggleLike}
      onPressEnter={onPressEnter}
      onSubmitComment={onSubmitComment}
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
};

export default Container;
