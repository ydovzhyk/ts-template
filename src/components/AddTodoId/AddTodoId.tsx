import React, { useState } from 'react';

import { IItem } from '../types/todo';

type OnlyId = Pick<IItem, 'id'>

interface IProps {
    onAddTodoId: (todo: IItem) => void;
}

const AddTodoId: React.FC<IProps> = (props) => {
    //Якщо ми хочемо передавати в useState пустий масив
    const [todo, idTodo] = useState<Partial<OnlyId>>({}); 

    //В інакшому випадку ми повинні описати поля обєкта
    // const [todo, idTodo] = useState<IItem>({
    // id: 0,
    // title: ''
    // });

    const idHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        idTodo({
            id: Number(e.target.value),
        })
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (!todo.id) {
            return;
        } else {
            // console.log(todo.id);
            props.onAddTodoId(todo as IItem);
        }
    };

    return (
    <div>
        <form onSubmit={submitHandler}>
            <div>
                <h3>Add id</h3>
                <input type='text' id='input-todo-id' onChange={idHandler}/>
            </div>
            <button type='submit'>Add new todo id</button>
        </form>
    </div>
    );
}

export default AddTodoId;