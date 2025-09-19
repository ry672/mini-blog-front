
import { CommentsListProps} from "../store/Api/Commentapi";



export const CommentsList = ({comments}: CommentsListProps) => {
  if (comments.length === 0) return <p>Комментариев пока нет</p>;

  return (
    <div style={{ marginTop: 15, paddingLeft: 15, borderLeft: "2px solid #ddd" }}>
      <h4>Комментарии:</h4>
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{ marginBottom: 10, padding: 10, border: "1px solid #eee", borderRadius: 5, backgroundColor: "#fafafa" }}
        >
          <img
            src={comment.author?.profile_photo || "http://localhost:5000${auth?.profile_photo}"} // путь по умолчанию
            alt="Аватар"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
          />
          <p>{comment.content}</p>
          <small style={{ color: "#666" }}>{comment.author?.username || "Имя пользователя не указано"}</small>
        </div>
      ))}
    </div>
  );
};



