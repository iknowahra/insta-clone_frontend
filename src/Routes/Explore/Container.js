import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RANDOMFEED } from './Queries';
import Presenter from './Presenter';

export default () => {
  const { data, loading } = useQuery(GET_RANDOMFEED, { pollInterval: 500 });

  return <Presenter data={data} loading={loading} />;
};
