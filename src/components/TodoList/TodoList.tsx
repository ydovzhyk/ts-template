import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import { getTodosWeek } from '../../Redux/todo/todo-operations';
import { getArrayTodosWeek } from '../../Redux/todo/todo-selectors';
import { getLogin } from '../../Redux/auth/auth-selectors';
import { saveArrayTodosWeek } from '../../Redux/todo/todo-slice';
import { getArrayTodosSearch } from '../../Redux/todo/todo-selectors';
import { saveSearchPage, saveWeekPage } from '../../Redux/technical/technical-slice';
import { getSearchPage, getWeekPage } from '../../Redux/technical/technical-selectors';
import { getSearchTodo } from '../../Redux/todo/todo-operations';
import { saveArrayTodosSearch } from '../../Redux/todo/todo-slice';
import { clearArrayTodosSearch, clearArrayTodosWeek } from '../../Redux/todo/todo-slice';

import { parseURL } from '../helpers/parseURL';
import { buildURL } from '../helpers/buildURL';
import { searchLocalStoradge } from '../helpers/searchLocalStoradge';

import Container from '../Shared/Container';
import Text from '../Shared/Text';
import TodoPreview from '../TodoPreview';
import Pagination from '../Shared/Pagination';
import SearchTodo from './SearchTodo';

import { ITodoCreate, ITodoServer, ITodoSearch } from '../types/todo/todo';

import s from './TodoList.module.scss';

const chunkArray = (array: ITodoServer[],  chunkSize: number) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, (index + 1) * chunkSize)
    );
};

const TodoList: React.FC = () => { 
    const vpHeight = window.innerHeight;
    const [dynamicStyles, setDynamicStyles] = useState({});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(getLogin);
    const arrayTodosWeek = useSelector(getArrayTodosWeek);
    const arrayTodosSearch = useSelector(getArrayTodosSearch);
    const searchPage = useSelector(getSearchPage);
    const weekPage = useSelector(getWeekPage);

    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

    let itemsPerPage = isTablet ? 2 : 3;
    const totalPagesSearch = arrayTodosSearch.length > 0 ? Math.ceil(arrayTodosSearch.length / itemsPerPage) : 0;
    const totalPagesWeek = arrayTodosWeek.length > 0 ? Math.ceil(arrayTodosWeek.length / itemsPerPage) : 0;
    const [currentGroupSearchIndex, setCurrentGroupSearchIndex] = useState(0);
    const [currentGroupWeekIndex, setCurrentGroupWeekIndex] = useState(0);
    const chunkedTodosSearch = chunkArray(arrayTodosSearch, itemsPerPage);
    const chunkedTodosWeek = chunkArray(arrayTodosWeek, itemsPerPage);
    const currentGroupSearch = chunkedTodosSearch[currentGroupSearchIndex];
    const currentGroupWeek = chunkedTodosWeek[currentGroupWeekIndex];

    useEffect(() => {
        setDynamicStyles({
            minHeight: userLogin ? `${vpHeight - 64}px` : `${vpHeight - 64 - 39}px`,
        });
    }, [userLogin, vpHeight]);

    useEffect(() => {
        let arraySearch;
        let arrayWeek;
        dispatch(clearArrayTodosSearch());
        dispatch(clearArrayTodosWeek());
        setCurrentGroupSearchIndex(0);
        setCurrentGroupWeekIndex(0);

        const fetchDataFromLocalStorage = () => {
            const localStorageData = localStorage.getItem('ts-template_tasks');
            const currentDate = moment();
            if (localStorageData) {
                const tasksFromLocalStorage = JSON.parse(localStorageData);
                // We filter the tasks that need to be left in the local storage
                const validTodos = tasksFromLocalStorage.filter((todo: ITodoCreate) => {
                    const dueDate = moment(todo.dateTo, "DD.MM.YYYY");
                    const daysUntilDue = dueDate.diff(currentDate, "days");
                    
                    return daysUntilDue >= 0 || todo.saveAfterDeadline;
                });
                // We update the local storage with a new array of tasks
                localStorage.setItem('ts-template_tasks', JSON.stringify(validTodos));

                const todosThisWeek = validTodos.filter((todo: ITodoCreate) => {
                    const dueDate = moment(todo.dateTo, "DD.MM.YYYY");
                    const daysUntilDue = dueDate.diff(currentDate, "days");
                    
                    return daysUntilDue >= 0 && daysUntilDue <= 7;
                });
                dispatch(saveArrayTodosWeek(todosThisWeek));
                return todosThisWeek;
            }
        };

        const separationOfProcesses = async (urlData: ITodoSearch, weekPage: string | null, searchPage: string | null) => {
            const searchByPart = urlData.searchByPart;
            const searchByPhrase = urlData.searchByPhrase;
            const searchByDate = urlData.searchByDate;
            const searchByStatus = urlData.searchByStatus;
            const searchByOtherMembers = urlData.searchByOtherMembers;
            const numberWeekPage = weekPage ? Number(weekPage) : 0;
            const numberSearchPage = searchPage ? Number(searchPage) : 0;

            if (searchByPart === '' && searchByPhrase === '' && searchByDate === '' && searchByStatus === '' && searchByOtherMembers === '') {
                //If we don't have a search url
                if (userLogin) {
                    arrayWeek = await dispatch(getTodosWeek()) as any;
                    if (arrayWeek.payload && arrayWeek.payload.arrayTodosWeek.length > 0) {
                        dispatch(saveWeekPage(numberWeekPage ? numberWeekPage : 1));
                        setCurrentGroupWeekIndex(numberWeekPage ? numberWeekPage - 1 : 0);
                    } else {
                        dispatch(saveWeekPage(0));
                        setCurrentGroupWeekIndex(0);
                    }
                } else {
                    arrayWeek = fetchDataFromLocalStorage();
                    if (arrayWeek.length > 0) {
                        dispatch(saveWeekPage(numberWeekPage ? numberWeekPage : 1));
                        setCurrentGroupWeekIndex(numberWeekPage ? numberWeekPage - 1 : 0);
                    } else {
                        dispatch(saveWeekPage(0));
                        setCurrentGroupWeekIndex(0);
                    }
                }
            } else {
                //If we have a search url
                const finalData: ITodoSearch = { searchByPart, searchByPhrase, searchByDate, searchByStatus, searchByOtherMembers };
                if (userLogin) {
                    arrayWeek = await dispatch(getTodosWeek()) as any;
                    if (arrayWeek.payload && arrayWeek.payload.arrayTodosWeek.length > 0) {
                        dispatch(saveWeekPage(numberWeekPage ? numberWeekPage : 1));
                        setCurrentGroupWeekIndex(numberWeekPage ? numberWeekPage - 1 : 0);
                    } else {
                        dispatch(saveWeekPage(0));
                        setCurrentGroupWeekIndex(0);
                    }

                    arraySearch = await dispatch(getSearchTodo(finalData)) as any;
                    if (arraySearch.payload && arraySearch.payload.arrayTodosSearch.length > 0) {
                        dispatch(saveSearchPage(numberSearchPage ? numberSearchPage : 1));
                        setCurrentGroupSearchIndex(numberSearchPage ? numberSearchPage - 1 : 0);
                    } else {
                        dispatch(saveSearchPage(0));
                        setCurrentGroupSearchIndex(0);
                    }
                } else {
                    arrayWeek = fetchDataFromLocalStorage();
                    if (arrayWeek.length > 0) {
                        dispatch(saveWeekPage(numberWeekPage ? numberWeekPage : 1));
                        setCurrentGroupWeekIndex(numberWeekPage ? numberWeekPage - 1 : 0);
                    } else {
                        dispatch(saveWeekPage(0));
                        setCurrentGroupWeekIndex(0);
                    }
                    
                    arraySearch = await searchLocalStoradge(finalData);
                    await dispatch(saveArrayTodosSearch(arraySearch));
                    if (arraySearch && arraySearch.length > 0) {
                        dispatch(saveSearchPage(numberSearchPage ? numberSearchPage : 1));
                        setCurrentGroupSearchIndex(numberSearchPage ? numberSearchPage - 1 : 0);
                    } else {
                        dispatch(saveSearchPage(0));
                        setCurrentGroupSearchIndex(0);
                    }
                }
            }
        }
        
        const { urlData, weekPage, searchPage } = parseURL();
            separationOfProcesses(urlData, weekPage, searchPage);

    }, [dispatch, userLogin]);

    //We change the URL when changing week or search pages
    useEffect(() => {
        const paramsURL = parseURL();
        const newUrl = buildURL(paramsURL.urlData, searchPage, weekPage );
        navigate(newUrl);
    }, [weekPage, searchPage, navigate]);

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
        <section className={s.todoList} style={dynamicStyles}>
            <Container>
                <div>
                    {arrayTodosWeek.length > 0 &&
                        <div>
                            <Text
                                text={`Завдання, які потрібно завершити в наступні 7 днів (${arrayTodosWeek.length} шт)`}
                                textClass="title-form-list"
                            />
                            {currentGroupWeek && <ul className={s.todosGroup}>
                                {currentGroupWeek.map((todo: ITodoServer) => (
                                    <li key={todo._id}>
                                        <TodoPreview {...todo} />
                                    </li>
                                ))}
                            </ul>}
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
                        { currentGroupSearch && <ul className={s.todosGroup}>
                            {currentGroupSearch.map((todo: ITodoServer) => (
                                <li key={todo._id}>
                                    <TodoPreview {...todo} />
                                </li>
                            ))}
                        </ul>}
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
            </div>
        </Container>
    </section>
    );
}

export default TodoList;