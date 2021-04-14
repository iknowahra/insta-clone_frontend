import React from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import FileSlider from './FileSlider';
import CommentComponent from './Comments/index';
import FatText from './FatText';
import Avatar from './Avatar';

const Frame = styled(Modal)`
  display: flex;
`;

const Body = styled(Modal.Body)`
  height: 480px;
`;

const OutButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Header = styled.header`
  height: 15%;
  padding: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) => props.theme.boxBorder};
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

const MyCol = styled(Col)`
  .commentZone {
    display: flex;
    flex-direction: column;
  }
  .photoZone {
  }
`;

const PhotoFrame = styled.div`
  max-height: 445px;
  overflow: hidden;
`;

const ViewComment = styled.div`
  position: relative;
  display: flex;
  height: 55%;
  flex-direction: column;
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
        onHide={handleClose}
        animation={false}
      >
        <Body>
          <OutButton onClick={handleClose}>X</OutButton>
          <Container>
            <Row>
              <MyCol className="photoZone" xs={12} md={8}>
                <PhotoFrame>
                  <FileSlider files={files} size="lg" />
                </PhotoFrame>
              </MyCol>
              <MyCol className="commentZone" xs={6} md={4}>
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
              </MyCol>
            </Row>
          </Container>
        </Body>
      </Frame>
    </>
  );
};
