import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { useAppDispatch } from '../../../hooks/hooks';
import { buildURL } from '../../helpers/buildURL';

import { fields } from '../../Shared/TextField/fields';
import { searchLocalStoradge } from '../../helpers/searchLocalStoradge';
import Text from '../../Shared/Text';
import SelectField from '../../Shared/SelectField';
import TextField from '../../Shared/TextField';
import Calendar from '../../Shared/Calendar';
import Button from '../../Shared/Button';
import { getOptionMenu } from '../../../Redux/technical/technical-selectors';
import { getLogin } from '../../../Redux/auth/auth-selectors';
import { getEmailList } from '../../../Redux/technical/technical-selectors';
import { getSearchTodo } from '../../../Redux/todo/todo-operations';
import { saveArrayTodosSearch } from '../../../Redux/todo/todo-slice';
import { getWeekPage } from '../../../Redux/technical/technical-selectors';

import { ITodoSearch } from '../../types/todo/todo';

import s from './SearchTodo.module.scss';

const SearchTodo: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const options = useSelector(getOptionMenu);
    const isUserLogin = useSelector(getLogin);
    const weekPage = useSelector(getWeekPage);

    const arrayUser = useSelector(getEmailList);
    const [finalListUser, setFinalListUser] = useState<string[]>(arrayUser);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [isListVisible, setIsListVisible] = useState<boolean>(false);
    const [clearTextField, setClearTextField] = useState<boolean>(false);
    const optionsStatus = [
        { value: 'Виконується', label: 'Виконується' },
        { value: 'Термін закінчився', label: 'Термін закінчився' },
        { value: 'Всі завдання', label: 'Всі завдання' },
    ]

    //Прибираэмо список коли відбувся клік за межами div
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsListVisible(false);
                setClearTextField(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [wrapperRef, clearTextField]);

    useEffect(() => {
        setClearTextField(false);
    }, [selectedUsers]);

    const { control, handleSubmit, reset } = useForm<ITodoSearch>({
        defaultValues: {
            searchByPart: { value: '', label: '' },
            searchByPhrase: '',
            searchByDate: '',
            searchByStatus: { value: '', label: '' },
            searchByOtherMembers: '',
        },
    });

    const onSubmit = async (data: ITodoSearch) => {
        let array;
        let searchPage = 0;
        const finalData: ITodoSearch = {
            searchByPart: data.searchByPart.value,
            searchByPhrase: data.searchByPhrase,
            searchByDate: data.searchByDate,
            searchByStatus: data.searchByStatus.value,
            searchByOtherMembers: selectedUsers.join(', '),
        }

        if (!isUserLogin) {
            const searchArray = await searchLocalStoradge(finalData);
            array = await dispatch(saveArrayTodosSearch(searchArray));
            console.log(array)
        } else {
            array = await dispatch(getSearchTodo(finalData));
        }
        
        if (isUserLogin && array.payload.arrayTodosSearch.length > 0) {
            searchPage = 1;
        }
        if (!isUserLogin && array.payload.length > 0) {
            searchPage = 1;
        }

        const newUrl = await buildURL(finalData, searchPage, weekPage);
        navigate(newUrl);

        reset();
        setSelectedUsers([]);
        setIsListVisible(false);
    };

    const handleUserSelection = (email: string) => {
        if (selectedUsers.includes(email)) {
            setSelectedUsers(selectedUsers.filter((user) => user !== email));
            setClearTextField(true);
        } else {
            setSelectedUsers([...selectedUsers, email]);
            setClearTextField(true);
        }
    };

    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        const filteredUsers = arrayUser.filter((email) => email.includes(text));
        if (arrayUser.length > 0) {
            setFinalListUser(filteredUsers);
        } else {
            setFinalListUser([text]);
        }
    };

    const handleTextSearchFocus = () => {
        setIsListVisible(true);
    };

    return (
        <div className={s.container}>
            <form className={s.formSection} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.todoSearchBox}>
                    <div className={s.todoSearchBoxPart}>
                        <Text
                            text={'За розділом'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="searchByPart"
                            rules={{ required: false}}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <SelectField
                                value={value}
                                handleChange={(newValue) => {
                                    onChange(newValue);
                                }}
                                name="searchByPart"
                                className="createTodo"
                                placeholder="Оберіть опцію"
                                required={false}
                                options={options}
                            />
                            )}
                        />
                    </div>
                    <div className={s.todoSearchBoxPart}>
                        <Text
                            text={'За словом чи фразою'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="searchByPhrase"
                            rules={{ required: false}}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <TextField
                                value={value}
                                control={control}
                                className="createTodo"
                                handleChange={(e) => {
                                    const newValue = e.target.value;
                                    onChange(newValue);
                                    }}
                                error={fieldState.error}
                                {...fields.searchByPhrase}
                            />
                            )}
                        />
                    </div>
                    <div className={s.todoSearchBoxPart}>
                        <Text
                            text={'За датою'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="searchByDate"
                            rules={{ required: false}}
                            render={({ field: {onChange}}) => (
                            <Calendar
                                dateFormat="dd.MM.yyyy" 
                                showMonthYearPicker={false} 
                                value={selectedDate.toDate()} 
                                handleChange={(newValue) => {
                                onChange(newValue);
                                }}
                            />
                            )}
                        />
                    </div>
                    <div className={s.todoSearchBoxPart}>
                        <Text
                            text={'За статусом'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="searchByStatus"
                            rules={{ required: false}}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <SelectField
                                value={value}
                                handleChange={(newValue) => {
                                    onChange(newValue);
                                }}
                                name="searchByStatus"
                                className="createTodo"
                                placeholder="Оберіть опцію"
                                required={false}
                                options={optionsStatus}
                            />
                            )}
                        />
                    </div>
                    {isUserLogin && (
                    <div ref={wrapperRef} className={s.todoSearchBoxPart}>
                        <Text
                            text={'За користувачем'}
                            textClass="title-form"
                        />
                        <TextField
                            className={"searchIST"}
                            handleChange={handleTextSearch}
                            onFocus={handleTextSearchFocus}
                            clearTextField={clearTextField}
                            {...fields.search}
                        />
                        {isListVisible && (
                            <ul className={s.scroll}>
                                {finalListUser.map((email, index) => (
                                    <li key={email} className={index === finalListUser.length - 1 ? s.lastListItem : s.list}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className={s.checkbox}
                                                checked={selectedUsers.includes(email)}
                                                onChange={() => handleUserSelection(email)}
                                            />
                                            {email}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    )}
                    {isUserLogin && selectedUsers.length > 0 &&(
                    <div className={s.todoSearchBoxPart}>
                        <Text
                            text={'Список обраних користувачів'}
                            textClass="title-form"
                        />
                        <Text
                            text={selectedUsers.join(', ')}
                            textClass="list-users"
                        />
                    </div>
                    )}
                </div>
                <div className={s.wrap}>
                    <Button text="Знайти завдання" btnClass="btnLight" />
                </div>
            </form>
        </div>
    );
};

export default SearchTodo;