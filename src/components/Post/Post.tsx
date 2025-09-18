import { useState } from "react";
import { useCreatePostMutation } from "../../store/Api/PostApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { dataFollowers } from "../../pages/MainPage/dataMainPage";

export const CreatePostForm = () => {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const userId = useSelector((state: RootState) => state.user.user?.id);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "", // значение по умолчанию — пустая строка
    image: null as File | null,
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "title" || field === "content") {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    const newErrors = {
      title: formData.title.trim() === "" ? "Введите заголовок" : "",
      content: formData.content.trim() === "" ? "Введите содержание" : "",
    };
    setErrors(newErrors);
    if (newErrors.title || newErrors.content) return;

    if (!userId) {
      console.error("User is not authenticated");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.categoryId) {
      data.append("categoryId", formData.categoryId); // оставляем строку
    }
    if (formData.image) {
      data.append("images", formData.image);
    }

    try {
      await createPost({ userId, formData: data }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Ошибка при создании поста", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Создать пост</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Заголовок */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Заголовок *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`w-full px-4 py-2 border ${
              errors.title ? "border-red-400 bg-red-50" : "border-gray-300"
            } rounded-md focus:outline-none`}
            placeholder="Введите заголовок"
            disabled={isLoading}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Контент */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Контент *</label>
          <textarea
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            rows={5}
            className={`w-full px-4 py-2 border ${
              errors.content ? "border-red-400 bg-red-50" : "border-gray-300"
            } rounded-md focus:outline-none`}
            placeholder="Введите содержание поста"
            disabled={isLoading}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        {/* Картинка */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Изображение</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("image", e.target.files?.[0] || null)}
            disabled={isLoading}
          />
        </div>

        {/* Категория */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Категория (из базы)</label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            disabled={isLoading}
          >
            <option value="">Без категории</option>
            {dataFollowers.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.secondaryText} — {cat.mainText}
              </option>
            ))}
          </select>
        </div>

        {/* Кнопка */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isLoading ? "Создание..." : "Создать пост"}
        </button>
      </form>
    </div>
  );
};


