import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { useAppDispatch } from '../../hooks/hooks';
import { editTodo } from '../../Redux/todo/todo-operations';
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
import UserList from '../../components/CreateTodo/UserList';
import Todo from '../Todo/Todo';
import Message from '../Shared/Message';
import { fields } from '../Shared/TextField/fields'
import { ITodoCreate } from '../types/todo/todo';
import { ITodoProps } from '../Todo/Todo'
import { FaPlus } from 'react-icons/fa';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITodoPrewievProps } from '../TodoPreview/TodoPreview';

import s from './EditTodo.module.scss';

interface EditTodoProps {
    todoData: ITodoPrewievProps;
}

const EditTodo: React.FC<EditTodoProps> = ({ todoData }) => {

    const selectedUsersInitial = todoData?.otherMembers ? [todoData.otherMembers] : [];
    const additionalInfoInitial = todoData?.additionalInfo ? todoData.additionalInfo : '';
    const dateFromInitial = todoData?.dateFrom ? todoData.dateFrom : '';
    const dateToInitial = todoData?.dateTo ? todoData.dateTo : '';
    const otherMembersInitial = todoData?.otherMembers ? todoData.otherMembers : '';
    const partInitial = todoData?.part ? todoData.part : '';
    const subjectInitial = todoData?.subject ? todoData.subject : '';
    const saveAfterDeadlineInitial = todoData?.saveAfterDeadline ? todoData.saveAfterDeadline : false;
    const _idInitial = todoData?._id ? todoData._id : '';

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isUserLogin = useSelector(getLogin);
    const arrayUser = useSelector(getEmailList);
    const options = useSelector(getOptionMenu);
    const message = useSelector(getTodoMessage);
    const [showUsersList, setShowUsersList] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>(selectedUsersInitial);
    const format = "DD.MM.YYYY";
    const [selectedDateFrom, setSelectedDateFrom] = useState<Moment>(moment(dateFromInitial, format));
    const [selectedDateTo, setSelectedDateTo] = useState<Moment>(moment(dateToInitial, format));


    const initialState = {
        additionalInfo: additionalInfoInitial,
        dateFrom: dateFromInitial,
        dateTo: dateToInitial,
        otherMembers: otherMembersInitial,
        part: partInitial,
        subject: subjectInitial,
        saveAfterDeadline: saveAfterDeadlineInitial,
    }
    const [previewData, setPreviewData] = useState<ITodoProps>(initialState);

    useEffect(() => {
        if (!todoData || !Object.keys(todoData).length) {
            navigate('/');
        }
    }, [todoData, navigate]);

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
            additionalInfo: additionalInfoInitial,
            dateFrom: dateFromInitial,
            dateTo: dateToInitial,
            otherMembers: otherMembersInitial,
            part: { value: partInitial, label: partInitial },
            subject: subjectInitial,
            saveAfterDeadline: saveAfterDeadlineInitial,
        },
    });

    const onSubmit = async (data: ITodoCreate) => {
        const finalData: ITodoCreate = {
            part: data.part.value,
            subject: data.subject,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            additionalInfo: data.additionalInfo,
            otherMembers: previewData.otherMembers,
            saveAfterDeadline: data.saveAfterDeadline,
            _id: todoData._id,
        }

        if (!isUserLogin) {
            const existingTasks = JSON.parse(localStorage.getItem('ts-template_tasks') || '[]');
            const taskIndex = existingTasks.findIndex((task: ITodoCreate) => task._id === _idInitial);

            if (taskIndex !== -1) {
                existingTasks[taskIndex] = { ...existingTasks[taskIndex], ...finalData };
                localStorage.setItem('ts-template_tasks', JSON.stringify(existingTasks));
                dispatch(createMessageConfirmation("Todo edited successfully"));
            } else {
                return;
            }
        } else {
            await dispatch(editTodo(finalData));
        }

        reset();
        setShowUsersList(false);
        setSelectedUsers([]);
        setSelectedDateFrom(moment());
        setSelectedDateTo(moment());
        setPreviewData(initialState);
        naviagteToList();
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

    const naviagteToList = () => {
        const timeoutId = setTimeout(() => {
            navigate('/list');
        }, 10000);
        return () => clearTimeout(timeoutId);
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
                            rules={{ required: true }}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <SelectField
                                value={value}
                                handleChange={(newValue) => {
                                onChange(newValue);
                                updatePreviewField('part', newValue);
                                }}
                                name="part"
                                className="createTodo"
                                placeholder={partInitial}
                                required={true}
                                options={options}
                                defaultValue={{
                                    value: partInitial,
                                    label: partInitial,
                                }}
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
                            <Button text="Зберегти зміни" btnClass="btnLight" />
                        </div>
                    </form>
                </div>
                <div className={s.preview}>
                    <Todo {...previewData}/>
                </div>
                </div>
                {message && (
                    <Message text={`${message}`} onDismiss={resetMessage} type="todo" />
                )}
        </Container>
    </section>
    );
}

export default EditTodo;