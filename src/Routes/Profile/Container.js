import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import SEE_USER from './Queries';
import Presenter from './Presenter';

export default withRouter(({ match: { params } }) => {
  const { data, loading } = useQuery(SEE_USER, {
    variables: { userName: params.username },
  });
  return <Presenter data={data} loading={loading} />;
});
