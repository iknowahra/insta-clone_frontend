import { gql } from '@apollo/client';

export default gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      user {
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
        followersCount
        followingCount
        postCount
        fullName
      }
      posts {
        id
        caption
        location
        files {
          url
        }
        comments {
          id
          text
          userId
          userName
          createdAt
        }
        likeCount
        fileCount
        commentCount
        createdAt
        updatedAt
        amILiking
      }
    }
  }
`;
