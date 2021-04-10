import React, { useState } from 'react';
import styled from 'styled-components';
import Messages from './Messages';
import Message from './Message';

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  margin-bottom: 25px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  border: ${(props) => props.theme.boxBorder};
`;
const MessagesWrapper = styled.div`
  width: 40%;
  height: 100%;
  border-right: ${(props) => props.theme.boxBorder};
`;

const MessageWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotYetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotYetTitle = styled.div`
  font-size: 2em;
  font-weight: 200;
  margin-bottom: 10px;
`;
const NotYetSubTitle = styled.div``;
const NotYetButton = styled.span`
  color: white;
  display: flex;
  padding: 5px 10px;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.blueColor};
  margin-top: 25px;
`;

export default ({
  user,
  rooms = [],
  loaded,
  setNumber,
  message,
  messages = [],
  onSubmit,
}) => {
  const [isSelected, setSelected] = useState(null);
  const [roomInfo, setRoom] = useState({});
  const onSetRoomInfo = (number, info) => {
    setNumber(number);
    setSelected(!!number);
    setRoom(info);
  };
  const handleSubmit = (result) => {
    onSubmit(result);
  };
  return (
    <Wrapper>
      {loaded && (
        <>
          <MessagesWrapper>
            <Messages
              userName={user?.userName}
              rooms={rooms}
              setRoomInfo={(number, info) => onSetRoomInfo(number, info)}
            />
          </MessagesWrapper>
          <MessageWrapper>
            {isSelected && (
              <Message
                messages={messages}
                message={message}
                roomInfo={roomInfo}
                onSubmit={(result) => handleSubmit(result)}
              />
            )}
            {!isSelected && (
              <NotYetContainer>
                <NotYetTitle>My message</NotYetTitle>
                <NotYetSubTitle>
                  Send your friend or group private messages or photos{' '}
                </NotYetSubTitle>
                <NotYetButton>Send Message</NotYetButton>
              </NotYetContainer>
            )}
          </MessageWrapper>
        </>
      )}
    </Wrapper>
  );
};
