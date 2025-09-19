import React from "react";
import { useDeleteCommentMutation } from "../../../store/Api/Commentapi";
import deleteCommentB from "../../../images/delete-1-svgrepo-com.svg";
interface DeleteCommentButtonProps {
  commentId: number;
}

export const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({ commentId }) => {
  const [deleteComment, { isLoading}] = useDeleteCommentMutation();

  const handleDelete = async () => {
    try {
      await deleteComment(commentId).unwrap();
      
    } catch (err) {
      console.error("Ошибка при удалении комментария:", err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className=""
      
    > 
      <img src={deleteCommentB} alt="cbt" className="w-6 h-5"/>
      
    </button>
  );
};

