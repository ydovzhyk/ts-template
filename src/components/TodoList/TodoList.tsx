import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import moment from 'moment';
import { getTodosWeek } from '../../Redux/todo/todo-operations';
import { getArrayTodosWeek } from '../../Redux/todo/todo-selectors';
import { getLogin } from '../../Redux/auth/auth-selectors';
import { saveArrayTodosWeek } from '../../Redux/todo/todo-slice';
import { getArrayTodosSearch } from '../../Redux/todo/todo-selectors';
import { saveSearchPage, saveWeekPage } from '../../Redux/technical/technical-slice';
import { getSearchPage, getWeekPage } from '../../Redux/technical/technical-selectors';

import { parseURL } from '../helpers/parseURL';
import { buildURL } from '../helpers/buildURL';

import Container from '../Shared/Container';
import Text from '../Shared/Text';
import TodoPreview from '../TodoPreview';
import Pagination from '../Shared/Pagination';
import SearchTodo from './SearchTodo';

import { ITodoCreate, ITodoServer } from '../types/todo/todo';

import s from './TodoList.module.scss'

const chunkArray = (array: ITodoServer[],  chunkSize: number) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
};

const TodoList: React.FC = () => { 
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(getLogin);
    const arrayTodosWeek = useSelector(getArrayTodosWeek);
    const arrayTodosSearch = useSelector(getArrayTodosSearch);
    const searchPage = useSelector(getSearchPage);
    const weekPage = useSelector(getWeekPage);

    const itemsPerPage = 3;
    const totalPagesSearch = arrayTodosSearch.length > 0 ? Math.ceil(arrayTodosSearch.length / itemsPerPage) : 0;
    const totalPagesWeek = arrayTodosWeek.length > 0 ? Math.ceil(arrayTodosWeek.length / itemsPerPage) : 0;
    const [currentGroupSearchIndex, setCurrentGroupSearchIndex] = useState(0);
    const [currentGroupWeekIndex, setCurrentGroupWeekIndex] = useState(0);
    const chunkedTodosSearch = chunkArray(arrayTodosSearch, itemsPerPage);
    const chunkedTodosWeek = chunkArray(arrayTodosWeek, itemsPerPage);
    const currentGroupSearch = chunkedTodosSearch[currentGroupSearchIndex];
    const currentGroupWeek = chunkedTodosWeek[currentGroupWeekIndex];

    useEffect(() => {
        setCurrentGroupSearchIndex(0);
        if (arrayTodosSearch.length > 0) {
            dispatch(saveSearchPage(1));
        }
    }, [arrayTodosSearch, dispatch]);

    useEffect(() => {
        setCurrentGroupWeekIndex(0);
        if (arrayTodosWeek.length > 0) {
            dispatch(saveWeekPage(1));
        }
    }, [arrayTodosWeek, dispatch]);

    //Змінюємо URL при зміні сторінок
    useEffect(() => {
        const paramsURL = parseURL();
        const newUrl = buildURL(paramsURL.urlData, searchPage, weekPage );
        navigate(newUrl);
    }, [weekPage, searchPage, navigate]);

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

    const handlePageChange = (pageIndex: number, type: string) => {
        if (type === "search") {
            setCurrentGroupSearchIndex(pageIndex - 1);
            dispatch(saveSearchPage(pageIndex))
        } else if (type === "week") {
            setCurrentGroupWeekIndex(pageIndex - 1);
            dispatch(saveWeekPage(pageIndex))
        }
    };

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
                            <ul className={s.todosGroupWeek}>
                                {currentGroupWeek.map((todo: ITodoServer) => (
                                    <li key={todo._id}>
                                        <TodoPreview {...todo} />
                                    </li>
                                ))}
                            </ul>
                            <div>
                                {totalPagesWeek > 0 && (<Pagination
                                    totalPages={totalPagesWeek}
                                    currentPage={currentGroupWeekIndex + 1}
                                    onPageChange={(page) => handlePageChange(page, "week")}
                                />)}        
                            </div>
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
                {arrayTodosSearch.length > 0 && (
                    <>
                        <ul className={s.todosGroupSearch}>
                            {currentGroupSearch.map((todo: ITodoServer) => (
                                <li key={todo._id}>
                                    <TodoPreview {...todo} />
                                </li>
                            ))}
                        </ul>
                        <div>
                            {totalPagesSearch > 0 && (<Pagination
                                totalPages={totalPagesSearch}
                                currentPage={currentGroupSearchIndex + 1}
                                onPageChange={(page) => handlePageChange(page, "search")}
                            />)}        
                        </div>
                    </>
                )}
                </div>
                <div>

                </div>
            </div>
        </Container>
    </section>
    );
}

export default TodoList;