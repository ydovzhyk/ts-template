import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import AddTodoId from './components/AddTodoId/AddTodoId';
import Header from './components/Header/Header';
import { IItem } from './components/types/todo';

const App1: React.FC = () => {
  
  const [todos, setTodos] = useState<IItem[]>([]);
  const [newTodo, setNewTodo] = useState<IItem>({ id: 0, title: '' });
  const [isMessageId, setIsMessageId] = useState<boolean>(false);
  const [isMessageTitle, setIsMessageTitle] = useState<boolean>(false); 

  useEffect(() => {
    const storedTodos = localStorage.getItem('ts-template_todosArray');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(
        'ts-template_todosArray',
        JSON.stringify(todos)
      );
    } else {
      return;
    }
  }, [todos])

  useEffect(() => {
    if (isMessageId && isMessageTitle) {
      setTodos((prevTodo) => ([
        ...prevTodo,
        newTodo
      ]
      ));
      setIsMessageId(false);
      setIsMessageTitle(false);
    } else {
      return;
    }
  }, [isMessageId, isMessageTitle, newTodo, todos]);

  const todoAddHandlerId = (todo: IItem): void => {
    setNewTodo((prevTodo) => ({
    title: prevTodo.title,
    id: todo.id
    }));
    setIsMessageId(true);
  };

  const todoAddHandlerTitle = (todo: IItem): void => {
    setNewTodo((prevTodo) => ({
    id: prevTodo.id,
    title: todo.title
    }));
    setIsMessageTitle(true);
  };

  const todoRemoveHandler = (id: number): void => {
    setTodos((prevTodos) => {
      return prevTodos.filter((item) => {
        return item.id !== id;
      });
    })
  };

  return (
    <>
      <Header />
      <div className="App">
        <TodoList onRemoveTodo={todoRemoveHandler} todos={todos} />
        <AddTodoId onAddTodoId={todoAddHandlerId} />
        <AddTodo onAddTodoTitle={todoAddHandlerTitle} />
      </div>
      {!isMessageId && isMessageTitle && <p>Додайте id</p>}
      {isMessageId && !isMessageTitle && <p>Додайте title</p>}
    </>
  );
}

export default App1;
