import React from 'react';
import moment from 'moment';
import Text from '../Shared/Text'
import { FaClock, FaTimes } from 'react-icons/fa';
import s from './Todo.module.scss';

export interface ITodoProps {
    additionalInfo: string ,
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

const Todo: React.FC<ITodoProps> = ({ additionalInfo, dateFrom, dateTo, otherMembers, part, subject, saveAfterDeadline }) => {

    return (
        <div className={s.todo}>
            <div className={s.todoCard}>
                {dateFrom && dateTo && <div className={s.todoStatus}>
                    <Text
                        text={checkDate(dateTo)}
                        textClass="title-form-todo"
                    />
                    {checkDate(dateTo) === 'Виконується' ?
                        <FaClock color="green" size="30px" style={{ marginLeft: '20px', marginRight: '20px' }} /> :
                        <FaTimes color="red" size="30px" style={{ marginLeft: '20px', marginRight: '20px' }} />}
                </div>}
                <ul className={s.cardBorder}>
                    <li className={s.cardGroup}>
                        <div className={s.partGroup}>
                            <Text
                                text={'Розділ'}
                                textClass="title-form-todo"
                            />
                            <div className={s.partData}>
                                <Text
                                    text={part}
                                    textClass="hidenInput"
                                />
                            </div>
                        </div>
                        <div className={s.partGroup}>
                            <Text
                                text={'Дата початку'}
                                textClass="title-form-todo"
                            />
                            <div className={s.partDataDate}>
                                <Text
                                    text={dateFrom}
                                    textClass="hidenInput"
                                />
                            </div>
                        </div>
                    </li>
                    <li className={s.cardGroup}>
                        <div className={s.partGroup}>
                            <Text
                                text={'Тема'}
                                textClass="title-form-todo"
                            />
                            <div className={s.partData}>
                                <Text
                                    text={subject}
                                    textClass="hidenInput"
                                />
                            </div>
                        </div>
                        <div className={s.partGroup}>
                            <Text
                                text={'Дата закінчення'}
                                textClass="title-form-todo"
                            />
                            <div className={s.partDataDate}>
                                <Text
                                    text={dateTo}
                                    textClass="hidenInput"
                                />
                            </div>
                        </div>
                    </li>
                    <li className={s.cardGroup}>
                        <div className={s.partGroup}>
                            <Text
                                text={'Додаткова інформація'}
                                textClass="title-form-todo"
                            />
                            <div className={s.partDataAddInfoUser}>
                                <div className={s.scroll}>
                                    <Text
                                        text={additionalInfo}
                                        textClass="hidenInputAddInfoUser"
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                    {otherMembers && <li className={s.cardGroup}>
                        <div className={s.partGroup}>
                            <Text
                                text={'Користувачі спільного завдання'}
                                textClass="title-form-todo"
                            />
                            <div className={s.partDataAddInfoUser}>
                                <Text
                                    text={otherMembers}
                                    textClass="hidenInputAddInfoUser"
                                />
                            </div>
                        </div>
                    </li>}
                    <Text
                        text={saveAfterDeadline ?
                            '*Ваше завдання буде збережене після закінчення терміну його виконання' :
                            '*Ваше завдання буде видалено після закінчення терміну його виконання'}
                        textClass="title-form-todo"
                    />
                </ul>
            </div>
        </div>
    );
}

export default Todo;