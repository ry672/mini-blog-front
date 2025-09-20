import { CommentsListProps } from "../store/Api/Commentapi";
import defaultAvatar from "../images/user-front-side-with-white-background.jpg";
import { DeleteCommentButton } from "../components/UI/CommentButton/CommentButton";
import { useGetMeQuery } from "../store/Api/UserApi";
import { useNavigate } from "react-router-dom";

export const CommentsList = ({ comments }: CommentsListProps) => {
  const { data: me, isLoading } = useGetMeQuery();
  const navigate = useNavigate();

  if (comments.length === 0) return <p>Комментариев пока нет</p>;

  return (
    <div>
      {comments.map((comment) => {
        const isOwnComment = !isLoading && me && me.id === comment.userId;

        const handleAuthorClick = () => {
          if (!isOwnComment && comment.author) {
            navigate(`/users/${comment.author.id}`);
          }
        };

        return (
          <div
            key={comment.id}
            className="flex flex-row justify-start items-center m-5 border border-gray-200 p-2 rounded-[10px]"
          >
            <img
              src={comment?.author?.profile_photo ? `http://localhost:5000${comment.author.profile_photo}`: defaultAvatar}
              alt="Аватар"
              className={`w-10 h-10 rounded-full object-cover mr-4 cursor-pointer ${
                isOwnComment ? "" : "hover:opacity-80"
              }`}
              onClick={handleAuthorClick}
            />
            <div className="flex-1">
              <span
                className={`text-base font-medium text-gray-800 cursor-pointer ${
                  isOwnComment ? "" : "hover:underline"
                }`}
                onClick={handleAuthorClick}
              >
                {comment.author?.username || "Имя пользователя не указано"}
              </span>
              <p className="text-gray-600">{comment.content}</p>
            </div>
            {isOwnComment && (
              <div className="ml-4">
                <DeleteCommentButton commentId={comment.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};






