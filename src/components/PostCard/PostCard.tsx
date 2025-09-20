import React from "react";
import { IPost, useLikePostMutation } from "../../store/Api/PostApi";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../store/Api/UserApi";
import defaultAvatar from "../../images/user-front-side-with-white-background.jpg";

import likeIcon from '../../images/like-svgrepo-com.svg';
import likeFilledIcon from '../../images/like-placeholder-svgrepo-com.svg';

interface PostCardProps {
  post: IPost;
  clickable?: boolean;
  hideUserInfo?: boolean; // новый проп
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  clickable = false,
  hideUserInfo = false,
}) => {
  const navigate = useNavigate();
  const [likePost, { isLoading }] = useLikePostMutation();
  const { data: user } = useGetUserByIdQuery(post.userId, {skip: hideUserInfo});

  const handleLike = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (isLoading) return;
    try {
      await likePost(post.id).unwrap();
    } catch (err) {
      console.error("Ошибка при лайке:", err);
    }
  };

  const handleClick = () => {
    if (clickable) navigate(`/posts/${post.id}`);
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (user && !hideUserInfo) navigate(`/users/${user.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition-transform ${
        clickable ? "cursor-pointer hover:scale-[1.01]" : ""
      }`}
    >
      {!hideUserInfo && user && (
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleProfileClick}
        >
          <img
            src={user.profile_photo ? `http://localhost:5000${user.profile_photo}` : defaultAvatar}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-gray-600 font-bold">{user.username}</span>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-base text-gray-600 my-2">{post.content}</p>

      {post.images?.length > 0 && (
        <img
          src={`http://localhost:5000${post.images[0]}`}
          alt="Post"
          className="w-full max-w-md rounded-md max-h-60 object-cover"
        />
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <img
            src={post.likedByUser ? likeFilledIcon : likeIcon}
            alt={post.likedByUser ? "Liked" : "Not liked"}
            onClick={handleLike}
            className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
              post.likedByUser ? "filter-none" : "grayscale"
            }`}
          />
          <span className="text-sm text-gray-600">{post.likesCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
};









