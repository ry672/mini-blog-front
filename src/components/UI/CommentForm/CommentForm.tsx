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
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }} className="m-5">
      <textarea
       
        placeholder="Ваш комментарий"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
        className="bg-gray-100 rounded border border-gray-400 leading-normal w-full h-28 p-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
      ></textarea>
      <button type="submit" disabled={isLoading || !content.trim()} className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg">
        {isLoading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
};
