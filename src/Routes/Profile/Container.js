import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { isLogginVar } from '../../Apollo/LocalState';
import SEE_USER from './Queries';
import Presenter from './Presenter';

export default withRouter(({ match: { params } }) => {
  const { data, loading } = useQuery(SEE_USER, {
    variables: { userName: params.username },
  });
  const onLogOut = () => {
    localStorage.removeItem('token');
    isLogginVar(localStorage.getItem('token'));
    console.log('profile token check', localStorage.getItem('token'));
  };
  return <Presenter data={data} loading={loading} onLogOut={onLogOut} />;
});
