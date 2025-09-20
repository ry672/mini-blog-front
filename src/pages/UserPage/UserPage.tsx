// pages/UserPage/UserPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../store/Api/UserApi";
import { useGetPostsByUserIdQuery, IPost } from "../../store/Api/PostApi";
import defaultAvatar from "../../images/user-front-side-with-white-background.jpg";
import { PostCard } from "../../components/PostCard/PostCard";

export const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  // Получаем пользователя по id
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  // Получаем посты пользователя
  const { data: userPosts, isLoading: postsLoading, error: postsError } =
    useGetPostsByUserIdQuery(userId, { skip: !userId });

  if (isLoading) return <div className="p-6 text-center text-gray-500">Загрузка профиля...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Ошибка загрузки профиля</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-6">
      {/* Профиль */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}` : defaultAvatar}
              alt="Аватар"
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Контент профиля с padding-top под аватар */}
        <div className="pt-20 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name} {user?.surname}</h2>
          <p className="text-indigo-600 font-medium">@{user?.username}</p>
          
        </div>
      </div>

      {/* Посты */}
      <section className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Посты пользователя</h3>

        {postsLoading && <p className="text-gray-500">Загрузка постов...</p>}
        {postsError && <p className="text-red-500">Ошибка загрузки постов</p>}
        {!postsLoading && userPosts?.length === 0 && <p className="text-gray-500">У пользователя пока нет постов.</p>}

        <div className="flex flex-col gap-6">
          {userPosts?.map((post: IPost) => (
            <PostCard key={post.id} post={post} clickable />
          ))}
        </div>
      </section>
    </div>
  );
};





