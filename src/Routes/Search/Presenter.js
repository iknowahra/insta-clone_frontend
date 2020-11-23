import React, { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DropDown from '../../Components/DropDown';
import { isSearchVar } from '../../Apollo/LocalState';

const Wrapper = styled.div`
  text-align: center;
`;

const SearchFrame = styled.div`
  max-height: 362px;
  width: 245px;
  overflow-x: hidden;
  overflow-y: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 25px;
  left: 30px;
  z-index: 3;
  ${(props) => props.theme.whiteBox};
`;

const SearchConnect = styled.div`
  ::after {
    border-color: transparent transparent rgba(var(--d87, 255, 255, 255), 1)
      transparent;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    content: ' ';
    height: 0;
    top: 40px;
    left: 110px;
    position: absolute;
    top: 10px;
    width: 0;
    z-index: 5;
  }
`;

const Presenter = ({ term, setTerm, users, loading }) => {
  const isSearchOpen = useReactiveVar(isSearchVar);

  useEffect(() => {
    if (term !== '') {
      isSearchVar(true);
    } else {
      isSearchVar(false);
    }
  }, [term]);

  return (
    <>
      {isSearchOpen && (
        <Wrapper>
          {!loading && users && (
            <>
              <SearchConnect />
              <SearchFrame>
                <DropDown users={users} setTerm={setTerm} loading={loading} />
              </SearchFrame>
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

Presenter.propTypes = {
  term: PropTypes.string,
  setTerm: PropTypes.func,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      userName: PropTypes.string.isRequired,
      amIFollowing: PropTypes.bool.isRequired,
      itsMe: PropTypes.bool.isRequired,
      bio: PropTypes.string,
    }),
  ).isRequired,
  loading: PropTypes.bool,
};

export default Presenter;
