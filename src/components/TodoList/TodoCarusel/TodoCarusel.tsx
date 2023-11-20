import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getArrayTodosWeek } from '../../../Redux/todo/todo-selectors';
import TodoPreview from '../../TodoPreview';
import { ITodoServer } from '../../types/todo/todo';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import s from './TodoCarusel.module.scss';

const chunkArray = (array: ITodoServer[],  chunkSize: number) => {
        return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, (index + 1) * chunkSize)
        );
    };

const TodoCarusel: React.FC = () => {
    const arrayTodosWeek = useSelector(getArrayTodosWeek);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

    const chunkedTodos = chunkArray(arrayTodosWeek, 3);
    const currentGroup = chunkedTodos[currentGroupIndex];

    const goToNextGroup = () => {
        setCurrentGroupIndex((prevIndex) =>
        prevIndex === chunkedTodos.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevGroup = () => {
        setCurrentGroupIndex((prevIndex) =>
        prevIndex === 0 ? chunkedTodos.length - 1 : prevIndex - 1
        );
    };

  return (
     <div className={s.container}>
        <div className={s.todoBox}>
            <div
                className={`${s.arrowButton} ${s.arrowButtonLeft}`}
                onClick={goToPrevGroup}
            >
                <FiChevronLeft
                    size={60}
                    strokeWidth={1}
                    className={s.arrowlinkLeft}
                />
            </div>
            {currentGroup && currentGroup.length > 0 && (
                <>
                    <ul className={s.todosGroup}>
                        {currentGroup.map((todo: ITodoServer) => (
                            <li key={todo._id}>
                                <TodoPreview {...todo} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <div
                className={`${s.arrowButton} ${s.arrowButtonRight}`}
                onClick={goToNextGroup}
            >
                <FiChevronRight
                    size={60}
                    strokeWidth={1}
                    className={s.arrowlinkRigth}
                />
            </div>
        </div>
    </div>
  );
};

export default TodoCarusel;