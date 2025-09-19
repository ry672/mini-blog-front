import React from "react";
import { IPost } from "../../store/Api/PostApi";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: IPost;
  clickable?: boolean; // чтобы сделать карточку кликабельной (на главной)
}

export const PostCard: React.FC<PostCardProps> = ({ post, clickable = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate(`/posts/${post.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition-transform ${
        clickable ? "cursor-pointer hover:scale-[1.01]" : ""
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-base text-gray-600 my-2">{post.content}</p>

      {post.images.length > 0 && (
        <img
          src={`http://localhost:5000${post.images[0]}`}
          alt="Post"
          className="w-full max-w-md rounded-md max-h-60 object-cover"
        />
      )}

      <div className="mt-2 text-sm text-gray-500">Лайков: {post.likesCount}</div>
    </div>
  );
};

