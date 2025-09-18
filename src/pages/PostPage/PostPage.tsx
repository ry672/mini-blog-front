// src/pages/PostPage.tsx
import React, { useState } from "react";
import { useGetPostByIdQuery } from "../../store/Api/PostApi";
import { useGetCommentsByPostIdQuery, useCreateCommentMutation } from "../../store/Api/Commentapi";
import { useParams } from "react-router-dom";

export const PostPage: React.FC = () => {
  // Получаем postId из URL параметров (useParams всегда возвращает строку)
  const { postId } = useParams<{ postId: string }>();

  // Приводим postId к числу
  const numericPostId = Number(postId);

  const { data: post, isLoading: postLoading, error: postError } = useGetPostByIdQuery(numericPostId);
  const {
    data: comments = [],
    isLoading: commentsLoading,
    error: commentsError,
    refetch,
  } = useGetCommentsByPostIdQuery(numericPostId);
  const [createComment, { isLoading: creatingComment, error: createError }] = useCreateCommentMutation();

  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment({ postId: numericPostId, content }).unwrap();
      setContent("");
      refetch();
    } catch (err) {
      console.error("Ошибка при создании комментария", err);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      {/* Пост сверху */}
      {postLoading && <p>Загрузка поста...</p>}
      {postError && <p style={{ color: "red" }}>Ошибка загрузки поста</p>}
      {post && (
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 20, marginBottom: 30 }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.images.length > 0 && (
            <div style={{ marginTop: 10 }}>
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000${img}`}
                  alt={`Изображение поста ${idx + 1}`}
                  style={{ maxWidth: "100%", marginBottom: 10 }}
                />
              ))}
            </div>
          )}
          <small>Опубликовано: {new Date(post.createdAt).toLocaleString()}</small>
          <br />
          <small>Лайков: {post.likesCount}</small>
        </div>
      )}

      {/* Форма создания комментария */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Напишите комментарий..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={creatingComment}
          style={{ width: "100%", padding: 10, fontSize: 16 }}
        />
        <button type="submit" disabled={creatingComment || !content.trim()} style={{ marginTop: 10 }}>
          {creatingComment ? "Отправка..." : "Отправить"}
        </button>
        {createError && <p style={{ color: "red" }}>Ошибка при отправке комментария</p>}
      </form>

      {/* Список комментариев */}
      {commentsLoading && <p>Загрузка комментариев...</p>}
      {commentsError && <p style={{ color: "red" }}>Ошибка при загрузке комментариев</p>}

      {comments.length === 0 && <p>Комментариев пока нет</p>}
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            borderRadius: 4,
            marginBottom: 15,
          }}
        >
          <p>{comment.content}</p>
          <small>
            {comment.user?.username ? `Автор: ${comment.user.username}` : `User ID: ${comment.userId}`} |{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

