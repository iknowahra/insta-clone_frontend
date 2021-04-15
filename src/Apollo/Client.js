import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';

import {
  isLogginVar,
  isSearchVar,
  getUserNameVar,
  typeDefs,
} from './LocalState';

const httpLink = createHttpLink({
  uri: 'https://ahrastargram.herokuapp.com/graphql',
});
const wsLink = new WebSocketLink({
  uri: 'wss://ahrastargram.herokuapp.com/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('token') || '',
    },
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const cache = new InMemoryCache({
  typePolicies: {
    Home: {
      fields: {
        isLoggedIn: {
          read() {
            return isLogginVar();
          },
        },
        isSearchOpen: {
          read() {
            return isSearchVar();
          },
        },
        getUserName: {
          read() {
            return getUserNameVar();
          },
        },
      },
    },
  },
});

export default new ApolloClient({
  cache,
  link: splitLink,
  typeDefs,
});
