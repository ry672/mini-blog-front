// src/pages/MainPage/MainPage.tsx

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetPostsQuery, IPost } from "../../store/Api/PostApi";
import { RootState } from "../../store/store";
import { Header } from "../../components/UI/Header/Header";

import { Aside } from "../../components/categories/category";
import { PostCard } from "../../components/PostCard/PostCard";


export const MainPage = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useGetPostsQuery(undefined, { skip: !accessToken });


  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <div className="text-center mt-8">Загрузка постов...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Ошибка загрузки постов</div>;

  const otherUsersPosts = posts?.filter((post) => post.userId !== currentUser?.id) ?? [];

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4 flex">
      <aside className="w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] p-4 bg-white shadow-md overflow-auto">
        <Aside />
      </aside>

     <main className="flex-1 ml-64 space-y-6">
     {otherUsersPosts.map((post: IPost) => (
       <PostCard key={post.id} post={post} clickable />
     ))}
     </main>
     </div>

      
    </>
  );
};






