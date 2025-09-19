import { CommentsListProps } from "../store/Api/Commentapi";
import defaultAvatar from "../images/user-front-side-with-white-background.jpg";
import { DeleteCommentButton } from "../components/UI/CommentButton/CommentButton";
import { useGetMeQuery } from "../store/Api/UserApi";

export const CommentsList = ({ comments }: CommentsListProps) => {
  const { data: user, isLoading: userLoading } = useGetMeQuery();

  if (comments.length === 0) return <p>Комментариев пока нет</p>;

  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-row justify-start items-center m-5 border border-gray-200 p-2 rounded-[10px]"
        >
          <img
            src={comment.author?.profile_photo || defaultAvatar}
            alt="Аватар"
            className="w-10 h-10 rounded-full object-cover mr-4"
          />
          <div className="flex-1">
            <span className="text-base font-medium text-gray-800">
              {comment.author?.username || "Имя пользователя не указано"}
            </span>
            <p className="text-gray-600">{comment.content}</p>
          </div>
          {!userLoading && user && user.id === comment.userId && (
            <div className="ml-4">
              <DeleteCommentButton commentId={comment.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};





