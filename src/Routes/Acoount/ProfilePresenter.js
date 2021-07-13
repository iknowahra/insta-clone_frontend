import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Avatar from '../../Components/Avatar';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  padding: 10px 70px;
  overflow-y: auto;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const LeftColumn = styled.div`
  min-width: 120px;
  font-size: 1.2em;
  font-weight: 400;
  text-align: end;
  padding: 8px 7px;
  margin-right: 25px;
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

    input[type='file'] {
      display: none;
    }
  }
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Link = styled.div`
  color: ${({ theme }) => theme.blueColor};
  :hover {
    cursor: pointer;
  }
  &.check {
    margin-left: 10px;
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.blueColor};
  :hover {
    cursor: pointer;
  }
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
  min-width: calc(100% - 200px);
  &::placeholder {
    font-size: 1.3em;
    font-weight: 200;
  }
`;

const TextArea = styled.textarea`
  width: calc(100% - 10px);
  height: 80%;
  border: 0;
  border: ${({ theme }) => theme.inputBorder};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.bgColor};
  font-size: 12px;
  padding: 9px 0 7px 8px;
  ::placeholder {
    font-size: 1.3em;
    font-weight: 200;
    color: ${({ theme }) => theme.darkGreyColor};
  }
`;

const Guide = styled.div`
  color: ${({ theme }) => theme.darkGreyColor};
  font-size: 0.8em;
  &.checkUser {
    margin-top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1em;
  }
  &.bioGuide {
    margin-top: 10px;
    margin-right: 10px;
  }
  &:first-child {
    display: flex;
    margin-left: 5px;
    margin-right: 2px;
    font-weight: 500;
  }
`;

const GuideTitle = styled.p`
  font-weight: 500;
  font-size: 1.2em;
  margin-bottom: 3px;
`;

const Submit = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const MyLoader = styled(Loader)`
  margin-left: 10px;
  display: flex;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${({ theme }) => theme.boxBorder};
`;

export default ({
  user,
  userName,
  firstName,
  lastName,
  bio,
  result,
  onCheckUsername,
  onChangeProfile,
  onChangeAvatar,
  changeProfileResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [newAvatar, setAvatar] = useState(null);
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    onChangeAvatar(file);
    fileReader.onload = (event) => {
      setAvatar(event.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (result) {
      setLoading(false);
      if (result?.error) {
        toast.error(
          'That username has been taken',
          'Please try other username.',
        );
      } else {
        setValid(true);
      }
    }
  }, [result]);

  useEffect(() => {
    setChange(true);
    if (userName.value) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [userName.value]);

  useEffect(() => {
    setSubmitting(false);
  }, [changeProfileResult]);

  return (
    <Wrapper>
      <Profile>
        <LeftColumn className="avatar">
          {newAvatar ? (
            <Img src={newAvatar} />
          ) : (
            <Avatar size="md" url={user.avatar} />
          )}
        </LeftColumn>
        <RightColumn className="vertical">
          <Title>{user.userName}</Title>

          <Label htmlFor="file-upload" className="upload">
            Change Profile Photo
          </Label>
          <input
            type="file"
            name="file"
            id="file-upload"
            accept="image/*"
            onChange={handleAvatar}
          />
        </RightColumn>
      </Profile>
      <Edit>
        <LeftColumn>Username</LeftColumn>
        <RightColumn>
          <MyInput placeholder={user.userName || 'Username'} {...userName} />
          {loading ? (
            <MyLoader size={15} />
          ) : (
            <Link
              className="check"
              onClick={() => {
                if (userName.value === user.userName) {
                  toast.error(`You're using '${userName.value}' now`);
                } else {
                  setLoading(true);
                  setChange(false);
                  onCheckUsername(userName.value);
                }
              }}
            >
              Check
            </Link>
          )}
          {!change && result?.ok && (
            <Guide className="checkUser">
              <Guide>{`'${userName.value}'`}</Guide> <Guide>is valid</Guide>
            </Guide>
          )}
        </RightColumn>
      </Edit>
      <Edit>
        <LeftColumn>First Name</LeftColumn>
        <MyInput placeholder={user.firstName || 'First Name'} {...firstName} />
      </Edit>
      <Edit>
        <LeftColumn>Last Name</LeftColumn>
        <MyInput placeholder={user.lastName || 'Last Name'} {...lastName} />
      </Edit>
      <Edit>
        <LeftColumn>Bio</LeftColumn>
        <RightColumn className="vertical">
          <TextArea placeholder={user.bio || 'Bio'} {...bio} type="text" />
          <Guide className="bioGuide">
            <GuideTitle>Personal Information </GuideTitle>
            {`Provide your personal information, even if the account is used for a
            business, a pet or something else. This won't be a part of your
            public profile.`}
          </Guide>
        </RightColumn>
      </Edit>
      <Submit>
        <LeftColumn />
        <RightColumn>
          <Button
            text="Submit"
            size={80}
            onClick={onChangeProfile}
            loading={submitting}
            disabled={
              userName.value
                ? !valid
                : !(
                    !!firstName.value ||
                    !!lastName.value ||
                    !!bio.value ||
                    !!newAvatar
                  )
            }
          />
        </RightColumn>
      </Submit>
    </Wrapper>
  );
};
