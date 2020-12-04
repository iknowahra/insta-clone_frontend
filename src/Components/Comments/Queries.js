import { gql } from '@apollo/client';

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: Int!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: Int!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      postId
      userName
      text
      createdAt
    }
  }
`;
