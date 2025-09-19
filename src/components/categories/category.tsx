
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../store/Api/CaregoryApi';

export const Aside = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();

  if (isLoading) return <aside>Загрузка категорий...</aside>;
  if (error) return <aside>Ошибка загрузки категорий</aside>;

  return (
    <aside>
      
      <ul>
        {categories?.map(cat => (
          <li key={cat.id} onClick={() => navigate(`/categories/${cat.id}`)} className='border-b-2 border-gray-300 cursor-pointer'>
            <span className='text-base font-semibold leading-6 text-indigo-500 uppercase'>{cat.name}</span><br />
            <span className=' leading-5 text-gray-600'>{cat.description}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};


