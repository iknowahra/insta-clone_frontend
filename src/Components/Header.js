import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Compass, HeartEmpty, User, Home, Airplain, LogoInsta } from './Icons';

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 0 3px 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
    img {
      width: 110px;
      height: auto;
    }
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const GET_MYPROFILE = gql`
  query myProfile {
    myProfile {
      user {
        userName
      }
    }
  }
`;

const Component = ({ isLoggedIn, history }) => {
  const search = useInput('');
  const { data, loading } = useQuery(GET_MYPROFILE);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    isLoggedIn && (
      <Header>
        <HeaderWrapper>
          <HeaderColumn>
            <Link to="/">
              <LogoInsta />
            </Link>
          </HeaderColumn>
          <HeaderColumn>
            <form onSubmit={onSearchSubmit}>
              <SearchInput {...search} placeholder="🔍 Search" />
            </form>
          </HeaderColumn>
          <HeaderColumn>
            <HeaderLink to="/home">
              <Home />
            </HeaderLink>
            <HeaderLink to="/messages">
              <Airplain />
            </HeaderLink>
            <HeaderLink to="/explore">
              <Compass />
            </HeaderLink>
            <HeaderLink to="/notifications">
              <HeartEmpty />
            </HeaderLink>
            {loading ? (
              <HeaderLink to="/#">
                <User />
              </HeaderLink>
            ) : (
              <HeaderLink to={data.myProfile.user.userName}>
                <User />
              </HeaderLink>
            )}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
    )
  );
};

export default withRouter(Component);
