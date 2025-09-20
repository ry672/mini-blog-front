import React, { useState } from "react";
import { useGetMeQuery, useUploadAvatarMutation } from "../../store/Api/UserApi";
import { useGetPostsByUserIdQuery, IPost } from "../../store/Api/PostApi";
import defaultAvatar from "../../images/user-front-side-with-white-background.jpg";
import { PostCard } from "../../components/PostCard/PostCard";

import locationBt from "../../images/location-pin-svgrepo-com.svg";
import phoneBt from "../../images/phone-svgrepo-com.svg";
import emailBt from "../../images/email-svgrepo-com.svg";



export const ProfilePage = () => {
  const { data: user, error: userError, isLoading: userLoading, refetch } = useGetMeQuery();
  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: userPosts, isLoading: postsLoading, error: postsError } =
    useGetPostsByUserIdQuery(user?.id ?? 0, { skip: !user?.id });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await uploadAvatar(formData).unwrap();
      setSelectedFile(null);
      refetch();
    } catch (e) {
      console.error("Неизвестная ошибка при загрузке аватара:", e);
    }
  };

  if (userLoading) return <div className="p-6 text-center text-gray-500">Загрузка профиля...</div>;
  if (userError && !user) return <div className="p-6 text-center text-red-500">Ошибка загрузки профиля</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-6">
      {/* Профиль с градиентом */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}?t=${user.updatedAt}` : defaultAvatar}
              alt="Аватар"
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Контент профиля с padding-top под аватар */}
        <div className="pt-20 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name} {user?.surname}</h2>
          <span className="text-indigo-600 font-medium">{user?.username}</span>
          <div className="p-5 flex flex-col items-center gap-[20px]">
            <div className="flex text-center items-center gap-[10px]"><img src={emailBt} alt="email" className="w-5 h-5"/><span className="text-gray-700"> {user?.email}</span></div>
            <div className="flex text-center items-center gap-[10px]"><img src={phoneBt} alt="phone" className="w-5 h-5"/><span className="text-gray-700"> {user?.phone_number}</span></div>
            <div className="flex text-center items-center gap-[10px]"><img src={locationBt} alt="location" className="w-5 h-5" /><span className="text-gray-700"> {user?.city}</span></div>

          </div>
          {/* Загрузка аватара */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
            >
              {uploading ? "Загрузка..." : "Загрузить аватар"}
            </button>
          </div>
        </div>
      </div>

      {/* Посты */}
      <section className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Мои посты</h3>

        {postsLoading && <p className="text-gray-500">Загрузка постов...</p>}
        {postsError && !postsLoading && <p className="text-red-500">Ошибка загрузки постов</p>}
        {!postsLoading && userPosts?.length === 0 && <p className="text-gray-500">У вас пока нет постов.</p>}

        <div className="flex flex-col gap-6">
          {userPosts?.map((post: IPost) => (
            <PostCard key={post.id} post={post} clickable hideUserInfo />
          ))}
        </div>
      </section>
    </div>
  );
};


















