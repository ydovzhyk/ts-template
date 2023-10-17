import Text from '../Shared/Text';
import UserInfo from '../UserInfo';
import s from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.group}>
                    <ul className={s.pagesList}>
                        <li>
                            <Text text={'CREATE TODO'} textClass="title" />
                        </li>
                        <li>
                            <Text text={'TODO LIST'} textClass="title" />
                        </li>
                    </ul>
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