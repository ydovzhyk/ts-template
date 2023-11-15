import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/hooks';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../../../Redux/auth/auth-operations';
import { NavLink, Navigate, Link, useLocation } from 'react-router-dom';
import { getLogin } from './../../../Redux/auth/auth-selectors';

import { IUserDataLogin } from '../../types/auth/auth';

import { fields } from '../../Shared/TextField/fields';
import TextField from '../../Shared/TextField/TextField';
import Text from '../../Shared/Text';
import Button from '../../Shared/Button/Button';
import Container from '../../Shared/Container/Container';

import { FcGoogle } from 'react-icons/fc';

import s from './Login.module.scss';

const Login: React.FC  = () => {
    const isLogin = useSelector(getLogin);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const googleText =
    location.pathname === '/auth/login'
        ? 'Увійти швидко з Google'
            : 'Зареєструватись швидко з Google';
    
    const versionApp = () => {
        if (process.env.NODE_ENV === 'production') {
            return 'https://ts-template-backend.herokuapp.com';
        }
        if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:4000';
        }
    }

    const { control, handleSubmit, reset } = useForm<IUserDataLogin>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: IUserDataLogin) => {
        dispatch(login(data));
        reset();
    };

    const customClassName = (active: boolean) => {
        if (active) {
            return `${s.authLink} ${s.activeLink}`;
        } else {
            return s.authLink;
        }
    };

    if (isLogin) {
    return <Navigate to="/" />;
    }

    return (
        <section className={s.auth}>
            <Container>
                <div className={s.box}>
                    <div className={s.linksWrapper}>
                        <NavLink className={customClassName(true)} to="/auth/login" end>
                            <h2 className={s.title}>Вхід</h2>
                        </NavLink>
                        <NavLink className={customClassName(false)} to="/auth/register">
                            <h2 className={s.title}>Реєстрація</h2>
                        </NavLink>
                    </div>
                    <Text textClass="google-text" text={googleText} />
                    <a href={`${versionApp()}/google`} className={s.googleBtn}>
                        <FcGoogle size={24} />
                        Google
                    </a>
                    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="email"
                            rules={{required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/}}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <TextField
                                value={value}
                                control={control}
                                handleChange={onChange}
                                error={fieldState.error}
                                {...fields.email}
                            />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: true, minLength: 8, maxLength: 20 }}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <TextField
                                value={value}
                                control={control}
                                handleChange={onChange}
                                error={fieldState.error}
                                {...fields.password}
                            />
                            )}
                        />
                        <div className={s.wrap}>
                            <Button text="Ввійти" btnClass="btnLight" />
                        </div>
                    </form>
                    <Link className={s.linkHome} to="/">
                        Повернутися на головну
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default Login;