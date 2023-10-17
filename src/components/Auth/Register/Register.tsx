import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/hooks';
import { useForm, Controller } from 'react-hook-form';
import { register } from '../../../Redux/auth/auth-operations';
import { NavLink, Navigate, Link } from 'react-router-dom';
import { getAuthError, getUser } from './../../../Redux/auth/auth-selectors';
import { clearUserError } from './../../../Redux/auth/auth-slice';

import { IUserDataRegister } from '../../types/auth/auth';

import { fields } from '../../Shared/TextField/fields';
import TextField from '../../Shared/TextField/TextField';
import Button from '../../Shared/Button/Button';
import Container from '../../Shared/Container/Container';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';

import avatarImage from '../../../images/Avatar/avatar.svg';

import s from './Register.module.scss';

const Register: React.FC  = () => {
    const errorRegister = useSelector(getAuthError);
    const user = useSelector(getUser);
    const newUserId = user.id
    const dispatch = useAppDispatch();
    const [userAvatar, setUserAvatar] = useState<string | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const response = await fetch(avatarImage);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setUserAvatar(reader.result);
                    }
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.log('Error loading image:', error);
            }
        };
        loadImage();
    }, []);

    const { control, handleSubmit, reset } = useForm<IUserDataRegister>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            userAvatar: '', 
        },
    });

    const onSubmit = (data: IUserDataRegister) => {
        const dataWithAvatar = { ...data, userAvatar: userAvatar !== null ? userAvatar : '' };
        dispatch(register(dataWithAvatar));
        reset();
    };

    const customClassName = (active: boolean) => {
        if (active) {
            return `${s.authLink} ${s.activeLink}`;
        } else {
            return s.authLink;
        }
    };

    if (!errorRegister && newUserId) {
        return <Navigate to="/login" />;
    }

    const resetError = () => {
        dispatch(clearUserError());
    };

    return (
        <section className={s.auth}>
            <Container>
                <div className={s.box}>
                    <div className={s.linksWrapper}>
                        <NavLink className={customClassName(false)} to="/auth/login" end>
                            <h2 className={s.title}>Вхід</h2>
                        </NavLink>
                        <NavLink className={customClassName(true)} to="/auth/register">
                            <h2 className={s.title}>Реєстрація</h2>
                        </NavLink>
                    </div>
                    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="username"
                            rules={{ required: true, minLength: 2, maxLength: 30}}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <TextField
                                value={value}
                                control={control}
                                handleChange={onChange}
                                error={fieldState.error}
                                {...fields.username}
                            />
                            )}
                        />
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
                            <Button text="Реєстрація" btnClass="btnLight" />
                        </div>
                    </form>
                    <Link className={s.linkHome} to="/">
                        Повернутися на головну
                    </Link>
                </div>
                {errorRegister && (
                    <ErrorMessage text={`${errorRegister}`} onDismiss={resetError} />
                )}
            </Container>
        </section>
    );
};

export default Register;
