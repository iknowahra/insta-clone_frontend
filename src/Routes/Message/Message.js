import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as timeago from 'timeago.js';
import Input from '../../Components/Input';
import { Info, Emoji } from '../../Components/Icons';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Header = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  justify-content: center;
  border-bottom: ${(props) => props.theme.boxBorder};
  > svg {
    align-self: center;
    position: absolute;
    right: 7px;
    font-size: 30px;
  }
`;

const Main = styled.div`
  width: 100%;
  height: 80%;
  max-height: 80%;
  flex-wrap: no-wrap;
  overflow-y: auto;
`;

const MainWrapper = styled.div`
  padding: 10px 0 20px 0;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  background-color: white;
  height: 55px;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
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

const AvatarWrapper = styled.div`
  width: 38px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const AvatarMulti = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :first-child {
    position: absolute;
    top: -13px;
  }
  :last-child {
    position: absolute;
    left: 10px;
    bottom: -18px;
    border: 1px solid white;
  }
`;

const FooterWrapper = styled.div`
  position: relative;

  > svg {
    position: absolute;
    bottom: 6px;
    left: 10px;
  }
`;
const MessageInput = styled(Input)`
  display: flex;
  width: 100%;
  height: 35px;
  border-radius: 15px;
  padding-left: 40px;
`;

const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  [name='my_message'] {
    float: right;
    position: relative;
  }
`;
const SmAvatar = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;
const Message = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3px;
  [name='message'] {
    border-radius: 15px;
    padding: 10px 12px;
  }
  &[name='my_message'] {
    align-items: flex-end;
  }
`;
const MyMessage = styled.div`
  background-color: ${(props) => props.theme.lightGreyColor};
`;

const YourMessage = styled.div`
  display: flex;
  border: ${(props) => props.theme.boxBorder};
`;
const MessageText = styled.span``;
const YourText = styled.span``;
const DateContainer = styled.div`
  margin: 0px 6px;
`;
const DateText = styled.span`
  font-size: 0.7em;
  color: ${(props) => props.theme.darkGreyColor};
`;

export default ({ message, messages = [], roomInfo, onSubmit }) => {
  const messagesRef = useRef(null);
  const scrollToBottom = () => {
    // eslint-disable-next-line no-unused-expressions
    messagesRef.current?.addEventListener('DOMNodeInserted', (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(true);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Wrapper>
      <Header>
        <AvatarWrapper>
          {roomInfo?.avatar?.length === 1 && (
            <AvatarContainer>
              <Avatar
                src={
                  roomInfo.avatar[0] ||
                  'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                }
              />
            </AvatarContainer>
          )}

          {roomInfo?.avatar?.length > 1 && (
            <AvatarContainer>
              <AvatarMulti
                src={
                  roomInfo.avatar[0] ||
                  'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                }
              />
              <AvatarMulti
                src={
                  roomInfo.avatar[1] ||
                  'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                }
              />
            </AvatarContainer>
          )}
        </AvatarWrapper>
        <Title>{roomInfo.name}</Title>
        <Info />
      </Header>
      <Main ref={messagesRef}>
        <MainWrapper>
          {messages?.map((message) => (
            <MessageContainer key={message.id}>
              {!message.user.itsMe && <SmAvatar src={message.user.avatar} />}
              {message.user.itsMe && (
                <Message name="my_message">
                  <MyMessage name="message">
                    <MessageText>{message.text}</MessageText>
                  </MyMessage>
                  <DateContainer>
                    <DateText>
                      {timeago.format(new Date(message.createdAt))}
                    </DateText>
                  </DateContainer>
                </Message>
              )}
              {!message.user.itsMe && (
                <Message>
                  <YourMessage name="message">
                    <MessageText>{message.text}</MessageText>
                  </YourMessage>
                  <DateContainer>
                    <DateText>
                      {timeago.format(new Date(message.createdAt))}
                    </DateText>
                  </DateContainer>
                </Message>
              )}
            </MessageContainer>
          ))}
        </MainWrapper>
      </Main>
      <Footer>
        <form onSubmit={handleSubmit}>
          <FooterWrapper>
            <MessageInput
              placeholder="Input message..."
              {...message}
              onKeyPress={handleKeyPress}
              type="message"
            />
            <Emoji />
          </FooterWrapper>
        </form>
      </Footer>
    </Wrapper>
  );
};
