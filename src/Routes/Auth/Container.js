import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { isLogginVar } from '../../Apollo/LocalState';
import Presenter from './Presenter';
import useInput from '../../Hooks/EnterInput';
import {
  CONFIRM_SECRET,
  LOG_IN,
  REQUEST_SECRET,
  SIGN_UP,
  LOG_IN_FB,
} from './Queries';

export default () => {
  const [action, setAction] = useState('logIn');
  const [fbData, setFbData] = useState({});
  const [createFbAccount] = useMutation(SIGN_UP);
  const [loginFbMutation] = useMutation(LOG_IN_FB);

  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const password = useInput('');
  const secret = useInput('');

  const [requestSecretMutation] = useMutation(REQUEST_SECRET, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (requestSecret.error !== null) {
        toast.error(requestSecret.error);
      } else {
        toast.success('Email sent! Check your email box');
      }
    },
    variables: {
      email: email.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    update: (_, { data: { confirmSecret } }) => {
      if (!confirmSecret.ok) {
        toast.error(confirmSecret.error);
      } else {
        toast.success('Success!');
        setTimeout(() => isLogginVar(true), 3000);
      }
    },
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [loginEmailMutation] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { loginEmail } = data;
      localStorage.setItem('token', loginEmail.token);
      if (loginEmail.error !== null) {
        toast.error(loginEmail.error);
        if (loginEmail.error === 'There is no user.') {
          setTimeout(() => setAction('signUp'), 3000);
        }
      } else {
        toast.success('Log In Success!');
        localStorage.setItem('userInfo', JSON.stringify(loginEmail?.user));
        if (!loginEmail.user.confirmSecret) {
          setTimeout(() => setAction('confirm'), 3000);
        } else {
          setTimeout(() => isLogginVar(true), 3000);
        }
      }
    },
    variables: { email: email.value, password: password.value },
  });

  const [createAccountMutation] = useMutation(SIGN_UP, {
    update: (_, { data }) => {
      const { createAccount } = data;
      if (!createAccount.ok) {
        toast.error(createAccount.error);
        if (createAccount.error === 'Already enrolled email!') {
          setTimeout(() => setAction('logIn'), 3000);
        }
      } else {
        requestSecretMutation();
        toast.success('Account created! Log In now');
        setTimeout(() => setAction('logIn'), 3000);
      }
    },
  });

  const onLogin = (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      loginEmailMutation();
    } else {
      toast.error('Email and password are required.');
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    if (action === 'signUpFb') {
      createFbAccount({
        variables: {
          email: fbData.email,
          facebookId: fbData.id,
          avatar: fbData.picture.data.url,
          userName: username.value,
          firstName: firstName.value,
          lastName: lastName.value,
          name: fbData.name,
        },
      });
    } else if (email.value !== '' && username.value !== '') {
      createAccountMutation({
        variables: {
          email: email.value,
          userName: username.value,
          firstName: firstName.value,
          lastName: lastName.value,
          password: password.value,
        },
      });
    } else {
      toast.error('Email and Username field are required');
    }
  };

  const onConfirm = (e) => {
    e.preventDefault();
    if (email.value !== '' && secret.value !== '') {
      confirmSecretMutation();
    } else {
      toast.error('All field are required');
    }
  };

  const onSendEmail = () => {
    requestSecretMutation();
  };

  const fbLoginProcess = async (process) => {
    setFbData(process);
    if (process.accessToken) {
      localStorage.setItem('FBtoken', process.accessToken);
      const { email: fbEmail, name, id: facebookId, picture } = process;
      const {
        data: { loginFb },
      } = await loginFbMutation({
        variables: {
          email: fbEmail,
          facebookId,
        },
      });
      if (loginFb.error) {
        if (loginFb.error === 'There is no user.') {
          toast.error(
            `Error : ${loginFb.error} Please signup once to enjoy instagram.`,
          );
          firstName.setValue(name.split(' ')[0]);
          lastName.setValue(name.split(' ').slice(1, name.length));
          setTimeout(() => setAction('signUpFb'), 3000);
        } else {
          toast.error(`Error : ${loginFb.error}`);
        }
      } else {
        localStorage.setItem('token', loginFb.token);
        localStorage.setItem('userInfo', JSON.stringify(loginFb?.user));
        setTimeout(() => isLogginVar(!!localStorage.getItem('token')), 3000);
      }
    } else {
      toast.error('Facebook log in failed.');
    }
  };

  const responseFacebook = async (response) => {
    await fbLoginProcess(response);
  };

  return (
    <Presenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      secret={secret}
      onLogin={onLogin}
      onSignup={onSignup}
      onConfirm={onConfirm}
      onSendEmail={onSendEmail}
      responseFacebook={(response) => responseFacebook(response)}
    />
  );
};
