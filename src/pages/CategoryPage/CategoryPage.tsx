import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetCategoryByIdQuery } from "../../store/Api/CaregoryApi";
import { useGetPostsQuery } from "../../store/Api/PostApi"; // глобальный кэш постов
import { PostCard } from "../../components/PostCard/PostCard";

export const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  const currentUser = useSelector((state: RootState) => state.user.user);

  // Загружаем категорию
  const { data: category, isLoading, error } = useGetCategoryByIdQuery(categoryId, {
    refetchOnMountOrArgChange: true,
  });

  // Получаем глобальный список всех постов
  const { data: allPosts } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div className="p-6">Загрузка категории...</div>;
  if (error) return <div className="p-6 text-red-500">Ошибка загрузки категории</div>;
  if (!category) return <div className="p-6">Категория не найдена</div>;

  // Синхронизируем посты категории с глобальными данными
  const posts = category.posts?.map((post) => {
    const updatedPost = allPosts?.find((p) => p.id === post.id);
    return updatedPost ?? post;
  }) ?? [];

  const filteredPosts = posts.filter((post) => post.userId !== currentUser?.id);

  return (
    <div className="lg:col-start-2 lg:max-w-2xl">
      <h1 className="mb-8 text-center text-4xl font-bold">{category.name}</h1>
      <p className="text-base text-slate-700 sm:text-lg text-center">
        {category.description}
      </p>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-600">Пока нет постов в этой категории.</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} clickable/>
          ))}
        </div>
      )}
    </div>
  );
};



