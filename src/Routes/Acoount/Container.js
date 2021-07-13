import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Presenter from './Presenter';
import { CHECK_USER, EDIT_PROFILE } from './Queries';
import { LOG_IN } from '../Auth/Queries';
import SEE_USER from '../Profile/Queries';
import useInput from '../../Hooks/EnterInput';

// Access to XMLHttpRequest at 'https://ahrastargram.herokuapp.com/api/upload' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

const Container = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { data: info } = useQuery(SEE_USER, {
    variables: { userName: userInfo.userName },
  });

  const [avatar, setAvatar] = useState(null);

  const userName = useInput('');
  const bio = useInput('');
  const passwordOld = useInput('');
  const passwordNew = useInput('');
  const passwordConfirm = useInput('');
  const lastName = useInput('');
  const firstName = useInput('');
  const [checkUsername, { data: result }] = useLazyQuery(CHECK_USER);
  const [editProfile, { data: changeEditResult }] = useMutation(EDIT_PROFILE, {
    variables: {
      userName: userName.value,
      bio: bio.value,
      firstName: firstName.value,
      lastName: lastName.value,
      avatar,
      password: passwordNew.value,
    },
    fetchPolicy: 'no-cache',

    onCompleted: async (data) => {
      const { editUser } = data;
      if (editUser.ok) {
        toast.success('Saved successfully');
        onResetPasswordInput();
      } else {
        toast.error('Error. Try one more time');
      }
    },
  });

  const [checkPassword] = useMutation(LOG_IN, {
    fetchPolicy: 'no-cache',
    variables: {
      email: userInfo.email,
      password: passwordOld.value,
    },
    onCompleted: async (data) => {
      const { loginEmail } = data;
      if (loginEmail.error) {
        toast.error(loginEmail.error);
      } else {
        await editProfile();
      }
    },
  });

  const onChangePassword = async () => {
    await checkPassword();
  };

  const onChangeProfile = async () => {
    if (avatar) {
      await onSendAvatar();
    }
    /*  await editProfile({
      onCompleted: async (data) => {
        const { editUser } = data;
        if (editUser.ok) {
          toast.success('Saved successfully');
        } else {
          toast.error('Error. Try one more time');
        }
      },
    }); */
  };

  const onResetPasswordInput = () => {
    passwordConfirm.setValue('');
    passwordNew.setValue('');
    passwordOld.setValue('');
  };
  const onChangeAvatar = (change) => {
    setAvatar(change);
  };

  const onSendAvatar = async () => {
    try {
      console.log('click');
      const formData = new FormData();
      formData.append('photos', [avatar]);

      const {
        data: { filesArray },
      } = await axios({
        method: 'post',
        url: 'https://ahrastargram.herokuapp.com/api/upload',
        data: formData,
        headers: {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      });
      console.log(filesArray);
      setAvatar(filesArray[0].location);
    } catch (e) {
      console.log('upload error : ', e);
      toast.error('Sorry for the error. Please try later.');
    }
  };

  const onCheckUsername = (name) => {
    checkUsername({ variables: { userName: name } });
  };

  console.log(avatar, userInfo, info);

  return (
    <>
      <Presenter
        user={userInfo}
        userName={userName}
        bio={bio}
        passwordOld={passwordOld}
        passwordNew={passwordNew}
        passwordConfirm={passwordConfirm}
        firstName={firstName}
        lastName={lastName}
        onCheckUsername={(name) => onCheckUsername(name)}
        onChangePassword={onChangePassword}
        result={result?.checkUser}
        changeEditResult={changeEditResult}
        onChangeProfile={onChangeProfile}
        onChangeAvatar={onChangeAvatar}
      />
    </>
  );
};

export default Container;
