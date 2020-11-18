import React from 'react';
import styled from 'styled-components';

import LogIn from './LoginPresenter';
import SignUp from './SignupPresenter';

const Wrapper = styled.div`
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.a`
  color: ${(props) => props.theme.blueColor};
`;

const Form = styled(Box)`
  padding: 30px;

  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const Logo = styled.a`
  img {
    width: 185px;
    height: auto;
  }
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  password,
  email,
  secret,
  setAction,
  onLogin,
  onSignup,
  onConfirm,
}) => {
  return (
    <Wrapper>
      <Form>
        <Logo>
          <img
            alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
          />
        </Logo>
        {action === 'signUp' ? (
          <SignUp
            email={email}
            password={password}
            username={username}
            firstName={firstName}
            lastName={lastName}
            onSignup={onSignup}
          />
        ) : (
          <LogIn
            email={email}
            password={password}
            secret={secret}
            onLogin={onLogin}
            onConfirm={onConfirm}
            action={action}
          />
        )}
      </Form>
      <StateChanger>
        {action === 'signUp' ? (
          <>
            Have an account?{' '}
            <Link onClick={() => setAction('logIn')}>Log in</Link>
          </>
        ) : action === 'logIn' ? (
          <>
            Don't have an account?{' '}
            <Link onClick={() => setAction('signUp')}>Sign up</Link>
          </>
        ) : (
          <>Check your email for secret</>
        )}
      </StateChanger>
    </Wrapper>
  );
};
