import { ApolloClient, InMemoryCache } from '@apollo/client';
import { isLogginVar, typeDefs } from './LocalState';

const cache = new InMemoryCache({
  typePolicies: {
    Home: {
      fields: {
        isLoggedIn: {
          read() {
            return isLogginVar();
          },
        },
      },
    },
  },
});

export default new ApolloClient({
  cache,
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  typeDefs,
});
