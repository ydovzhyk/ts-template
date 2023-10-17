import { Outlet } from 'react-router-dom';

import s from './Auth.module.scss';

const Auth: React.FC = () => {

    return (
        <>
            <Outlet />
        </>
    );
};

export default Auth;