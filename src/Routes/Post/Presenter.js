import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import FatText from '../../Components/FatText';
import Avatar from '../../Components/Avatar';
import {
  HeartFull,
  HeartEmpty,
  Comment as CommentIcon,
  Airplain,
} from '../../Components/Icons';
import FilePresenter from '../../Components/FileSlider';

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
`;

const Header = styled.header`
  padding: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${(props) => props.theme.maxWidth};
`;

const HeaderColumn = styled.div`
  display: flex;
`;

const MoreOptions = styled(FatText)`
  display: flex;
  font-weight: 700;
  font-size: 17px;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div``;

const File = styled.img`
  max-width: 100%;
`;

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
  margin-bottom: 10px;
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
  user: { userName, avatar },
  caption,
  location,
  files,
  comments,
  amILiking,
  likeCount,
  createdAt,
  newComment,
  onToggleLike,
  onPressEnter,
  onSubmitComment,
}) => (
  <Post>
    <Header>
      <HeaderColumn>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <FatText text={userName} />
          <Location>{location}</Location>
        </UserColumn>
      </HeaderColumn>
      <HeaderColumn>
        <MoreOptions className="userMore" text="..." />
      </HeaderColumn>
    </Header>
    <Files>
      <FilePresenter files={files} />
    </Files>
    <Meta>
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
      <Comments>
        <Comment>
          <FatText className="usernameClass" text={userName} />
          {caption}
        </Comment>
        {comments &&
          comments.map((comment, index) => (
            <Comment key={index}>
              <FatText className="usernameClass" text={comment.userName} />
              {comment.text}
            </Comment>
          ))}
      </Comments>
      <Timestamp>{createdAt}</Timestamp>
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
  </Post>
);
