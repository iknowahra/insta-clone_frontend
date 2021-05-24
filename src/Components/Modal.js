import React from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import FileSlider from './FileSlider';
import CommentComponent from './Comments/index';
import FatText from './FatText';
import Avatar from './Avatar';

const Frame = styled(Modal)`
  display: flex;
`;

const Body = styled(Modal.Body)`
  width: 100%;
  height: 480px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 993px) {
    height: auto;
    position: relative;
    flex-direction: column;
  }
`;

const Header = styled.header`
  height: 12%;
  padding: 11px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) => props.theme.boxBorder};
  @media only screen and (max-width: 993px) {
    position: absolute;
    top: 0;
    background-color: white;
    height: 10%;
    border-bottom: none;
  }
  @media not screen and (max-width: 993px) {
    margin-bottom: 10px;
  }
`;

const HeaderColumn = styled.div`
  display: flex;
`;

const MoreOptions = styled(FatText)`
  display: flex;
  font-weight: 700;
  font-size: 17px;
  @media only screen and (max-width: 993px) {
    position: absolute;
    right: 30px;
    top: 20px;
  }
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

const ReactionZone = styled.div`
  @media not screen and (max-width: 993px) {
    width: 35%;
    height: 100%;
  }
`;
const PhotoZone = styled.div`
  @media only screen and (max-width: 993px) {
    position: relative;
    top: 50px;
  }
  @media not screen and (max-width: 993px) {
    width: 65%;
    margin-left: 15px;
  }
`;

const PhotoFrame = styled.div`
  overflow: hidden;
  @media only screen and (max-width: 993px) {
    height: auto;
  }
  @media not screen and (max-width: 993px) {
    max-width: 480px;
  }
`;

const ViewComment = styled.div`
  position: relative;
  display: flex;
  height: auto;
  flex-direction: column;
  @media only screen and (max-width: 993px) {
    top: 50px;
  }
  @media not screen and (max-width: 993px) {
    height: 100%;
  }
`;

const Footer = styled.div`
  @media not screen and (max-width: 993px) {
    height: 86%;
  }
`;

export default ({
  show,
  handleClose,
  files,
  id,
  comments,
  user,
  caption,
  likeCount,
  amILiking,
  createdAt,
  location,
}) => {
  return (
    <>
      <Frame
        size="lg"
        show={show}
        centered
        scrollable
        onHide={handleClose}
        animation={false}
      >
        <Body>
          <PhotoZone>
            <PhotoFrame>
              <FileSlider files={files} />
            </PhotoFrame>
          </PhotoZone>
          <ReactionZone>
            <Header>
              <HeaderColumn onClick={handleClose}>
                <Avatar
                  size="sm"
                  url={
                    user?.avatar ||
                    'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                  }
                />
                <UserColumn onClick={handleClose}>
                  <Link to={`/profile/${user?.userName}`}>
                    <FatText text={user?.userName} />
                  </Link>
                  <Link to={`/search?term=${location?.split(',')[0]}`}>
                    <Location>{location}</Location>
                  </Link>
                </UserColumn>
              </HeaderColumn>
              <HeaderColumn>
                <MoreOptions className="userMore" text="..." />
              </HeaderColumn>
            </Header>
            <Footer>
              <ViewComment>
                <CommentComponent
                  id={id}
                  modal
                  user={user}
                  caption={caption}
                  likeCount={likeCount}
                  amILiking={amILiking}
                  comments={comments}
                  createdAt={createdAt}
                />
              </ViewComment>
            </Footer>
          </ReactionZone>
        </Body>
      </Frame>
    </>
  );
};
