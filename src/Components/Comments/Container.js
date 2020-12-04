import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import useInput from '../../Hooks/EnterInput';
import Presenter from './Presenter';
import ModalPresenter from './ModalPresenter';

import { TOGGLE_LIKE, ADD_COMMENT } from './Queries';

const Container = ({
  modal,
  id,
  user,
  caption,
  likeCount,
  amILiking,
  comments,
  createdAt,
  commentCount,
  location,
  files,
}) => {
  const comment = useInput('');
  const [amILikingS, setAmILiking] = useState(amILiking);
  const [commentCountS, setCommentCount] = useState(commentCount);
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
        setCommentCount(commentCountS + 1);
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
    <>
      {modal ? (
        <ModalPresenter
          user={user}
          caption={caption}
          likeCount={likeCountS}
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
      ) : (
        <Presenter
          id={id}
          user={user}
          caption={caption}
          location={location}
          files={files}
          likeCount={likeCountS}
          amILiking={amILikingS}
          comments={commentS}
          createdAt={createdAt}
          newComment={comment}
          setAmILiking={setAmILiking}
          setLikeCount={setLikeCount}
          onToggleLike={onToggleLike}
          onPressEnter={onPressEnter}
          onSubmitComment={onSubmitComment}
          commentCount={commentCountS}
        />
      )}
    </>
  );
};

Container.propTypes = {
  modal: PropTypes.bool,
  id: PropTypes.number.isRequired,
  caption: PropTypes.string,
  location: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }).isRequired,
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
  files: PropTypes.array,
};

export default Container;
