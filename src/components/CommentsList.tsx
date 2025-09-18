// src/components/CommentsList.tsx
import { useGetCommentsByPostIdQuery } from "../store/Api/Commentapi";

interface IComment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    username?: string;
  };
}

export const CommentsList = ({ postId }: { postId: number }) => {
  const {
    data: comments = [],
    isLoading,
    error,
  } = useGetCommentsByPostIdQuery(postId);

  if (isLoading) return <p>Загрузка комментариев...</p>;
  if (error) return <p>Ошибка при загрузке комментариев</p>;

  return (
    <div style={{ marginTop: "15px", paddingLeft: "15px", borderLeft: "2px solid #ddd" }}>
      <h4>Комментарии:</h4>
      {comments.length === 0 && <p>Нет комментариев</p>}
      {comments.map((comment: IComment) => (
        <div key={comment.id} style={{ marginBottom: "10px" }}>
          
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

