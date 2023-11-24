import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getLogin } from '../../Redux/auth/auth-selectors';
import Text from '../../components/Shared/Text';
import EditTodo from '../../components/EditTodo/EditTodo';

const EditPage: React.FC = () => {

    const isUserLogin = useSelector(getLogin);
    const location = useLocation();
    const todoData = location.state;

    return (
        <>
        {!isUserLogin && (
            <Text
                text={'Зареєструйтесь, щоб отримати доступ до ваших завдань на різних пристроях'}
                textClass="catalogTitle"
            />
        )}
        <EditTodo todoData={todoData} />
        </>
    );
};

export default EditPage;