import { useSelector } from 'react-redux';
import { getLogin } from '../../Redux/auth/auth-selectors'
import Text from '../../components/Shared/Text';
import CreateTodo from '../../components/CreateTodo';

const HomePage: React.FC = () => {

  const isUserLogin = useSelector(getLogin);

  return (
    <>
      {!isUserLogin && (
        <Text
          text={'Зареєструйтесь, щоб отримати доступ до ваших завдань на різних пристроях'}
          textClass="catalogTitle"
        />
      )}
      <CreateTodo/>
    </>
  );
};

export default HomePage;
