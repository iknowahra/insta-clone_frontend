import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import Input from './Input';
import SearchContainer from '../Routes/Search/Container';
import useInput from '../Hooks/EnterInput';
import { GET_MYPROFILE } from '../SharedQueries';
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
  z-index: 2;
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
  &.searchTool {
    position: relative;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px 20px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
    text-align: center;
  }
  &:focus {
    ::placeholder {
      text-align: left;
    }
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Component = ({ isLoggedIn, history }) => {
  const search = useInput('');
  const { data, loading } = useQuery(GET_MYPROFILE);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const { keyCode } = e;
    if (keyCode === 13) {
      if (search.value[0] === '#') {
        const term = search.value.slice(1);
        history.push(`/search?term=${term}`);
      }
      search.setValue('');
    }
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
          <HeaderColumn className="searchTool">
            <form onSubmit={onSearchSubmit}>
              <SearchInput {...search} placeholder="🔍 Search" />
              <SearchContainer term={search.value} setTerm={search.setValue} />
            </form>
          </HeaderColumn>
          <HeaderColumn>
            <HeaderLink to="/#">
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
              <HeaderLink
                to={data ? `/profile/${data.myProfile.user.userName}` : '/#'}
              >
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
