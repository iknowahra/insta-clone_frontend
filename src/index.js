import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Client from './Apollo/Client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
