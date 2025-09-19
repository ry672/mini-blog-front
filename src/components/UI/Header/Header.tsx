import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../../../store/Api/UserApi";
import { RootState } from "../../../store/store";
import defaultAvatar from "../../../images/user-front-side-with-white-background.jpg";

export const Header = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  // RTK Query автоматически передаст токен из prepareHeaders
  const { data: user, isLoading } = useGetMeQuery(undefined, {
    skip: !accessToken, // не делать запрос если токена нет
  });

  const handleCreatePost = () => navigate("/create-post");
  const handleGoToProfile = () => navigate("/profile");

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 w-full z-10">
      <h1 className="text-2xl font-bold text-blue-600">MySocialApp</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={handleCreatePost}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Создать пост
        </button>

        {!isLoading && user && accessToken && (
          <img
            src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}` : defaultAvatar}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer object-cover border border-gray-300"
            onClick={handleGoToProfile}
          />
        )}
      </div>
    </header>
  );
};






