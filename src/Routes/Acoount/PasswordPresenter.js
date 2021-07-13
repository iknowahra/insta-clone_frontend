import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '../../Components/Avatar';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding: 10px 50px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const LeftColumn = styled.div`
  min-width: 140px;
  font-size: 1.2em;
  font-weight: 400;
  text-align: end;
  padding: 8px 7px;
  margin-right: 20px;
  &.avatar {
    justify-content: flex-end;
    display: flex;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  &.vertical {
    flex-direction: column;
    align-items: normal;
  }
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Edit = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  align-items: center;
  padding: 7px 0px;
  &:nth-child(5) {
    height: 200px;
    align-items: normal;
  }
`;

const MyInput = styled(Input)`
  height: 100%;
  min-width: calc(100%);
  background-color: ${({ theme }) => theme.veryLightGreyColor};
  &::placeholder {
    font-size: 1.3em;
    font-weight: 200;
  }
`;

const Submit = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  &.submit {
    margin-top: 30px;
  }
`;

const Guide = styled.div`
  color: ${({ theme }) => theme.darkGreyColor};
  font-size: 1em;
`;

export default ({
  user,
  passwordOld,
  passwordNew,
  passwordConfirm,
  onChangePassword,
  changePasswordResult,
}) => {
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    console.log('click');
    setLoading(true);
    onChangePassword();
  };

  useEffect(() => {
    if (changePasswordResult) {
      setLoading(false);
    }
  }, [changePasswordResult]);

  return (
    <Wrapper>
      <Profile>
        <LeftColumn className="avatar">
          <Avatar size="md" url={user.avatar} />
        </LeftColumn>
        <RightColumn className="vertical">
          <Title>{user.userName}</Title>
        </RightColumn>
      </Profile>
      <Edit>
        <LeftColumn>Old Password</LeftColumn>
        <RightColumn>
          <MyInput placeholder="" type="password" {...passwordOld} />
        </RightColumn>
      </Edit>
      <Edit>
        <LeftColumn>New Password</LeftColumn>
        <RightColumn>
          <MyInput placeholder="" type="password" {...passwordNew} />
        </RightColumn>
      </Edit>
      <Edit>
        <LeftColumn>Confirm New Password</LeftColumn>
        <RightColumn>
          <MyInput placeholder="" type="password" {...passwordConfirm} />
        </RightColumn>
      </Edit>

      {passwordNew.value !== passwordConfirm.value && (
        <Submit>
          <LeftColumn />
          <RightColumn>
            <Guide>New password is not same as confirm new password</Guide>
          </RightColumn>
        </Submit>
      )}
      {passwordOld.value && passwordNew.value === passwordOld.value && (
        <Submit>
          <LeftColumn />
          <RightColumn>
            <Guide>New password is the same as the old one.</Guide>
          </RightColumn>
        </Submit>
      )}

      <Submit className="submit">
        <LeftColumn />
        <RightColumn>
          <Button
            text="Change Password"
            size={140}
            onClick={onSubmit}
            type="submit"
            disabled={
              loading ||
              passwordNew.value === passwordOld.value ||
              !passwordNew.value ||
              !passwordConfirm.value ||
              passwordNew.value !== passwordConfirm.value
            }
            loading={loading}
          />
        </RightColumn>
      </Submit>
    </Wrapper>
  );
};
