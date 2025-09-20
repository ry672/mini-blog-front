import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../store/Api/AuthApi";
import { setUser } from "../../store/userSlice/userSclice";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppInput } from "../../components/UI/AppInput/AppInput";
import { AppButton } from "../../components/UI/AppButton/AppButton";
import { Headers } from "../../components/UI/Headers/Headers";
import { userApi } from "../../store/Api/UserApi";



const loginSchema = yup.object({
  userEmail: yup.string().email("Неправильный формат").required("Заполни поле"),
  userPassword: yup.string().min(6, "Минимум шесть символа").required("Заполни поле"),
});

interface IFormSubmit {
  userEmail: string;
  userPassword: string;
}

export const LoginPage = () => {
  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm<IFormSubmit>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  useEffect(() => {
  if (data && data.status === "success") {
    // Сохраняем токены и данные пользователя
    dispatch(
      setUser({
        user: data.user,
        accessToken: data.access,
        refreshToken: data.refresh,
      } ) 
    );

    
    dispatch(userApi.util.resetApiState());
    

    // 🔁 Переход после логина
    navigate("/main-page");
  }}, [data, dispatch, navigate]);

  const onSubmit: SubmitHandler<IFormSubmit> = (formData) => {
    loginUser({
      email: formData.userEmail,
      password: formData.userPassword,
    });
  };

  return (
    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm text-center">
      <Headers headerText="Авторизация" headerType="h1" className="text-3xl font-semibold text-gray-900 m-5"/>
      <form onSubmit={handleSubmit(onSubmit)}  className= "space-y-4">
        <Controller
          name="userEmail"
          control={control}
          render={({ field }) => (
            <AppInput
              isError={!!errors.userEmail}
              errorText={errors.userEmail?.message}
              type="email"
              placeholder="Ваша почта"
              {...field}
            />
          )}
        />
        <Controller
          name="userPassword"
          control={control}
          render={({ field }) => (
            <AppInput
              isError={!!errors.userPassword}
              errorText={errors.userPassword?.message}
              type="password"
              placeholder="Пароль"
              {...field}
            />
          )}
        />
        <AppButton buttonText="Войти" buttonType="submit" disabled={isLoading} />
      </form>
      {error && <p style={{ color: "red" }}>Ошибка авторизации</p>}
      <p className="flex justify-center items-center mt-5 text-gray-700 font-medium text-base text-center">
        Нет аккаунта?
        <Link to="/register" className="ml-2 text-blue-500 font-semibold text-base">
          Зарегистрироваться
        </Link>
      </p>


    </div>
  );
};


