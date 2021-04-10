import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import Loader from '../Components/Loader';
import Post from './Post/index';

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      likeCount
      amILiking
      createdAt
      commentCount
      files {
        id
        url
      }
      comments {
        id
        text
        userId
        userName
        avatar
      }
      user {
        id
        userName
        avatar
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY, { pollInterval: 300 });

  return (
    <>
      <Wrapper>
        {loading && <Loader />}
        {!loading &&
          data &&
          data.seeFeed &&
          data.seeFeed.map((post) => {
            return (
              <Post
                key={post.id + post.createdAt}
                id={post.id}
                location={post.location}
                caption={post.caption}
                user={post.user}
                files={post.files}
                likeCount={post.likeCount}
                amILiking={post.amILiking}
                comments={post.comments}
                createdAt={post.createdAt}
                commentCount={post.commentCount}
              />
            );
          })}
      </Wrapper>
    </>
  );
};
