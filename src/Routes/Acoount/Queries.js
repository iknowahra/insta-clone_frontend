import { gql } from '@apollo/client';

export const EDIT_PROFILE = gql`
  mutation editUser(
    $userName: String
    $bio: String
    $avatar: String
    $password: String
    $firstName: String
    $lastName: String
  ) {
    editUser(
      userName: $userName
      bio: $bio
      avatar: $avatar
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      ok
      error
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
