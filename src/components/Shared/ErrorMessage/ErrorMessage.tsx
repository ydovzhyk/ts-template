import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserError } from '../../../Redux/auth/auth-slice';

import Text from '../Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './ErrorMessage.module.scss';

interface IErrorMessageProps {
    text: string;
    onDismiss: () => void;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ text, onDismiss }) => {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);

  const handleDismissClick = () => {
    setIsDisplayed(false);
    onDismiss();
    dispatch(clearUserError());
  };

  useEffect(() => {
    setIsDisplayed(true);
  }, [text]);

  if (!isDisplayed) {
    return null;
  }

  return (
    <div className={s.errorMessage}>
      <button className={s.dismissButton} onClick={handleDismissClick}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <div className={s.boo}>
        <div className={s.face} id="face"></div>
      </div>
      <div className={s.shadow}></div>

      <h1 className={s.title}>Ups...</h1>
      <Text text={text} textClass="textError" />
    </div>
  );
}

export default ErrorMessage;