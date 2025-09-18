// src/pages/MainPage/MainPage.tsx
import styled from "styled-components";
import { useGetPostsQuery } from "../../store/Api/PostApi";
import { CommentsList } from "../../components/CommentsList";

interface IPost {
  id: number;
  title: string;
  content: string;
  images: string[];
  likesCount: number;
}

export const MainPage = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <Container>Загрузка постов...</Container>;
  if (error) return <Container>Ошибка загрузки постов</Container>;

  return (
    <Container>
      {posts?.map((post: IPost) => (
        <PostCard key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>

          {post.images.length > 0 && (
            <img
              src={`http://localhost:5000${post.images[0]}`}
              alt="Post"
              style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
            />
          )}

          <PostMeta>
            <span>Лайков: {post.likesCount}</span>
          </PostMeta>

          <CommentsList postId={post.id} />
        </PostCard>
      ))}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
`;

const PostCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: gray;
  margin-top: 10px;
`;

