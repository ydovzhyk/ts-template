import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Container from '../Shared/Container';
import Calendar from '../Shared/Calendar';
import SelectField from '../Shared/SelectField';
import Button from '../Shared/Button';
import Text from '../Shared/Text';
import TextField from '../Shared/TextField';
import UserList from './UserList';
import { fields } from '../Shared/TextField/fields'
import { ITodoCreate } from '../types/todo/todo';
import { FaPlus } from 'react-icons/fa';

import s from './CreateTodo.module.scss'

const options = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' }
];

const arrayUser = ['ydovzhyk@getMaxListeners.com', 'katerynagrosul@getMaxListeners.com', 'morgan7up@gmail.com'];
const CreateTodo: React.FC = () => {
    const [showUsersList, setShowUsersList] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const { control, handleSubmit, reset } = useForm<ITodoCreate>({
        defaultValues: {
            part: '',
            subject: '',
            dateFrom: new Date,
            dateTo: new Date,
            additionalInfo: '',
            otherMembers: [],
        },
    });

    const onSubmit = (data: ITodoCreate) => {
        console.log(data)
        reset();
    };

    // const handleDateChange = (selectedDate: string) => {
    //     console.log('Обрана дата: ', selectedDate);
    // }

    const handleAddUsersClick = () => {
        if (!showUsersList) {
            setShowUsersList(true);
        } else {
            setShowUsersList(false);
        }
        
    };



    const today = new Date;

    return (
    <section className={s.createTodo}>
        <Container>
            <div className={s.todoBackground}>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <Text
                        text={'Розділ'}
                        textClass="title-form"
                    />
                    <Controller
                        control={control}
                        name="part"
                        rules={{ required: true}}
                        render={({ field: {onChange, value}, fieldState }) => (
                        <SelectField
                            value={value}
                            handleChange={onChange}
                            name="part"
                            className="createTodo"
                            placeholder="Оберіть опцію"
                            required={true}
                            options={options}
                        />
                        )}
                    />
                    <Text
                        text={'Тема'}
                        textClass="title-form"
                    />
                    <Controller
                        control={control}
                        name="subject"
                        rules={{ required: true}}
                        render={({ field: {onChange, value}, fieldState }) => (
                        <TextField
                            value={value}
                            control={control}
                            className="createTodo"
                            handleChange={onChange}
                            error={fieldState.error}
                            {...fields.subject}
                        />
                        )}
                    />
                    <Text
                        text={'Дата початку'}
                        textClass="title-form"
                    />
                    <Controller
                        control={control}
                        name="dateFrom"
                        rules={{ required: true}}
                        render={({ field: {onChange}}) => (
                        <Calendar
                            dateFormat="dd.MM.yyyy" 
                            showMonthYearPicker={false} 
                            value={today} 
                            handleChange={onChange}
                        />
                        )}
                    />
                    <Text
                        text={'Дата завершення'}
                        textClass="title-form"
                    />
                    <Controller
                        control={control}
                        name="dateTo"
                        rules={{ required: true}}
                        render={({ field: {onChange}}) => (
                        <Calendar
                            dateFormat="dd.MM.yyyy" 
                            showMonthYearPicker={false} 
                            value={today} 
                            handleChange={onChange}
                        />
                        )}
                    />
                    <Text
                        text={'Додаткова інформація'}
                        textClass="title-form"
                    />
                    <Controller
                        control={control}
                        name="additionalInfo"
                        rules={{ required: false}}
                        render={({ field: {onChange, value}, fieldState }) => (
                        <textarea
                            className={s.textarea}
                            value={value}
                            onChange={onChange}
                            rows={3}
                            cols={40}
                        />
                        )}
                    />
                    <div className={s.addUserGroup}>
                        <div className={s.addUser} onClick={handleAddUsersClick}>   
                            <FaPlus size={20} color='white' /> 
                        </div>  
                        <Text
                            text={!showUsersList ? 'Додати користувачів' : 'Обрати користувачів'}
                            textClass="title-form"
                        /> 
                    </div>
                    {showUsersList && <div>
                        <UserList
                            arrayUser={arrayUser}
                            selectedUsers={selectedUsers}
                            setSelectedUsers={setSelectedUsers}
                        />
                    </div>}    
                    <div className={s.wrap}>
                        <Button text="Створити" btnClass="btnLight" />
                    </div>
                </form>
            </div>
        </Container>
    </section>
    );
}

export default CreateTodo;