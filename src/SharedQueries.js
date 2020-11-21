import { gql } from '@apollo/client';

export const GET_MYPROFILE = gql`
  query myProfile {
    myProfile {
      user {
        userName
      }
    }
  }
`;
