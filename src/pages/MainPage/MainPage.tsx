// src/pages/MainPage/MainPage.tsx

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetPostsQuery, IPost } from "../../store/Api/PostApi";
import { RootState } from "../../store/store";
import { Header } from "../../components/UI/Header/Header";
import { useNavigate } from "react-router-dom"; // <-- добавляем импорт


export const MainPage = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useGetPostsQuery(undefined, { skip: !accessToken });

  const navigate = useNavigate(); // <-- хук навигации

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <div className="text-center mt-8">Загрузка постов...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Ошибка загрузки постов</div>;

  const otherUsersPosts = posts?.filter((post) => post.userId !== currentUser?.id) ?? [];

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {otherUsersPosts.length === 0 ? (
          <p className="text-center text-gray-500">Нет постов от других пользователей</p>
        ) : (
          otherUsersPosts.map((post: IPost) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden p-4 transition-transform transform hover:scale-[1.01] cursor-pointer" // курсор pointer, чтобы показывать что элемент кликабельный
              onClick={() => navigate(`/posts/${post.id}`)} // <-- навигация по клику
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
            
          ))
          
        )}
        
      </div>
      
    </>
  );
};






