import React from 'react';
import styled from 'styled-components';
import * as timeago from 'timeago.js';
import TextareaAutosize from 'react-autosize-textarea';
import FatText from '../FatText';
import {
  HeartFull,
  HeartEmpty,
  Comment as CommentIcon,
  Airplain,
} from '../Icons';
import Avatar from '../Avatar';

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  .likecountClass {
    margin-bottom: 5px;
  }
`;

const CommentsList = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  @media not screen and (max-width: 993px) {
    height: 66%;
    overflow-y: auto;
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
    margin-left: 3.5px;
  }
`;

const CommentInputarea = styled.form`
  display: flex;
  padding: 10px 0;
  opacity: 0.6;
  &:focus-within {
    opacity: 1;
  }
`;

const Textarea = styled(TextareaAutosize)`
  align-items: flex-start;
  border: none;
  width: 100%;
  max-height: 40px;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  overflow-y: auto;
  @media only screen and (max-width: 993px) {
    margin-bottom: 10px;
  }
`;

const PostLink = styled.a``;

const InputComment = styled.footer`
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  margin-top: 3px;
  padding: 3px 0;
  border-top: ${(props) => props.theme.boxBorder};
  @media only screen and (max-width: 993px) {
    position: relative;
  }
  @media not screen and (max-width: 993px) {
  }
`;

const Comments = styled.ul`
  border: black 1px;
  max-width: 250px;

  line-height: 130%;
  .usernameClass {
    margin: 10px 5px;
  }
  .myComment {
  }
  &.yourComment {
    height: 250px;
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  @media only screen and (max-width: 993px) {
    padding-top: 10px;
    max-width: none;
  }
`;

const Comment = styled.li`
  word-break: break-all;
`;
const FriendComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
`;
const MyComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
`;
const MyAvatar = styled(Avatar)`
  margin-right: 15px;
`;

const CommentRow = styled.div``;
export default ({
  user,
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
      <CommentsList>
        <Comments className="yourComment">
          <MyComment>
            <MyAvatar
              size="sm"
              url={
                user?.avatar ||
                'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
              }
            />
            <CommentRow>
              <Comment className="myComment">
                <FatText className="usernameClass" text={user?.userName} />
                {caption}
              </Comment>
              <Timestamp className="commentTimestamp">
                {timeago.format(new Date(createdAt))}
              </Timestamp>
            </CommentRow>
          </MyComment>
          {comments?.map((comment, index) => (
            <FriendComment>
              <MyAvatar
                size="sm"
                url={
                  comment?.avatar ||
                  'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                }
              />
              <CommentRow>
                <Comment key={index}>
                  <FatText className="usernameClass" text={comment.userName} />
                  {comment.text}
                </Comment>
                <Timestamp className="commentTimestamp">
                  {timeago.format(new Date(comment.createdAt))}
                </Timestamp>
              </CommentRow>
            </FriendComment>
          ))}
        </Comments>
      </CommentsList>
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
        <Timestamp className="postTimestamp">
          {timeago.format(new Date(createdAt))}
        </Timestamp>
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
