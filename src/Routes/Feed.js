import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Loader from '../Components/Loader';
import Post from './Post/index';
import { Photos } from '../Components/Icons';

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

const NoPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  svg {
    width: 80px;
    height: 80px;
    padding: 15px;
    border: 3px solid black;
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;

const Head = styled.span`
  font-size: 28px;
  font-weight: 300;
  display: inline-block;
  text-align: center;
`;

const MyLink = styled(Link)`
  margin-top: 20px;
`;
const ExploreButton = styled.span`
  background-color: ${(props) => props.theme.blueColor};
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
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
        {!loading && data && !data.seeFeed.length && (
          <NoPost>
            <Photos />
            <Head>No Posts Yet</Head>
            <MyLink to="/explore">
              <ExploreButton>You wanna explore?</ExploreButton>
            </MyLink>
          </NoPost>
        )}
      </Wrapper>
    </>
  );
};
