import { makeVar, gql } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    isSearchOpen: Boolean!
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const isLogginVar = makeVar(!!localStorage.getItem('token'));

export const IS_SEACH_OPEN = gql`
  query IsSearchOpen {
    isSearchOpen @client
  }
`;

export const isSearchVar = makeVar(false);

export const GET_USER_NAME = gql`
  query getUserName {
    getUserName @client
  }
`;

export const getUserNameVar = makeVar('');
