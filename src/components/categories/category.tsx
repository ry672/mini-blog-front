
import { useGetCategoriesQuery } from '../../store/Api/CaregoryApi';

export const Aside = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();


  if (isLoading) return <aside>Загрузка категорий...</aside>;
  if (error) return <aside>Ошибка загрузки категорий</aside>;

  return (
    <aside>
      <h3>Категории</h3>
      <ul>
        {categories?.map(cat => (
          <li key={cat.id}>
            <strong>{cat.name}</strong><br />
            <small>{cat.description}</small>
          </li>
        ))}
      </ul>
    </aside>
  );
};


