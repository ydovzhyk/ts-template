import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserMessage } from '../../../Redux/auth/auth-slice';
import { clearTodoMessage, statusStopResetMessage } from '../../../Redux/todo/todo-slice';

import Text from '../Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './Message.module.scss';

interface IMessageProps {
  text: string;
  onDismiss: () => void;
  onChoice?: (choice: true | false) => void;
  type: string;
}

const Message: React.FC<IMessageProps> = ({ text, onDismiss, onChoice, type }) => {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);
  const [isShowChoiceBtn, setIsShowChoiceBtn] = useState(false);

  useEffect(() => {
    if (text === 'You have tasks saved locally on your computer, would you like to synchronize them with the server?') {
      setIsShowChoiceBtn(true);
    } else {
      setIsShowChoiceBtn(false);
    }
  }, [text]);

  onDismiss();

  const handleDismissClick = () => {
    setIsDisplayed(false);
    if (type === 'auth') {
      dispatch(clearUserMessage());
    } if (type === 'todo') {
      dispatch(clearTodoMessage());
      dispatch(statusStopResetMessage(false));
    }
  };

  const handleConfirmClick = (choice: true | false) => {
    if (onChoice) {
      onChoice(choice);
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
      {isShowChoiceBtn && (<div className={s.ButtonsBlock}>
        <button
          className={s.btnYes}
          onClick={() => handleConfirmClick(true)}
        >
          Yes
        </button>
        <button
          className={s.btnNo}
          onClick={() => handleConfirmClick(false)}
        >
          No
        </button>
      </div>
      )}
    </div>
  );
}

export default Message;