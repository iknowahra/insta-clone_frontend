import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import Presenter from './Presenter';
import { SEARCH_USER } from './Queries';

const Container = ({ term, setTerm }) => {
  const { data, loading } = useQuery(SEARCH_USER, {
    skip: term === undefined || term[0] === '#',
    variables: { term },
  });

  return (
    <>
      {!loading && data && (
        <Presenter
          term={term}
          setTerm={setTerm}
          loading={loading}
          users={data.searchUser}
        />
      )}
    </>
  );
};

Container.propTypes = {
  term: PropTypes.string.isRequired,
  setTerm: PropTypes.func.isRequired,
};

export default Container;
