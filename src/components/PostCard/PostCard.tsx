import React, { useState } from "react";
import { IPost, useLikePostMutation } from "../../store/Api/PostApi";
import { useNavigate } from "react-router-dom";

// Импортируем обе иконки
import likeIcon from '../../images/like-svgrepo-com.svg';
import likeFilledIcon from '../../images/like-placeholder-svgrepo-com.svg';


interface PostCardProps {
  post: IPost;
  clickable?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, clickable = false }) => {
  const navigate = useNavigate();
  const [likePost, { isLoading }] = useLikePostMutation();
  

  const [liked, setLiked] = useState(post.likedByUser ?? false);
  const [likesCount, setLikesCount] = useState(post.likesCount ?? post.likedUserIds?.length ?? 0);

  const handleLike = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    if (isLoading) return;

    try {
      const res = await likePost(post.id).unwrap();

      setLiked(res.post.likedByUser ?? false);
      setLikesCount(res.post.likesCount ?? 0);
    } catch (err) {
      console.error("Ошибка при лайке:", err);
    }
  };

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

      <div className="flex items-center gap-3 mt-4">
        <img
          src={liked ? likeFilledIcon : likeIcon}
          alt={liked ? "Liked" : "Not liked"}
          onClick={handleLike}
          className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
            liked ? "filter-none" : "grayscale"
          }`}
        />
        <span className="text-sm text-gray-600">
          {likesCount}
        </span>
      </div>
    </div>
  );
};




