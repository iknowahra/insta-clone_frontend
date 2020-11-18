import { ApolloClient, InMemoryCache } from '@apollo/client';
import { isLogginVar, resolvers, typeDefs } from './LocalState';

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
    authorization: localStorage.getItem('token'),
  },
  typeDefs,
  resolvers,
});
