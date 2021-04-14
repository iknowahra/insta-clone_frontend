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

const Header = styled.header`
  margin-bottom: 80px;
  padding-left: 60px;
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
    margin-right: 90px;
  }
`;

const User = styled.div`
  margin-bottom: 28px;
  display: flex;
`;
const Head = styled.span`
  font-size: 28px;
  font-weight: 300;
  margin-right: 20px;
`;

const Count = styled.div`
  font-size: 16px;
  margin-bottom: 28px;
`;

const CountColumn = styled.span`
  margin-right: 40px;
`;

const CountUnit = styled.span`
  margin-left: 5px;
`;

const Detail = styled.div`
  font-size: 16px;
`;

const Bio = styled.p`
  margin-top: 10px;
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
  border-top: ${(props) => props.theme.boxBorder};
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

export default ({ data, loading, onLogOut }) => {
  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading && data?.seeUser && (
        <>
          <Header>
            <HeaderColumn>
              <img
                src={
                  data.seeUser.user.avatar ||
                  'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1'
                }
                alt={data.seeUser.user.userName}
              />
            </HeaderColumn>
            <HeaderColumn>
              <User>
                <Head>{data.seeUser.user.userName}</Head>
                {!data.seeUser.user.itsMe && (
                  <FollowButton
                    amIFollowing={data.seeUser.user.amIFollowing}
                    id={data.seeUser.user.id}
                    size={96}
                  />
                )}
                {data.seeUser.user.itsMe && (
                  <Button text="Log out" onClick={onLogOut} />
                )}
              </User>

              <Count>
                <CountColumn>
                  <FatText text={`${data.seeUser.user.postCount}`} />
                  <CountUnit>posts</CountUnit>
                </CountColumn>
                <CountColumn>
                  <FatText text={`${data.seeUser.user.followersCount}`} />
                  <CountUnit>followers</CountUnit>
                </CountColumn>
                <CountColumn>
                  <FatText text={`${data.seeUser.user.followingCount}`} />
                  <CountUnit>following</CountUnit>
                </CountColumn>
              </Count>
              <Detail>
                <FatText text={data.seeUser.user.fullName} />
                <Bio>{data.seeUser.user.bio}</Bio>
              </Detail>
            </HeaderColumn>
          </Header>
          <Main>
            {data.seeUser.posts && data.seeUser.posts.length === 0 ? (
              <NoPost>
                <Photos />
                <Head>No Posts Yet</Head>
              </NoPost>
            ) : (
              <PostSection>
                {data.seeUser.posts.map((post) => (
                  <SquarePost
                    id={post.id}
                    user={data.seeUser.user}
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
