import React from 'react';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { LogoFbSmall } from '../../Components/Icons';

const Facebook = styled.div`
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  a {
    color: ${(props) => props.theme.darkBlueColor};
    :last-child {
      margin-top: 20px;
      font-size: 12px;
      font-weight: 400;
    }
    img {
      height: 16px;
      width: 16px;
      margin-right: 5px;
    }
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

export default ({
  email,
  password,
  secret,
  onLogin,
  onConfirm,
  action,
  responseFacebook,
}) => {
  return action === 'confirm' ? (
    <>
      <form onSubmit={onConfirm}>
        <Input placeholder="Email" {...email} type="email" />
        <Input placeholder="secret" {...secret} />
        <Button text="Confirm" />
      </form>
    </>
  ) : (
    <>
      <form onSubmit={onLogin}>
        <Input placeholder="Email" {...email} type="email" />
        <Input placeholder="Password" {...password} type="password" />
        <Button text="Log In" />
      </form>
      <FacebookLogin
        appId="250653766733527"
        autoLoad
        fields="name,email,picture"
        scope="public_profile,email"
        callback={(response) => responseFacebook(response)}
        render={(renderProps) => (
          <Facebook>
            <Line />
            <Or>or</Or>
            <a href="#" onClick={renderProps.onClick}>
              <LogoFbSmall />
              Log in with Facebook
            </a>
            <a href="#">Forget password?</a>
          </Facebook>
        )}
      />
    </>
  );
};
