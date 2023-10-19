import { NavLink } from 'react-router-dom';
import UserInfo from '../UserInfo';

import s from './Header.module.scss';

const Header: React.FC = () => {

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
                        <NavLink className={`${customClassName(false)} ${s.lastLink}`} to="/task/list">
                            Список завдань
                        </NavLink>
                    </div>
                    <div className={s.authSection}>
                        <UserInfo />
                        {/* <Text text={'AUTHORIZE'} textClass="title" /> */}
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;