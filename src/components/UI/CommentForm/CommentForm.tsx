import React, { useState } from "react";

interface CommentFormProps {
  postId: number;
  onCommentCreated: () => void; // Коллбек после успешного создания комментария
  createComment: (arg: { postId: number; content: string }) => Promise<any>;
  isLoading: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentCreated, createComment, isLoading }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment({ postId, content });
      setContent("");
      onCommentCreated();
    } catch {
      alert("Ошибка при добавлении комментария");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Ваш комментарий"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
        style={{ width: "100%", padding: 10 }}
      />
      <button type="submit" disabled={isLoading || !content.trim()} style={{ marginTop: 10 }}>
        {isLoading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
};
