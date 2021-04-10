import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import { SEARCH_POST } from './Search/Queries';
import FatText from '../Components/FatText';
import Loader from '../Components/Loader';
import { basicAvatarUrl, Photos } from '../Components/Icons';
import SquarePost from '../Components/SquarePost';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 25px;
  margin-left: 10px;
  .postHeader {
    margin-bottom: 20px;
    color: ${(props) => props.theme.footerGreyColor};
  }
`;

const Header = styled.header`
  margin: 30px auto 80px auto;
  align-items: center;
  display: flex;
`;

const HeaderColumn = styled.div`
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: ${(props) => props.theme.boxBorder};
  }
  .postCount {
    font-size: 16px;
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
  &:first-child {
    margin-right: 50px;
  }
`;

const Head = styled.div`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 10px;
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
  padding-left: 15px;
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

export default withRouter(({ location: { search } }) => {
  const term = search.split('=')[1];
  const { data, loading } = useQuery(SEARCH_POST, {
    skip: term === undefined,
    variables: { term },
  });
  const postCount = (!loading && data && data.searchPost.length) || 0;
  const randomPick = Math.floor(Math.random() * postCount);

  return (
    <>
      {loading && <Loader />}
      {term === undefined && (
        <Wrapper>
          <FatText text="Please search a word" />
        </Wrapper>
      )}
      {!loading && data && (
        <Wrapper>
          <Header>
            <HeaderColumn>
              {data.searchPost.length === 0 ? (
                <img src={basicAvatarUrl} alt="" />
              ) : (
                <img
                  src={data.searchPost[randomPick].files[0].url}
                  alt={data.searchPost[randomPick].caption}
                />
              )}
            </HeaderColumn>
            <HeaderColumn>
              <Head># {term}</Head>
              {!loading && data && (
                <>
                  <FatText
                    text={`${data.searchPost.length}`}
                    className="postCount"
                  />
                  <span className="postCount">
                    {data?.searchPost?.length > 1 ? `posts` : 'post'}
                  </span>
                </>
              )}
            </HeaderColumn>
          </Header>

          {data?.searchPost?.length === 0 ? (
            <NoPost>
              <Photos />
              <Head>No Posts Yet</Head>
            </NoPost>
          ) : (
            <Main>
              <div className="postHeader">
                <FatText text="Most Recent" />
              </div>
              <PostSection>
                {data?.searchPost?.map((post, index) => {
                  if (index < 10) {
                    return (
                      <SquarePost
                        key={post.id + post.likeCount}
                        {...post}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount}
                        url={post.files[0].url}
                      />
                    );
                  }
                })}
                {data.searchPost.length >= 10 && (
                  <>
                    <div className="postHeader">
                      <FatText text="Top Posts" />
                    </div>
                    {data.searchPost?.map((post, index) => {
                      if (index >= 10) {
                        return (
                          <SquarePost
                            key={post.id + post.likeCount}
                            {...post}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            url={post.files[0].url}
                          />
                        );
                      }
                    })}
                  </>
                )}
              </PostSection>
            </Main>
          )}
        </Wrapper>
      )}
    </>
  );
});
