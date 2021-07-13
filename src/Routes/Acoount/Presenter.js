import React, { useState } from 'react';
import styled from 'styled-components';
import ProfilePresenter from './ProfilePresenter';
import PasswordPresenter from './PasswordPresenter';

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  margin-bottom: 25px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  border: ${(props) => props.theme.boxBorder};
`;
const CategoryWrapper = styled.div`
  width: 240px;
  min-width: 240px;
  height: 100%;
  border-right: ${(props) => props.theme.boxBorder};
`;

const Menu = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  padding: 0 30px;
  &:hover {
    background-color: ${({ theme }) => theme.veryLightGreyColor};
  }
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({
  user,
  userName,
  bio,
  passwordOld,
  passwordNew,
  passwordConfirm,
  firstName,
  lastName,
  onCheckUsername,
  onChangePassword,
  onChangeAvatar,
  onChangeProfile,
  changeEditResult,
  result,
}) => {
  const [action, setAction] = useState('Profile');
  return (
    <Wrapper>
      <CategoryWrapper>
        <Menu
          onClick={() => setAction('Profile')}
          style={
            action === 'Profile'
              ? {
                  borderLeft: '2px solid black',
                  fontWeight: '500',
                }
              : null
          }
        >
          Edit Profile
        </Menu>
        <Menu
          onClick={() => setAction('Password')}
          style={
            action === 'Password'
              ? {
                  borderLeft: '2px solid black',
                  fontWeight: '500',
                }
              : null
          }
        >
          Change Password
        </Menu>
      </CategoryWrapper>
      <Main>
        {action === 'Profile' ? (
          <ProfilePresenter
            user={user}
            userName={userName}
            bio={bio}
            firstName={firstName}
            lastName={lastName}
            onCheckUsername={onCheckUsername}
            onChangeProfile={onChangeProfile}
            onChangeAvatar={onChangeAvatar}
            changeProfileResult={changeEditResult}
            result={result}
          />
        ) : (
          <PasswordPresenter
            user={user}
            passwordOld={passwordOld}
            passwordNew={passwordNew}
            passwordConfirm={passwordConfirm}
            onChangePassword={onChangePassword}
            changePasswordResult={changeEditResult}
          />
        )}
      </Main>
    </Wrapper>
  );
};
