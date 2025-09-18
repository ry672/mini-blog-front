import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 w-full z-10">
      <h1 className="text-2xl font-bold text-blue-600">MySocialApp</h1>

      <button
        onClick={handleCreatePost}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Создать пост
      </button>
    </header>
  );
};



