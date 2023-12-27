import { ChangeEvent, forwardRef, ChangeEventHandler, useState, useEffect, useCallback} from 'react';
import { FieldError, Control } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { CiSearch } from 'react-icons/ci';

import s from './TextField.module.scss';

export interface ITextFieldProps {
  type?: string;
  name?: string;
  value?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string | string[];
  required?: boolean;
  title?: string;
  className?: string;
  error?: FieldError;
  control?: Control<any>;
  onFocus?: () => void;
  onBlur?: () => void;
  clearTextField?: boolean;
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>((props, ref) => {
  const labelClass = props.className ? `${s.label} ${s[props.className]}` : `${s.label}`;
  const inputClass = props.className ? `${s.input} ${s[props.className]}` : `${s.input}`;
  const spanClass = props.className ? `${s.span} ${s[props.className]}` : `${s.span}`;
  const clearTextField = props.clearTextField;
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const [inputValue, setInputValue] = useState<string>(props.value || '');

  const [isValue, setIsValue] = useState<boolean>(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; 
    setInputValue(newValue);

    if (props.handleChange) {
      props.handleChange(e);
    }
    if (newValue !== '') {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
  }, [props]);

  useEffect(() => { 
    if (props.value === '') {
      setInputValue('');
    }
  }, [props.value]);

  //скидуэмо значення Input коли користувач був обраний
  useEffect(() => {
    if (clearTextField) {
      setInputValue('');
      setIsValue(false);
      const fakeEvent = {
        target: {
          value: '',
        },
      } as ChangeEvent<HTMLInputElement>;

      handleInputChange(fakeEvent);
    } else {
      return;
    }
  }, [clearTextField, handleInputChange]);
  
  const handleFocus = () => {
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const handleBlur = () => {
    if (props.onBlur) {
      props.onBlur();
    }
  };

  return (
      <label className={labelClass}>
        <input
          ref={ref}
          className={inputClass}
          type={props.type}
          name={props.name}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={props.required}
          title={props.title}
      />
      {(props.className === 'search' || props.className === 'searchIST') && !isValue &&
        <span className={spanClass}>
          <CiSearch size={24} style={{ marginRight: isTablet ? '5px' : '10px', marginLeft: '10px'}}/>
          {props.placeholder}
        </span>
      }
      {props.className !== 'search' && props.className !== 'searchIST' && !isValue &&
        <span className={spanClass}>
          {props.placeholder}
        </span>
      }
        {props.error && <p className={s.error}>{props.title}</p>}
      </label>
  );
});

export default TextField;

