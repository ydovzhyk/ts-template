import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getLogin } from '../../Redux/auth/auth-selectors';
import UserInfo from '../UserInfo';
import Text from '../Shared/Text';

import s from './Header.module.scss';

const Header: React.FC = () => {
    const isUserLogin = useSelector(getLogin);

    const customClassName = (active: boolean) => {
        if (active) {
            return `${s.link} ${s.active}`;
        } else {
            return s.link;
        }
    };

    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.group}>
                    <div className={s.navigationMenuWrapper}>
                        <NavLink className={customClassName(true)} to="/" end>
                            Створити завдання
                        </NavLink>
                        <NavLink className={`${customClassName(false)} ${s.lastLink}`} to="/list">
                            Список завдань
                        </NavLink>
                    </div>
                    <div className={s.authSection}>
                        <UserInfo />
                    </div>
                </div>
                {!isUserLogin && (
                    <Text
                        text={'Зареєструйтесь, щоб отримати доступ до ваших завдань на різних пристроях'}
                        textClass="warningTitle"
                    />
                )}
            </div>
        </header>
    )
};

export default Header;