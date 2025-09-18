

import { AppButton } from "../../components/UI/AppButton/AppButton";
import { AppInput } from "../../components/UI/AppInput/AppInput";
import { Headers } from "../../components/UI/Headers/Headers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from '../../store/Api/AuthApi';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice/userSclice";


const RegexPhone =
    /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const loginScheme = yup.object({
    userPhone: yup
        .string()
        .matches(RegexPhone, "Неверный формат номера")
        .required("Заполни поле"),
    userPassword: yup
        .string()
        .min(6, "Минимум шесть символа")
        .required("Заполни поле"),
    userName: yup
        .string()
        .min(4, "Минимум четыре символа")
        .required("Заполни поле"),
    userEmail: yup
        .string()
        .email("Неверный формат email")
        .required("Заполни поле"),
    userCity: yup
        .string()
        .min(4, "Минимум четыре символа")
        .required("Заполни поле"),
    userUsername: yup
        .string()
        .min(6, "Минимум шесть символов")
        .required("Заполни поле")
});

interface IFormSubmit {
    userPhone: string;
    userPassword: string;
    userName: string;
    userEmail: string;
    userCity: string;
    userUsername: string
}

export const RegistrationPage = () => {
    const [registerUser, { data, isLoading, error }] = useRegisterUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormSubmit>({
        resolver: yupResolver(loginScheme),
        mode: 'onBlur',
        defaultValues: {
            userPhone: "",
            userPassword: "",
            userName: "",
            userEmail: "",
            userCity: "",
        },
    });

    useEffect(() => {
        if (data?.status === "success" && data.user && data.access && data.refresh) {
            
            dispatch(setUser({
                user: data.user,
                accessToken: data.access,
                refreshToken: data.refresh,
            }));
            navigate("/main-page");
        }
    }, [data, dispatch, navigate]);

    const onSubmit: SubmitHandler<IFormSubmit> = (formData) => {
        const payload = {
            name: formData.userName,
            surname: "", 
            username: formData.userUsername,
            phone_number: formData.userPhone,
            email: formData.userEmail,
            password: formData.userPassword,
            city: formData.userCity,
        };
        registerUser(payload);
    };

    return (
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm text-center">
            
            <Headers headerText="Регистрация" headerType="h1" className="text-3xl font-semibold text-gray-900 m-5" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="userName"
                    control={control}
                    render={({ field }) => (
                        <AppInput
                            isError={!!errors.userName}
                            errorText={errors.userName?.message}
                            type="text"
                            placeholder="Имя"
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="userUsername"
                    control={control}
                    render={({ field }) => (
                        <AppInput
                            isError={!!errors.userUsername}
                            errorText={errors.userUsername?.message}
                            type="text"
                            placeholder="Ведите username"
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="userPhone"
                    control={control}
                    render={({ field }) => (
                        <AppInput
                            isError={!!errors.userPhone}
                            errorText={errors.userPhone?.message}
                            type="tel"
                            placeholder="Номер телефона"
                            {...field}
                        />
                    )}
                />

                
                <Controller
                    name="userEmail"
                    control={control}
                    render={({ field }) => (
                        <AppInput
                            isError={!!errors.userEmail}
                            errorText={errors.userEmail?.message}
                            type="email"
                            placeholder="Email"
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

                <Controller
                    name="userCity"
                    control={control}
                    render={({ field }) => (
                        <AppInput
                            isError={!!errors.userCity}
                            errorText={errors.userCity?.message}
                            type="text"
                            placeholder="Город"
                            {...field}
                        />
                    )}
                />

                <AppButton buttonText={"Зарегистрироваться"} buttonType={"submit"} disabled={isLoading} />
                {error && <p style={{color: 'red'}}>Ошибка регистрации</p>}
            </form>

            
            <p className="flex justify-center items-center mt-5 text-gray-700 font-medium text-base text-center">Есть аккаунт? <Link to="/" className="ml-2 text-blue-500 font-semibold text-base">Войти</Link></p>
        </div>
    );
};

