import React, { useState } from 'react';
import styled from 'styled-components';
import * as timeago from 'timeago.js';
import { ChevronDown, AddPerson } from '../../Components/Icons';
import Invite from './Invite';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  justify-content: center;
  border-bottom: ${(props) => props.theme.boxBorder};
`;

const Icon = styled.div`
  svg {
    align-self: center;
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 30px;
  }
`;

const Main = styled.div`
  width: 100%;
  height: auto;
  overflow-y: scroll;
  max-height: 80%;
  flex-wrap: no-wrap;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  text-align: center;
  font-size: 1em;
  align-self: center;
  font-weight: 600;
  > svg {
    align-self: flex-end;
    font-weight: 600;
  }
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 63px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding: 3px 20px;
  &:hover {
    background-color: ${({ theme }) => theme.veryLightGreyColor};
  }
`;
const AvatarWrapper = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const AvatarMulti = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  :first-child {
    position: absolute;
    top: -20px;
  }
  :last-child {
    position: absolute;
    left: 17px;
    bottom: -26px;
    border: 2px solid white;
  }
`;

const RoomNameInfo = styled.div`
  width: 70%;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const RoomName = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
`;
const RoomInfoText = styled.span`
  font-size: 0.9em;
  color: ${(props) => props.theme.darkGreyColor};
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: row;
  :last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default ({ friends, rooms = [], userName, setRoomInfo }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <Wrapper>
      <Invite show={showModal} handleClose={handleClose} friends={friends} />
      <Header>
        <Title>
          {userName} <ChevronDown class="chevron" />
        </Title>
        <Icon onClick={handleShow}>
          <AddPerson />
        </Icon>
      </Header>
      <Main>
        {rooms?.map((room, index) => {
          const filteredUsers = room.participants.filter(
            (user) => user.userName !== userName,
          );
          return (
            <ProfileWrapper
              key={index}
              onClick={() =>
                setRoomInfo(room.id, {
                  name:
                    room.name ||
                    filteredUsers.map((user) => user.userName).join(', '),
                  avatar: filteredUsers[1]?.avatar
                    ? [filteredUsers[0].avatar, filteredUsers[1]?.avatar]
                    : [filteredUsers[0].avatar],
                  info: room.messages.length
                    ? timeago.format(new Date(room.messages[0].createdAt))
                    : timeago.format(new Date(room.createdAt)),
                })
              }
            >
              <AvatarWrapper>
                {filteredUsers?.length === 1 && (
                  <AvatarContainer>
                    <Avatar
                      src={
                        filteredUsers[0]?.avatar ||
                        'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                      }
                    />
                  </AvatarContainer>
                )}
                {filteredUsers?.length > 1 && (
                  <AvatarContainer>
                    <AvatarMulti
                      src={
                        filteredUsers[0]?.avatar ||
                        'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                      }
                    />
                    <AvatarMulti
                      src={
                        filteredUsers[1]?.avatar ||
                        'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                      }
                    />
                  </AvatarContainer>
                )}
              </AvatarWrapper>
              <RoomNameInfo>
                <RoomName>
                  {room.name ||
                    filteredUsers.map((user) => user.userName).join(', ')}
                </RoomName>
                {!room.messages.length && (
                  <RoomInfoText>
                    {`recent action : ${timeago.format(
                      new Date(room.createdAt),
                    )}`}
                  </RoomInfoText>
                )}
                {!!room.messages.length && (
                  <RoomInfo>
                    <RoomInfoText>{room.messages[0].text}</RoomInfoText>
                    <RoomInfoText>
                      {`   ∙ ${timeago.format(
                        new Date(room.messages[0].createdAt),
                      )}`}
                    </RoomInfoText>
                  </RoomInfo>
                )}
              </RoomNameInfo>
            </ProfileWrapper>
          );
        })}
      </Main>
    </Wrapper>
  );
};
