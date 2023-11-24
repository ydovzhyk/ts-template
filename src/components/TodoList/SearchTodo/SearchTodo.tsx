import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import moment, { Moment } from 'moment';

import { fields } from '../../Shared/TextField/fields'
import Text from '../../Shared/Text';
import SelectField from '../../Shared/SelectField';
import TextField from '../../Shared/TextField';
import Calendar from '../../Shared/Calendar';
import { getOptionMenu } from '../../../Redux/technical/technical-selectors';
import { getLogin } from '../../../Redux/auth/auth-selectors';
import { getEmailList } from '../../../Redux/technical/technical-selectors';

import { ITodoSearch } from '../../types/todo/todo';

import s from './SearchTodo.module.scss';

const SearchTodo: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const options = useSelector(getOptionMenu);
    const isUserLogin = useSelector(getLogin);
    const arrayUser = useSelector(getEmailList);
    const [finalListUser, setFinalListUser] = useState<string[]>(arrayUser);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [isListVisible, setIsListVisible] = useState<boolean>(false);
    const optionsStatus = [
        { value: 'Виконується', label: 'Виконується' },
        { value: 'Термін закінчився', label: 'Термін закінчився' },
    ]


    console.log(isListVisible)
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
        const finalData: ITodoSearch = {
            searchByPart: data.searchByPart.value,
            searchByPhrase: data.searchByPhrase,
            searchByDate: data.searchByDate,
            searchByStatus: data.searchByStatus,
            searchByOtherMembers: data.searchByOtherMembers,
        }

        if (!isUserLogin) {
            
        } else {
            console.log('Це дата у пошуку', finalData)
            // await dispatch(createTodo(finalData));
        }

        reset();
        // setShowUsersList(false);
        // setSelectedUsers([]);
        // setSelectedDate(moment());
        // setPreviewData(initialState);
    };

    const handleUserSelection = (email: string) => {
        if (selectedUsers.includes(email)) {
            setSelectedUsers(selectedUsers.filter((user) => user !== email));
        } else {
            setSelectedUsers([...selectedUsers, email]);
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
        setIsListVisible(true); // Показати список при фокусуванні
    };

    const handleTextSearchBlur = () => {
        setIsListVisible(false); // Сховати список при втраті фокусу
    };

    return (
        <div className={s.container}>
            <form className={s.todoSearchBox} onSubmit={handleSubmit(onSubmit)}>
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                    <div>
                        <Text
                            text={'За користувачем'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="searchByOtherMembers"
                            rules={{ required: false }}
                            render={({ field: { onChange, value }, fieldState }) => (
                            <TextField
                                className="searchIST"
                                handleChange={handleTextSearch}
                                onFocus={handleTextSearchFocus}
                                onBlur={handleTextSearchBlur}
                                {...fields.search}
                            />
                            )}
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
            </form>
        </div>
    );
};

export default SearchTodo;