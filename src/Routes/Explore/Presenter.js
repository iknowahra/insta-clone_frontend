import React from 'react';
import styled from 'styled-components';
import { isLogginVar } from '../../Apollo/LocalState';
import Button from '../../Components/Button';
import FollowButton from '../../Components/FollowButton';
import SquarePost from '../../Components/SquarePost';
import Loader from '../../Components/Loader';
import FatText from '../../Components/FatText';
import { Photos } from '../../Components/Icons';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 25px;
  margin-left: 10px;
`;

const Head = styled.span`
  font-size: 28px;
  font-weight: 300;
  margin-right: 20px;
`;

const NoPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    width: 80px;
    height: 80px;
    padding: 15px;
    border: 3px solid black;
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;

const Main = styled.div`
  padding: 50px 15px;
`;

const Selector = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(3, 260px);
  grid-template-rows: 260px;
  grid-auto-rows: 260px;
`;

const PostSection = styled(Selector)`
  grid-template-columns: repeat(3, 290px);
  grid-template-rows: 290px;
  grid-auto-rows: 290px;
`;

export default ({ data, loading }) => {
  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading && data?.seeRandomFeed && (
        <>
          <Main>
            {data?.seeRandomFeed?.posts?.length === 0 ? (
              <NoPost>
                <Photos />
                <Head>No Posts Yet</Head>
              </NoPost>
            ) : (
              <PostSection>
                {data?.seeRandomFeed?.map((post) => (
                  <SquarePost
                    id={post.id}
                    user={post.user}
                    key={post.caption + post.likeCount}
                    fileCount={post.fileCount}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    comments={post.comments}
                    files={post.files}
                    url={post.files[0].url}
                    caption={post.caption}
                    amILiking={post.amILiking}
                    createdAt={post.createdAt}
                    location={post.location}
                  />
                ))}
              </PostSection>
            )}
          </Main>
        </>
      )}
    </Wrapper>
  );
};
