import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import { CheckOutlined } from '@ant-design/icons';
import { useLazyQuery, useMutation } from '@apollo/client';
import Avatar from '../../Components/Avatar';
import InputTag from '../../Components/InputTag';
import { SEARCH_USER, MAKE_ROOM, GET_MYROOMS } from './Queries';

const Frame = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled(Modal.Body)`
  width: 100%;
  height: 450px;
`;
const Header = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
`;
const Title = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => props.theme.boxBorder};
  font-size: 1.2em;
  font-weight: 500;
  padding-bottom: 10px;
`;

const Next = styled.a`
  font-size: 0.8em;
  font-weight: 500;
  position: absolute;
  right: 10px;
  top: 18px;
`;

const Select = styled.div`
  width: 100%;
  height: calc(90px - 25px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: ${(props) => props.theme.boxBorder};
  span {
    font-size: 1.2em;
    font-weight: 500;
  }
`;

const SelectTitle = styled.span`
  width: 32px;
`;

const InputZone = styled.div`
  width: 100%;
  height: 100%;
`;

const List = styled.div`
  width: 100%;
  height: 80%;
  max-height: fill-available;
  padding: 10px 0;
  overflow-y: auto;
`;

const ListTitle = styled.span``;

const NameZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const AvatarZone = styled.div`
  margin-right: 10px;
`;
const Friend = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: ${({ theme }) => theme.veryLightGreyColor};
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Username = styled.span`
  font-weight: 500;
  margin-bottom: 3px;
`;
const Name = styled.span`
  color: ${({ theme }) => theme.footerGreyColor};
`;

const Check = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.lightGreyColor};
  padding-left: 3px;
  margin-right: 5px;
`;

export default ({ show, handleClose, friends: myFriends }) => {
  const [friends, setFriends] = useState(myFriends);
  const [tags, setTags] = useState([]);
  const [toIds, setToIds] = useState([]);
  const [reset, isReset] = useState(false);
  const [getSearchUsers, { data }] = useLazyQuery(SEARCH_USER, {
    nextFetchPolicy: 'network-only',
  });
  const [onSendMutation] = useMutation(MAKE_ROOM);
  const changeTags = (friend) => {
    if (tags.includes(friend.userName)) {
      setTags((prev) => prev.filter((tag) => tag !== friend.userName));
      setToIds((prev) => prev.filter((tag) => tag !== friend.id));
    } else {
      setTags((prev) => [...prev, friend.userName]);
      setToIds((prev) => [...prev, friend.id]);
    }
    isReset(true);
    setTimeout(() => isReset(false), 200);
  };
  const onInvite = (editedTags, editedIds) => {
    setTags(editedTags);
    setToIds(editedIds);
  };
  const findUser = (term) => {
    if (term) {
      getSearchUsers({
        skip: term === undefined,
        variables: { term },
      });
      setFriends(data?.searchUser);
    } else {
      setFriends(myFriends);
    }
  };

  const onSend = async () => {
    try {
      await onSendMutation({
        variables: { toIds },
        update(cache, { data: { makeRoom } }) {
          if (!makeRoom?.duplication) {
            const newRoomResponse = makeRoom?.room;
            const existingRooms = cache.readQuery({ query: GET_MYROOMS });
            if (existingRooms && newRoomResponse) {
              cache.writeQuery({
                query: GET_MYROOMS,
                data: {
                  seeRooms: [newRoomResponse, ...existingRooms?.seeRooms],
                },
              });
            }
          }
        },
      });
      handleClose();
    } catch (e) {
      console.log('invite e', e);
    }
  };

  return (
    <>
      <Frame
        size="sm"
        show={show}
        centered
        onHide={handleClose}
        animation={false}
      >
        <Body>
          <Header>
            <Title>
              New Message<Next onClick={onSend}>Next</Next>
            </Title>
            <Select>
              <SelectTitle>To :</SelectTitle>
              <InputZone>
                <InputTag
                  reset={reset}
                  friends={friends}
                  invited={tags}
                  invitedId={toIds}
                  onInvite={(edited) => onInvite(edited)}
                  findUser={findUser}
                />
              </InputZone>
            </Select>
          </Header>
          <List>
            <ListTitle>Recommendation</ListTitle>
            {friends?.map((friend) => (
              <Friend key={friend.id} onClick={() => changeTags(friend)}>
                <Info>
                  <AvatarZone>
                    <Avatar
                      size="smd"
                      url={
                        friend.avatar ||
                        'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                      }
                    />
                  </AvatarZone>
                  <NameZone>
                    <Username>{friend.userName}</Username>
                    <Name>{friend.name}</Name>
                  </NameZone>
                </Info>
                <Check
                  style={{
                    backgroundColor: tags.includes(friend.userName)
                      ? '#0095f6'
                      : 'white',
                  }}
                >
                  <CheckOutlined style={{ color: 'white' }} />
                </Check>
              </Friend>
            ))}
          </List>
        </Body>
      </Frame>
    </>
  );
};
