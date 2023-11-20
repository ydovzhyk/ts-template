import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getArrayTodosWeek } from '../../../Redux/todo/todo-selectors';
import TodoPreview from '../../TodoPreview';
import { ITodoServer } from '../../types/todo/todo';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import s from './SearchTodo.module.scss';


const SearchTodo: React.FC = () => {

  return (
     <div className={s.container}>
        <div className={s.todoBox}>
           
        </div>
    </div>
  );
};

export default SearchTodo;