import React from 'react';
import moment from 'moment';
import Text from '../Shared/Text'
import { FaClock, FaTimes } from 'react-icons/fa';
import s from './TodoPreview.module.scss';

export interface ITodoPrewievProps {
    _id: string;
    additionalInfo: string,
    dateFrom: string,
    dateTo: string,
    otherMembers: string,
    part: string,
    subject: string,
    saveAfterDeadline: boolean,
}

const checkDate = (date: string) => {
    const today = moment();
    const dueDate = moment(date, 'DD.MM.YYYY');

    if (dueDate.isSameOrAfter(today, 'day')) {
        return 'Виконується';
    } else {
        return 'Термін виконання минув';
    }
}

const TodoPreview: React.FC<ITodoPrewievProps> = ({ additionalInfo, dateFrom, dateTo, otherMembers, part, subject, saveAfterDeadline, _id }) => {

    return (
        <div className={s.todo}>
            <div className={s.todoCard}>
                {dateFrom && dateTo && <div className={s.todoStatus}>
                    <Text
                        text={checkDate(dateTo)}
                        textClass="title-form-todo-preview-status"
                    />
                    {checkDate(dateTo) === 'Виконується' ?
                        <FaClock color="green" size="20px" style={{ marginLeft: '10px', marginRight: '30px' }} /> :
                        <FaTimes color="red" size="20px" style={{ marginLeft: '10px', marginRight: '30px' }} />}
                </div>}
                <ul className={s.cardBorder}>
                    <li>
                        <Text
                            text={'Розділ'}
                            textClass="title-form-todo-preview"
                        />
                        <div className={s.partData}>
                            <Text
                                text={part}
                                textClass="hidenInput-preview"
                            />
                        </div>
                        <Text
                            text={'Тема'}
                            textClass="title-form-todo-preview"
                        />
                        <div className={s.partData}>
                            <Text
                                text={subject}
                                textClass="hidenInput-preview"
                            />
                        </div>
                    </li>
                    <li>
                        <div className={s.partGroup}>
                            <Text
                                text={'Дата початку'}
                                textClass="title-form-todo-preview-date"
                            />
                            <div className={s.partDataDate}>
                                <Text
                                    text={dateFrom}
                                    textClass="hidenInput-date"
                                />
                            </div>
                        </div>
                        <div className={s.partGroup}>
                            <Text
                                text={'Дата закінчення'}
                                textClass="title-form-todo-preview-date"
                            />
                            <div className={s.partDataDate}>
                                <Text
                                    text={dateTo}
                                    textClass="hidenInput-date"
                                />
                            </div>
                        </div>
                        <Text
                            text={saveAfterDeadline ?
                                '*Ваше завдання буде збережене після закінчення терміну його виконання' :
                                '*Ваше завдання буде видалено після закінчення терміну його виконання'}
                            textClass="title-form-todo-preview-notify"
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TodoPreview;