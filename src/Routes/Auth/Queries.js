/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation loginEmail($email: String!, $password: String!) {
    loginEmail(email: $email, password: $password) {
      token
      error
      user {
        id
        email
        firstName
        lastName
        userName
        avatar
        confirmSecret
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation createAccount(
    $userName: String!
    $email: String!
    $name: String
    $facebookId: String
    $password: String
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      userName: $userName
      password: $password
      email: $email
      name: $name
      facebookId: $facebookId
      firstName: $firstName
      lastName: $lastName
    ) {
      ok
      error
    }
  }
`;

export const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email) {
      ok
      error
    }
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email) {
      ok
      error
    }
  }
`;

export const LOG_IN_FB = gql`
  mutation loginFb($email: String!, $facebookId: String!) {
    loginFb(email: $email, facebookId: $facebookId) {
      token
      error
      user {
        id
        email
        firstName
        lastName
        userName
        avatar
        confirmSecret
      }
    }
  }
`;

export const CHECK_USER = gql`
  query checkUser($userName: String, $email: String) {
    checkUser(userName: $userName, email: $email) {
      ok
      error
    }
  }
`;
