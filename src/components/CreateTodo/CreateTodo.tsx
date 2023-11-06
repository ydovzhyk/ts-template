import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import moment, { Moment } from 'moment';
import Container from '../Shared/Container';
import Calendar from '../Shared/Calendar';
import SelectField from '../Shared/SelectField';
import Button from '../Shared/Button';
import Text from '../Shared/Text';
import TextField from '../Shared/TextField';
import UserList from './UserList';
import Todo from '../Todo/Todo';
import { fields } from '../Shared/TextField/fields'
import { ITodoCreate } from '../types/todo/todo';
import { ITodoProps } from '../Todo/Todo'
import { FaPlus } from 'react-icons/fa';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './CreateTodo.module.scss'

const options = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' }
];

const arrayUser = ['todotodo@gmail.com','tttest@gmail.com','create@gmail.com','test@gmail.com','testtodo@gmail.com', 'ydovzhyk@gmail.com','ydovzhyk@getMaxListeners.com', 'katerynagrosul@getMaxListeners.com', 'morgan7up@gmail.com'];
const CreateTodo: React.FC = () => {
    const [showUsersList, setShowUsersList] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedDateFrom, setSelectedDateFrom] = useState<Moment>(moment());
    const [selectedDateTo, setSelectedDateTo] = useState<Moment>(moment());
    const [previewData, setPreviewData] = useState<ITodoProps>({
    additionalInfo: '',
    dateFrom: '',
    dateTo: '',
    otherMembers: '',
    part: '',
    subject: '',
    saveAfterDeadline: false,
});

    console.log('previewData', previewData)
    
    useEffect(() => {
        if (selectedUsers.length > 0) {
            updatePreviewField('otherMembers', selectedUsers.join(', '));
        } if (selectedUsers.length === 0) {
            updatePreviewField('otherMembers', '');
        }
    }, [selectedUsers]);

    const updatePreviewField = (fieldName: string, value: any) => {
        if (fieldName === 'dateFrom') {
            const formattedValue = moment(value, 'DD.MM.YYYY');
            setSelectedDateFrom(formattedValue);
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        } if (fieldName === 'dateTo') {
            const formattedValue = moment(value, 'DD.MM.YYYY');
            setSelectedDateTo(formattedValue);
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        } if (fieldName === 'part') {
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value.value,
            }));
        } else {
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        }
    };

    const { control, handleSubmit, reset } = useForm<ITodoCreate>({
        defaultValues: {
            part: '',
            subject: '',
            dateFrom: selectedDateFrom.toDate(),
            dateTo: selectedDateTo.toDate(),
            additionalInfo: '',
            otherMembers: [],
            saveAfterDeadline: false,
        },
    });

    const onSubmit = (data: ITodoCreate) => {
        console.log('Для Арсенчика',data)
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

    return (
    <section className={s.createTodo}>
        <Container>
            <div className={s.todoPart}>
                <div className={s.create}>
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
                                // handleChange={onChange}
                                handleChange={(newValue) => {
                                onChange(newValue);
                                updatePreviewField('part', newValue);
                                }}
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
                                // handleChange={onChange}
                                handleChange={(e) => {
                                    const newValue = e.target.value;
                                    onChange(newValue);
                                    updatePreviewField('subject', newValue);
                                    }}
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
                                value={selectedDateFrom.toDate()} 
                                // handleChange={onChange}
                                handleChange={(newValue) => {
                                onChange(newValue);
                                updatePreviewField('dateFrom', newValue);
                                }}
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
                                value={selectedDateTo.toDate()} 
                                // handleChange={onChange}
                                handleChange={(newValue) => {
                                onChange(newValue);
                                updatePreviewField('dateTo', newValue);
                                }}
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
                                    // onChange={onChange}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    updatePreviewField('additionalInfo', e.target.value);
                                }}
                                rows={3}
                                cols={40}
                            />
                            )}
                        />
                        <Text
                            text={'Користувачі з яким ви хочете поділитися завданням'}
                            textClass="title-form"
                        />
                        <div className={s.userListShow}>
                            <Text
                                text={selectedUsers.join(', ')}
                                textClass="hidenInput"
                            />
                        </div>
                        <div className={s.addUserGroup}> 
                            <div className={s.addUser} onClick={handleAddUsersClick}>   
                                <FaPlus size={20} color='white' /> 
                            </div>  
                            <Text
                                text={!showUsersList ? 'Додати користувачів' : 'Обрати користувачів'}
                                textClass="title-form"
                            /> 
                        </div>
                            {showUsersList && <div className={s.modal}>
                                <div className={s.modalBorder}>
                                    <button className={s.dismissButton} onClick={handleAddUsersClick }>
                                        <FontAwesomeIcon icon={faTimes} size="lg" color='white' />
                                    </button>
                                    <UserList
                                        arrayUser={arrayUser}
                                        selectedUsers={selectedUsers}
                                        setSelectedUsers={setSelectedUsers}
                                    />
                                </div>
                            </div>}  
                        <Text
                            text={'Зберігати завдання після закінчення терміну виконання'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="saveAfterDeadline"
                            render={({ field: { onChange, value } }) => (
                            <div>
                                <input
                                    type="checkbox"
                                    className={s.checkbox}
                                    checked={value}
                                    onChange={(e) => {
                                        onChange(e.target.checked);
                                        updatePreviewField('saveAfterDeadline', e.target.checked)
                                    }}
                                />
                                <label htmlFor="saveAfterDeadline">Зберігати завдання після закінчення терміну виконання</label>
                            </div>
                            )}
                        />
                        <div className={s.wrap}>
                            <Button text="Створити" btnClass="btnLight" />
                        </div>
                    </form>
                </div>
                <div className={s.preview}>
                    <Todo {...previewData}/>
                </div>
            </div>
        </Container>
    </section>
    );
}

export default CreateTodo;