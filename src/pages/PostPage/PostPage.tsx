import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../store/Api/PostApi";
import { useGetCommentsByPostIdQuery, useCreateCommentMutation } from "../../store/Api/Commentapi";
import { CommentsList} from "../../components/CommentsList";
import { CommentForm } from "../../components/UI/CommentForm/CommentForm";
import { PostCard } from "../../components/PostCard/PostCard";

export const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const id = Number(postId);

  const { data: post, isLoading: loadingPost, error: errorPost } = useGetPostByIdQuery(id);
  const { data: comments = [], refetch: refetchComments } = useGetCommentsByPostIdQuery(id);

  const [createComment, { isLoading: creatingComment }] = useCreateCommentMutation();

  if (loadingPost) return <p>Загрузка поста...</p>;
  if (errorPost) return <p>Ошибка загрузки поста</p>;

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      {post && <PostCard post={post} />}

  
      <CommentForm
        postId={id}
        createComment={createComment}
        isLoading={creatingComment}
        onCommentCreated={() => refetchComments()}
      />

      
      <CommentsList comments={comments} />
    </div>
  );
};




