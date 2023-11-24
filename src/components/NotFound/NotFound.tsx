import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Shared/Button/Button';
import Text from '../Shared/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './NotFound.module.scss';

interface NotFoundProps {
  textContent: string;
  backLink: string;
  classComp: string;
}

const NotFound: React.FC<NotFoundProps> = ({ textContent, backLink, classComp }) => {
  const navigate = useNavigate();

  const handleDismissClick = () => {
    navigate('/');
  };

  return (
    <div className={s[classComp]}>
      <button className={s.dismissButton} onClick={handleDismissClick}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <div className={s.boo}>
        <div className={s.face} id="face"></div>
      </div>
      <div className={s.shadow}></div>

      <Text text="Oh!" textClass="textMessage" />
      <Text text={textContent} textClass="textMessageNotFound" />

        <Link to={backLink}>
          <Button text="Go back" btnClass="btnLight" />
        </Link>
    </div>
  );
};

export default NotFound;
