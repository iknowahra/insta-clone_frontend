import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      id
      avatar
      userName
      amIFollowing
      itsMe
      bio
      followers {
        id
        userName
        avatar
      }
      following {
        id
        userName
        avatar
      }
    }
  }
`;

export const SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      caption
      location
      user {
        id
        userName
        avatar
      }
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;
