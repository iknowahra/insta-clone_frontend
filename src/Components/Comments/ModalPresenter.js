import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import FatText from '../FatText';
import {
  HeartFull,
  HeartEmpty,
  Comment as CommentIcon,
  Airplain,
} from '../Icons';

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  .likecountClass {
    margin-bottom: 5px;
  }
`;

const Buttons = styled.div`
  ${Button} {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
  margin-bottom: 5px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  font-size: 10px;
  display: block;
  &.postTimestamp {
    border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
    margin: 3px 0px;
    padding-bottom: 10px;
  }
  &.commentTimestamp {
    margin-bottom: 10px;
  }
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
  max-height: 42px;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  overflow-y: auto;
`;

const PostLink = styled.a``;

const ViewComment = styled.div`
  position: relative;
  display: flex;
  height: 75%;
  flex-direction: column;
`;

const InputComment = styled.footer`
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 25%;
  margin-top: 3px;
  padding: 3px 0;
  border-top: ${(props) => props.theme.boxBorder};
`;

const Comments = styled.ul`
  max-width: 240px;
  line-height: 130%;
  .usernameClass {
    margin-right: 5px;
  }
  .myComment {
    margin: 10px 0;
  }
  &.yourComment {
    height: 230px;
    max-height: 230px;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

const Comment = styled.li`
  word-break: break-all;
`;

export default ({
  user: { userName, avatar },
  caption,
  comments,
  amILiking,
  likeCount,
  createdAt,
  newComment,
  onToggleLike,
  onPressEnter,
  onSubmitComment,
}) => {
  return (
    <Meta>
      <Comments>
        <Comment className="myComment">
          <FatText className="usernameClass" text={userName} />
          {caption}
        </Comment>
      </Comments>
      <Comments className="yourComment">
        {comments &&
          comments.map((comment, index) => (
            <>
              <Comment key={index}>
                <FatText className="usernameClass" text={comment.userName} />
                {comment.text}
              </Comment>
              <Timestamp className="commentTimestamp">
                {comment.createdAt}
              </Timestamp>
            </>
          ))}
      </Comments>
      <InputComment>
        <Buttons>
          <Button onClick={onToggleLike}>
            {amILiking ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <CommentIcon />
          </Button>
          <Button>
            <Airplain />
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
        <Timestamp className="postTimestamp">{createdAt}</Timestamp>
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
      </InputComment>
    </Meta>
  );
};
