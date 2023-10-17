import React, { ReactNode } from 'react';
import s from './Container.module.scss'

interface ContainerProps {
    children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return <div className={s.container}>{children}</div>;
};

export default Container;