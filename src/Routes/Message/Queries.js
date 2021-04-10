import { gql } from '@apollo/client';

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    id
    userName
    avatar
    itsMe
    name
  }
`;

export const CORE_COMMENT_FIELDS = gql`
  fragment CoreCommentFields on Comment {
    id
    text
    userId
    userName
    avatar
    createdAt
  }
`;

export const FULL_POST_FIELDS = gql`
  fragment FullPostFields on Post {
    id
    location
    caption
    likeCount
    amILiking
    fileCount
    createdAt
    updatedAt
    commentCount
    files {
      id
      url
    }
    comments {
      ...CoreCommentFields
    }
  }
  ${CORE_COMMENT_FIELDS}
`;

export const FULL_USER_FIELDS = gql`
  fragment FullUserFields on User {
    ...CoreUserFields
    amIFollowing
    bio
    followersCount
    followingCount
    postCount
    followers {
      ...CoreUserFields
    }
    following {
      ...CoreUserFields
    }
  }
  ${CORE_USER_FIELDS}
`;

export const GET_MYROOMS = gql`
  query seeRooms {
    seeRooms {
      id
      participants {
        ...CoreUserFields
      }
      messages {
        id
        text
        createdAt
      }
      createdAt
    }
  }
  ${CORE_USER_FIELDS}
`;

export const SUB_MESSAGE = gql`
  subscription newMessage($roomId: Int!) {
    newMessage(roomId: $roomId) {
      id
      text
      createdAt
      user {
        id
        userName
        avatar
      }
    }
  }
`;

export const GET_MESSAGE = gql`
  query getMessage($roomId: Int!) {
    getMessage(roomId: $roomId) {
      id
      text
      createdAt
      user {
        id
        userName
        avatar
        itsMe
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: Int!, $text: String!) {
    sendMessage(roomId: $roomId, text: $text) {
      id
      text
      createdAt
      user {
        id
        userName
        avatar
      }
    }
  }
`;

export const SEARCH_ROOM = gql`
  query searchRoom($term: String!) {
    searchRoom(term: $term) {
      id
      participants {
        ...CoreUserFields
      }
      messages {
        id
        text
        createdAt
      }
      createdAt
    }
  }
  ${CORE_USER_FIELDS}
`;

export const MAKE_ROOM = gql`
  mutation makeRoom($toIds: [Int!]!, $name: String) {
    makeRoom(toIds: $toIds, name: $name) {
      ok
      duplication
      error
      room {
        id
        createdAt
        participants {
          ...CoreUserFields
        }
        messages {
          id
          text
          createdAt
        }
      }
    }
  }
  ${CORE_USER_FIELDS}
`;

export const GET_MYPROFILE = gql`
  query myProfile {
    myProfile {
      user {
        ...FullUserFields
        friends {
          ...CoreUserFields
        }
      }
      posts {
        ...FullPostFields
        user {
          ...CoreUserFields
        }
      }
    }
  }
  ${FULL_USER_FIELDS}
  ${FULL_POST_FIELDS}
  ${CORE_USER_FIELDS}
`;
