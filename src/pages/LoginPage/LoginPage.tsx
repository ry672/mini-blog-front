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
      dispatch(
        setUser({
          user: data.user,
          accessToken: data.access,
          refreshToken: data.refresh,
        })
      );
      navigate("/main-page");
    }
  }, [data, dispatch, navigate]);

  const onSubmit: SubmitHandler<IFormSubmit> = (formData) => {
    loginUser({
      email: formData.userEmail,
      password: formData.userPassword,
    });
  };

  return (
    <div>
      <Headers headerText="Авторизация" headerType="h1" />
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <p style={{ marginTop: "16px" }}>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
    </div>
  );
};


