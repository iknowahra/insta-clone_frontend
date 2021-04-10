import React, { useState, useEffect } from 'react';
import { useLazyQuery, useSubscription, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import Presenter from './Presenter';
import useInput from '../../Hooks/EnterInput';
import { getUserNameVar } from '../../Apollo/LocalState';
import {
  GET_MYPROFILE,
  GET_MYROOMS,
  GET_MESSAGE,
  SUB_MESSAGE,
  SEARCH_ROOM,
  SEND_MESSAGE,
} from './Queries';

export default () => {
  const message = useInput('');
  const [me, setMe] = useState('');
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSent, setBeSent] = useState(false);
  const [getUserName, { data: userData }] = useLazyQuery(GET_MYPROFILE);
  const [getMyRooms, { data: roomsData }] = useLazyQuery(GET_MYROOMS, {
    fetchPolicy: 'network-only',
    pollInterval: 300,
  });
  const [getMessage, { data: messageData }] = useLazyQuery(GET_MESSAGE, {
    fetchPolicy: 'network-only',
  });
  const [onSendMutation] = useMutation(SEND_MESSAGE);

  const { data: subData, loading: subLoading } = useSubscription(SUB_MESSAGE, {
    variables: { roomId: currentRoom },
    skip: !currentRoom,
  });

  const onSetNumber = (number) => {
    setCurrentRoom(number);
    getMessage({
      variables: {
        roomId: number,
      },
      skip: number === null,
    });
  };

  const sendMessage = async () => {
    try {
      await onSendMutation({
        variables: {
          roomId: currentRoom,
          text: message.value,
        },
        skip: !isSent || !message.value,
      });
      message.setValue('');
    } catch (e) {
      console.log('meesage send e:', e);
      toast.error('Sending a message is failed.');
    } finally {
      setBeSent(false);
    }
  };

  useEffect(() => {
    if (isSent) {
      return sendMessage();
    }
  }, [isSent]);

  useEffect(() => {
    getUserName();
    getMyRooms();
  }, []);

  useEffect(() => {
    if (userData) {
      setMe(userData.myProfile?.user.userName);
    }
  }, [userData]);

  useEffect(() => {
    setRooms(roomsData?.seeRooms);
  }, [roomsData?.seeRooms]);

  useEffect(() => {
    setMessages(messageData?.getMessage);
  }, [messageData?.getMessage]);

  useEffect(() => {
    if (subData) {
      const { newMessage } = subData;
      const itsMe = newMessage.user.userName === me;
      newMessage.user.itsMe = itsMe;
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [subData, subLoading]);

  return (
    <>
      {!!userData && !!roomsData && (
        <Presenter
          user={userData?.myProfile?.user}
          rooms={rooms}
          message={message}
          messages={messages}
          loaded={!!userData && !!roomsData}
          setNumber={(number) => onSetNumber(number)}
          onSubmit={(result) => setBeSent(result)}
        />
      )}
    </>
  );
};
