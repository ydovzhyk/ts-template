import TodoList from './../../components/TodoList/TodoList';
import { useSelector } from 'react-redux';
import { getLogin } from '../../Redux/auth/auth-selectors'
import Text from '../../components/Shared/Text';
import CreateTodo from '../../components/CreateTodo';

import s from './HomePage.module.scss'

const HomePage: React.FC = () => {

  const isUserLogin = useSelector(getLogin);

  // const todoRemoveHandler = (id: number): void => {
  //   setTodos((prevTodos) => {
  //     return prevTodos.filter((item) => {
  //       return item.id !== id;
  //     });
  //   })
  // };


  return (
    <>
      {!isUserLogin && (
        <Text
          text={'Зареєструйтесь, щоб отримати доступ до ваших завдань на різних пристроях'}
          textClass="catalogTitle"
        />
      )}
      <CreateTodo/>
      {/* <TodoList onRemoveTodo={todoRemoveHandler} todos={todos} /> */}
    </>
  );
};

export default HomePage;
