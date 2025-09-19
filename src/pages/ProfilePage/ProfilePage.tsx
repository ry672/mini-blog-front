import { useGetMeQuery } from "../../store/Api/UserApi";
import { useGetPostsByUserIdQuery } from "../../store/Api/PostApi";
import defaultAvatar from "../../images/user-front-side-with-white-background.jpg";
import { PostCard } from "../../components/PostCard/PostCard";

export const ProfilePage = () => {
  const { data: user, error, isLoading } = useGetMeQuery();

  // Не вызываем запрос постов, пока user не загружен
  const {
    data: userPosts,
    isLoading: postsLoading,
    error: postsError,
  } = useGetPostsByUserIdQuery(user?.id ?? 0, {
    skip: !user?.id,
  });

  if (isLoading) return <div className="p-6">Загрузка профиля...</div>;
  if (error) return <div className="p-6 text-red-500">Ошибка загрузки профиля</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20">
      <div className="bg-white shadow-md rounded p-6 flex items-center gap-6 mb-8">
        <img
          src={
            user?.profile_photo
              ? `http://localhost:5000${user.profile_photo}`
              : defaultAvatar
          }
          alt="Аватар"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-2xl font-bold">
            {user?.name} {user?.surname}
          </h2>
          <p className="text-gray-600">@{user?.username}</p>
          <p className="text-gray-700 mt-2">📧 {user?.email}</p>
          <p className="text-gray-700">📱 {user?.phone_number}</p>
          <p className="text-gray-700">📍 {user?.city}</p>
        </div>
      </div>

      <section>
        <h3 className="text-xl font-semibold mb-4">Мои посты</h3>

        {postsLoading && <p>Загрузка постов...</p>}
        {postsError && (
          <p className="text-red-500">Ошибка загрузки постов</p>
        )}
        {!postsLoading && userPosts?.length === 0 && (
          <p>У вас пока нет постов.</p>
        )}

        <div className="space-y-6">
          {userPosts?.map((post) => (
            <PostCard key={post.id} post={post} clickable />
          ))}
        </div>
      </section>
    </div>
  );
};



