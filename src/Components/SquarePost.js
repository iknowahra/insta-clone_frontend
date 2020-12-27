import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ModalFeed from './Modal';
import { HeartFull, CommentFull, Photos } from './Icons';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const ManyPhotos = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }
`;

const Container = styled.div`
  position: relative;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
    ${ManyPhotos} {
      opacity: 0;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const SquarePost = ({
  id,
  files,
  user,
  likeCount,
  commentCount,
  url,
  fileCount,
  comments,
  caption,
  amILiking,
  createdAt,
  location,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <Container bg={url}>
      <ModalFeed
        id={id}
        show={showModal}
        handleClose={handleClose}
        files={files}
        user={user}
        caption={caption}
        likeCount={likeCount}
        amILiking={amILiking}
        createdAt={createdAt}
        comments={comments}
        location={location}
      />
      <Overlay onClick={handleShow}>
        <Number>
          <HeartFull />
          <NumberText>{likeCount}</NumberText>
        </Number>
        <Number>
          <CommentFull />
          <NumberText>{commentCount}</NumberText>
        </Number>
      </Overlay>
      {fileCount && fileCount > 1 && (
        <ManyPhotos>
          <Photos />
        </ManyPhotos>
      )}
    </Container>
  );
};

SquarePost.propTypes = {
  id: PropTypes.number,
  location: PropTypes.string,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  fileCount: PropTypes.number,
  files: PropTypes.array,
  comments: PropTypes.array,
  user: PropTypes.object,
  caption: PropTypes.string.isRequired,
  amILiking: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default SquarePost;
