import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FatText from '../../Components/FatText';
import Avatar from '../../Components/Avatar';
import CommentComponent from '../../Components/Comments/index';
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
  a {
    color: inherit;
  }
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  max-height: 500px;
  overflow: hidden;
`;

export default ({
  id,
  user,
  caption,
  location,
  files,
  comments,
  amILiking,
  likeCount,
  commentCount,
  createdAt,
}) => (
  <Post>
    <Header>
      <HeaderColumn>
        <Avatar size="sm" url={user.avatar} />
        <UserColumn>
          <Link to={`/profile/${user.userName}`}>
            <FatText text={user.userName} />
          </Link>
          <Link to={`/search?term=${location.split(',')[0]}`}>
            <Location>{location}</Location>
          </Link>
        </UserColumn>
      </HeaderColumn>
      <HeaderColumn>
        <MoreOptions className="userMore" text="..." />
      </HeaderColumn>
    </Header>
    <Files>
      <FilePresenter files={files} />
    </Files>
    <CommentComponent
      id={id}
      user={user}
      caption={caption}
      likeCount={likeCount}
      amILiking={amILiking}
      comments={comments}
      createdAt={createdAt}
      location={location}
      commentCount={commentCount}
      files={files}
    />
  </Post>
);
