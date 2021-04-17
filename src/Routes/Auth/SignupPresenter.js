/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Intro = styled.div`
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 17px;
    vertical-align: baseline;
    color: ${(props) => props.theme.darkGreyColor};
    text-align: center;
    line-height: 1.2em;
    margin-bottom: 10px;
  }
  button {
    margin-bottom: 15px;
  }
`;

const Or = styled.div`
  position: relative;
  color: ${(props) => props.theme.darkGreyColor};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 40px;
  text-align: center;
  background-color: white;
`;

const Line = styled.div`
  position: relative;
  display: flex;
  height: 0;
  width: 100%;
  border-top: ${(props) => props.theme.boxBorder};
  padding: 0;
  top: 8px;
`;

const Guide = styled.p`
  color: ${(props) => props.theme.darkGreyColor};
  margin: 20px 0;
  vertical-align: baseline;
  text-align: center;
  line-height: 1.5em;
  font-size: 12px;
  a {
    color: ${(props) => props.theme.darkGreyColor};
    font-weight: 600;
  }
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  password,
  onSignup,
  responseFacebook,
}) => {
  return (
    <>
      <Intro>
        <p>Sign up to see photos and videos from your friends.</p>
        <FacebookLogin
          appId="253692292993280"
          autoLoad
          fields="name,email,picture"
          scope="public_profile"
          callback={(response) => responseFacebook(response)}
          render={(renderProps) => (
            <Button text="Log in with Facebook" onClick={renderProps.onClick} />
          )}
        />
        <Line />
        <Or>or</Or>
      </Intro>
      {action === 'signUp' && (
        <form onSubmit={onSignup}>
          <Input placeholder="Email" {...email} type="email" />
          <Input placeholder="First name" {...firstName} />
          <Input placeholder="Last name" {...lastName} />
          <Input placeholder="Username" {...username} />
          <Input placeholder="Password" {...password} type="password" />
          <Button text="Sign up" />
        </form>
      )}
      {action === 'signUpFb' && (
        <form onSubmit={onSignup}>
          <Input placeholder="First name" {...firstName} />
          <Input placeholder="Last name" {...lastName} />
          <Input placeholder="Username" {...username} />
          <Button text="Sign up" />
        </form>
      )}

      <Guide>
        {`By signing up, you agree to our `}
        <a href="#">Terms, Data Policy and Cookies Policy</a>.
      </Guide>
    </>
  );
};
