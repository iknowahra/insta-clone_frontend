import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useLazyQuery } from '@apollo/client';
import { isLogginVar } from '../../Apollo/LocalState';
import Presenter from './Presenter';
import useInput from '../../Hooks/useInput';
import {
  CONFIRM_SECRET,
  LOG_IN,
  REQUEST_SECRET,
  SIGN_UP,
  CHECK_USER,
  LOG_IN_FB,
} from './Queries';

export default () => {
  const [action, setAction] = useState('logIn');
  const [fbData, setFbData] = useState({});
  const [createFbAccount] = useMutation(SIGN_UP);
  const [loginFbMutation] = useMutation(LOG_IN_FB);
  const [checkUserValidationQuery, { data }] = useLazyQuery(CHECK_USER, {
    fetchPolicy: 'no-cache',
  });

  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const password = useInput('');
  const secret = useInput('');

  const onCheckNewAccount = async (value) => {
    checkUserValidationQuery({
      variables: { email: value },
    });
    if (data?.checkUser) {
      const { checkUser } = data;
      if (!checkUser.ok) {
        if (checkUser.error === 'Taken') {
          return false;
        }
        console.log('checkUserError', checkUser.error);
        toast.error(`Sorry for the Error : ${checkUser.error}`);
        return null;
      }
      return true;
    }
  };

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
    if (email.value !== '' && username.value !== '') {
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

  const responseFacebook = async (response) => {
    setFbData(response);
    await fbLoginProcess(response);
  };

  const fbLoginProcess = async (process) => {
    if (process.accessToken) {
      console.log('token', process.email);
      localStorage.setItem('FBtoken', process.accessToken);
      const { email: fbEmail, name, id: facebookId, picture } = process;
      const isNewUser = await onCheckNewAccount(fbEmail);
      console.log('isNewUser,', isNewUser);
      if (isNewUser) {
        createFbAccount({
          variables: {
            email: fbEmail,
            name,
            avatar: picture.data.uri,
            facebookId,
            userName: name + facebookId.slice(0, 4),
          },
        });
      } else {
        const {
          data: { loginFb },
        } = await loginFbMutation({
          variables: {
            email: fbEmail,
            facebookId,
          },
        });
        if (loginFb.error) {
          toast.error(`Error : ${loginFb.error}`);
        } else {
          localStorage.setItem('token', loginFb.token);
          setTimeout(() => isLogginVar(!!localStorage.getItem('token')), 3000);
        }
      }
    } else {
      toast.error('Facebook log in failed.');
    }
  };

  // console.log(JSON.parse(fbData));

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
      responseFacebook={responseFacebook}
    />
  );
};
