import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import moment from 'moment';
import { getTodosWeek } from '../../Redux/todo/todo-operations';
import { getArrayTodosWeek } from '../../Redux/todo/todo-selectors';
import { getLogin } from '../../Redux/auth/auth-selectors';
import { saveArrayTodosWeek } from '../../Redux/todo/todo-slice';

import Container from '../Shared/Container';
import Text from '../Shared/Text';
import TodoCarusel from './TodoCarusel';

import { ITodoCreate } from '../types/todo/todo';

import s from './TodoList.module.scss'
import SearchTodo from './SearchTodo';


const TodoList: React.FC = () => { 
    const dispatch = useAppDispatch();
    const userLogin = useSelector(getLogin);
    const arrayTodosWeek = useSelector(getArrayTodosWeek);

    useEffect(() => {
        const fetchDataFromLocalStorage = () => {
            const localStorageData = localStorage.getItem('ts-template_tasks');
            const currentDate = moment();
            if (localStorageData) {
                const tasksFromLocalStorage = JSON.parse(localStorageData);
                // Фільтруємо завдання, які потрібно залишити в локальному сховищі
                const validTodos = tasksFromLocalStorage.filter((todo: ITodoCreate) => {
                    const dueDate = moment(todo.dateTo, "DD.MM.YYYY");
                    const daysUntilDue = dueDate.diff(currentDate, "days");
                    
                    return daysUntilDue >= 0 || todo.saveAfterDeadline;
                });
                // Оновлюємо локальне сховище новим масивом завдань
                localStorage.setItem('ts-template_tasks', JSON.stringify(validTodos));

                const todosThisWeek = validTodos.filter((todo: ITodoCreate) => {
                    const dueDate = moment(todo.dateTo, "DD.MM.YYYY");
                    const daysUntilDue = dueDate.diff(currentDate, "days");
                    
                    return daysUntilDue >= 0 && daysUntilDue <= 7;
                });
                dispatch(saveArrayTodosWeek(todosThisWeek));
            }
        };

        if (userLogin) {
            dispatch(getTodosWeek());
        } else {
            fetchDataFromLocalStorage();
        }
    }, [dispatch, userLogin]);

    return (
        <section className={s.todoList}>
            <Container>
                <div>
                    {arrayTodosWeek.length > 0 &&
                        <div>
                            <Text
                                text={`Завдання, які потрібно завершити в наступні 7 днів (${arrayTodosWeek.length} шт)`}
                                textClass="title-form-list"
                            />
                            <TodoCarusel />
                        </div>}
                    {arrayTodosWeek.length === 0 &&
                        <div>
                            <Text
                                text={'У вас не має завдань, які потрібно завершити в наступні 7 днів'}
                                textClass="title-form-list"
                            />
                        </div>}
                    <div>
                        <Text
                            text={'Пошук завдань за критеріями'}
                            textClass="title-form-list"
                        />
                        <SearchTodo />
                    </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </Container>
    </section>
    );
}

export default TodoList;