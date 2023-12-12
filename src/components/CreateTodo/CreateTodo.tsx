import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import moment, { Moment } from 'moment';
import { useAppDispatch } from '../../hooks/hooks';
import { createTodo } from '../../Redux/todo/todo-operations';
import { getLogin } from '../../Redux/auth/auth-selectors';
import { getTodoMessage } from '../../Redux/todo/todo-selectors'
import { clearTodoMessage, createMessageConfirmation } from '../../Redux/todo/todo-slice';
import { getEmailList } from '../../Redux/technical/technical-selectors';
import { getOptionMenu } from '../../Redux/technical/technical-selectors';
import Container from '../Shared/Container';
import Calendar from '../Shared/Calendar';
import SelectField from '../Shared/SelectField';
import Button from '../Shared/Button';
import Text from '../Shared/Text';
import TextField from '../Shared/TextField';
import UserList from './UserList';
import Todo from '../Todo/Todo';
import Message from '../Shared/Message';
import { fields } from '../Shared/TextField/fields'
import { ITodoCreate } from '../types/todo/todo';
import { ITodoProps } from '../Todo/Todo'
import { FaPlus } from 'react-icons/fa';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './CreateTodo.module.scss';

const CreateTodo: React.FC = () => {
    const vpHeight = window.innerHeight;
    const [dynamicStyles, setDynamicStyles] = useState({});
    const dispatch = useAppDispatch();
    const isUserLogin = useSelector(getLogin);
    const arrayUser = useSelector(getEmailList);
    const options = useSelector(getOptionMenu);
    const message = useSelector(getTodoMessage);
    const [showUsersList, setShowUsersList] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedDateFrom, setSelectedDateFrom] = useState<Moment>(moment());
    const [selectedDateTo, setSelectedDateTo] = useState<Moment>(moment());
    const initialState = {
        additionalInfo: '',
        dateFrom: '',
        dateTo: '',
        otherMembers: '',
        part: '',
        subject: '',
        saveAfterDeadline: false,
    }
    const [previewData, setPreviewData] = useState<ITodoProps>(initialState);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            updatePreviewField('otherMembers', selectedUsers.join(', '));
        } if (selectedUsers.length === 0) {
            updatePreviewField('otherMembers', '');
        }
    }, [selectedUsers]);

    useEffect(() => {
        setDynamicStyles({
            height: isUserLogin ? `${vpHeight - 64}px` : `${vpHeight - 64}px`,
        });
    }, [isUserLogin, vpHeight]);

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
            part: { value: '', label: '' },
            subject: '',
            dateFrom: '',
            dateTo: '',
            additionalInfo: '',
            saveAfterDeadline: false,
        },
    });

    function generateUniqueId() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        const uniqueId = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
        });

        return uniqueId;
    }

    const onSubmit = async (data: ITodoCreate) => {
        const finalData: ITodoCreate = {
            part: data.part.value,
            subject: data.subject,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            additionalInfo: data.additionalInfo,
            otherMembers: previewData.otherMembers,
            saveAfterDeadline: data.saveAfterDeadline,
        }

        if (!isUserLogin) {
            const existingTasks = JSON.parse(localStorage.getItem('ts-template_tasks') || '[]');
            existingTasks.push({ ...finalData, _id: generateUniqueId() });
            localStorage.setItem('ts-template_tasks', JSON.stringify(existingTasks));
            dispatch(createMessageConfirmation("Todo added successfully"));
        } else {
            await dispatch(createTodo(finalData));
        }

        reset();
        setShowUsersList(false);
        setSelectedUsers([]);
        setSelectedDateFrom(moment());
        setSelectedDateTo(moment());
        setPreviewData(initialState);
    };

    const handleAddUsersClick = () => {
        if (!showUsersList) {
            setShowUsersList(true);
        } else {
            setShowUsersList(false);
        }
    };

    const resetMessage = () => {
        const timeoutId = setTimeout(() => {
            dispatch(clearTodoMessage());
        }, 10000);
        return () => clearTimeout(timeoutId);
    };

    return (
    <section className={s.createTodo} style={dynamicStyles}>
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
                                className={`${s.textarea} ${s.scroll}`}
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
                            {isUserLogin && 
                                <>
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
                            </>}  
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
                            </div>
                            )}
                        />
                        <div className={s.wrap}>
                            <Button text="Створити" btnClass="btnLight" />
                        </div>
                    </form>
                </div>
                <div className={s.preview}>
                    {/* <Todo {...previewData}/> */}
                </div>
                </div>
                {message && (
                    <Message text={`${message}`} onDismiss={resetMessage} type="todo" />
                )}
        </Container>
    </section>
    );
}

export default CreateTodo;