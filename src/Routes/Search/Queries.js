import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      avatar
      userName
      amIFollowing
      itsMe
      bio
    }
  }
`;

export const SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      caption
      location
      user {
        userName
      }
      files {
        url
      }
      likeCount
    }
  }
`;
