import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import * as timeago from 'timeago.js';
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons';
import FatText from '../FatText';
import ModalFeed from '../Modal';

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  .likecountClass {
    margin-bottom: 15px;
  }
  .usernameClass {
    margin-right: 5px;
  }
`;

const Buttons = styled.div`
  ${Button} {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Comments = styled.ul``;

const Comment = styled.li`
  margin-bottom: 7px;
  line-height: 125%;
  word-break: break-all;
`;

const CommentLink = styled.a`
  color: ${(props) => props.theme.footerGreyColor};
`;

const CommentInputarea = styled.form`
  display: flex;
  padding: 8px 0;
  opacity: 0.6;
  &:focus-within {
    opacity: 1;
  }
`;

const Textarea = styled(TextareaAutosize)`
  align-items: flex-start;
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const PostLink = styled.a``;

export default ({
  id,
  user,
  caption,
  location,
  comments,
  amILiking,
  likeCount,
  createdAt,
  newComment,
  onToggleLike,
  onPressEnter,
  onSubmitComment,
  commentCount,
  files,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <Meta>
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
      <Buttons>
        <Button onClick={onToggleLike}>
          {amILiking ? (
            <HeartOutlined style={{ fontSize: '1.5em', color: 'black' }} />
          ) : (
            <HeartFilled
              style={{
                fontSize: '1.5em',
                color: '#ed4956',
              }}
            />
          )}
        </Button>
        <Button>
          <MessageOutlined style={{ fontSize: '1.5em', color: 'black' }} />
        </Button>
        <Button>
          <SendOutlined style={{ fontSize: '1.5em', color: 'black' }} />
        </Button>
      </Buttons>
      <FatText
        className="likecountClass"
        text={
          likeCount === 0 || likeCount === 1
            ? `${likeCount} like`
            : `${likeCount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} likes`
        }
      />
      <Comments>
        <Comment>
          <FatText className="usernameClass" text={user.userName} />
          {caption}
        </Comment>
        <Comment>
          {commentCount > 3 && (
            <CommentLink onClick={handleShow}>
              {`View all ${commentCount} comments`}
            </CommentLink>
          )}
        </Comment>
        {comments &&
          comments.map((comment, index) => {
            if (index < 3)
              return (
                <Comment key={index}>
                  <FatText className="usernameClass" text={comment.userName} />
                  {comment.text}
                </Comment>
              );
          })}
      </Comments>
      <Timestamp>{timeago.format(new Date(createdAt))}</Timestamp>
      <CommentInputarea>
        <Textarea
          placeholder="Add a comment..."
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyUp={onPressEnter}
        />
        <PostLink role="button" onClick={onSubmitComment}>
          Post
        </PostLink>
      </CommentInputarea>
    </Meta>
  );
};
