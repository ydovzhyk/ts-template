import React, { useRef } from 'react';
import { IItem } from '../types/todo';

interface IProps {
    onAddTodoTitle: (todo: IItem) => void;
}

const AddTodo: React.FC<IProps> = (props) => {
    const titleInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const inputTitle = titleInputRef.current?.value;

        if (inputTitle) {
            const todo: IItem = { id: 0, title: inputTitle };
            props.onAddTodoTitle(todo);
        }
    };

    return (
    <div>
            <form onSubmit={submitHandler}>
                <div>
                    <h3>Add title</h3>
                    <input type='text' id='input-todo' ref={titleInputRef}/>
                </div>
                <button type='submit'>Add new todo</button>
        </form>
    </div>
    );
}

export default AddTodo;