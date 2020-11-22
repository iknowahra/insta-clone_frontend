import { gql } from '@apollo/client';

export default gql`
  query search($term: String!) {
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
    searchUser(term: $term) {
      avatar
      userName
      amIFollowing
      itsMe
    }
  }
`;
