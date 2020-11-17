/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

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

export default () => {
  return (
    <>
      <Intro>
        <p>Sign up to see photos and videos from your friends.</p>
        <Button text="Log in with Facebook" />
        <Line />
        <Or>or</Or>
      </Intro>

      <form>
        <Input placeholder="Email" />
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button text="Sign up" />
      </form>
      <Guide>
        {`By signing up, you agree to our `}
        <a href="#">Terms, Data Policy and Cookies Policy</a>.
      </Guide>
    </>
  );
};
