import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserMessage } from '../../../Redux/auth/auth-slice';
import { clearTodoMessage } from '../../../Redux/todo/todo-slice';

import Text from '../Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './Message.module.scss';

interface IErrorMessageProps {
  text: string;
  onDismiss: () => void;
  type: string;
}

const Message: React.FC<IErrorMessageProps> = ({ text, onDismiss, type }) => {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);

  onDismiss();

  const handleDismissClick = () => {
    setIsDisplayed(false);
    if (type === 'auth') {
      dispatch(clearUserMessage());
    } if (type === 'todo') {
      dispatch(clearTodoMessage());
    }
  };

  useEffect(() => {
    setIsDisplayed(true);
  }, [text]);

  if (!isDisplayed) {
    return null;
  }

  return (
    <div className={s.message}>
      <button className={s.dismissButton} onClick={handleDismissClick}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <div className={s.boo}>
        <div className={s.face} id="face"></div>
      </div>
      <div className={s.shadow}></div>

      <Text text={text} textClass="textMessage" />
    </div>
  );
}

export default Message;