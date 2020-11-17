/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

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

export default () => {
  return (
    <>
      <form>
        <Input placeholder="Username, or email" />
        <Input placeholder="Password" />
        <Button text="Log In" />
      </form>
      <Facebook>
        <Line />
        <Or>or</Or>
        <a href="#">
          <img
            alt="fbLogo"
            src="https://i.pinimg.com/originals/30/99/af/3099aff4115ee20f43e3cdad04f59c48.png"
          />
          Log in with Facebook
        </a>
        <a href="#">Forget password?</a>
      </Facebook>
    </>
  );
};
