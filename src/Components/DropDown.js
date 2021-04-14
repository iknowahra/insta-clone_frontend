import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from './Avatar';
import FatText from './FatText';
import Loader from './Loader';
import { basicAvatarUrl } from './Icons';
import { isSearchVar } from '../Apollo/LocalState';

const Wrapper = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: ${(props) => props.theme.boxBorder};
  }
  .noResult {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 0 30px;
  }
`;
const UserCard = styled(Link)`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.blackColor};
  &:hover {
    outline: none;
  }
`;

const UserCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  .username {
    margin-bottom: 3px;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export default ({ users, loading, setTerm }) => {
  const IsSearchOpen = useReactiveVar(isSearchVar);
  return (
    <>
      {loading && <Loader />}
      {!loading && users && !users.length && (
        <Wrapper>
          <FatText className="noResult" text="No results found." />
        </Wrapper>
      )}
      {!loading &&
        IsSearchOpen &&
        users &&
        users.map((user) => (
          <Wrapper
            key={user.userName}
            onClick={() => {
              setTerm('');
            }}
          >
            <UserCard to={`/profile/${user.userName}`}>
              <UserCardColumn>
                <Avatar size="sm" url={user.avatar || basicAvatarUrl} />
              </UserCardColumn>
              <UserCardColumn>
                <FatText className="username" text={user.userName} />
                {`${user.bio.slice(0, 20)}${
                  user.bio.length >= 20 ? '...' : ''
                }`}
              </UserCardColumn>
            </UserCard>
          </Wrapper>
        ))}
    </>
  );
};
