import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { getTodosWeek } from '../../Redux/todo/todo-operations';
import { getArrayTodosWeek } from '../../Redux/todo/todo-selectors';

import Container from '../Shared/Container';
import Text from '../Shared/Text';
import TodoCarusel from './TodoCarusel';

import s from './TodoList.module.scss'

const TodoList: React.FC = () => { 
    const dispatch = useAppDispatch();
    const arrayTodosWeek = useSelector(getArrayTodosWeek);

    useEffect(() => {
        dispatch(getTodosWeek());
    }, [dispatch]);

    return (
        <section className={s.todoList}>
            <Container>
                <div>
                    {arrayTodosWeek.length > 0 &&
                        <div>
                            <Text
                                text={'Завдання, які потрібно завершити в наступні 7 днів'}
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