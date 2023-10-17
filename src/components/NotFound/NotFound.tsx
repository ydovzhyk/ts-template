import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from '../Shared/Button/Button';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './NotFound.module.scss';

interface NotFoundProps {
  textContent: string;
  backLink: string;
  classComp: string;
}

const NotFound: React.FC<NotFoundProps> = ({ textContent, backLink, classComp }) => {
  const [isDisplayed, setIsDisplayed] = useState(true);

  const handleDismissClick = () => {
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

      <h1 className={s.title}>Oh!</h1>
      <h1 className={s.title}>{textContent}</h1>

        <Link to={backLink}>
          <Button text="Go back" btnClass="btnDark" />
        </Link>
    </div>
  );
};

export default NotFound;
