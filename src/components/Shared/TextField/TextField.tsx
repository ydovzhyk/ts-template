import { forwardRef, ChangeEventHandler, useState } from 'react';
import { FieldError, Control } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';

import s from './TextField.module.scss';

export interface ITextFieldProps {
  type?: string;
  name?: string;
  value?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  title?: string;
  className?: string;
  error?: FieldError;
  control?: Control<any>; 
}

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>((props, ref) => {
  const labelClass = props.className ? `${s.label} ${s[props.className]}` : `${s.label}`;
  const inputClass = props.className ? `${s.input} ${s[props.className]}` : `${s.input}`;
  const spanClass = props.className ? `${s.span} ${s[props.className]}` : `${s.span}`;

  const [isValue, setIsValue] = useState<boolean>(false);
  
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    if (props.handleChange) {
      props.handleChange(e);
    }
    if (newValue !== '') {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
  };

  return (
      <label className={labelClass}>
        <input
          ref={ref}
          className={inputClass}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={handleInputChange}
          required={props.required}
          title={props.title}
      />
      {props.className === 'search' && !isValue &&
        <span className={spanClass}>
          <CiSearch size={24} style={{ marginRight: '10px', marginLeft: '10px'}}/>
          {props.placeholder}
        </span>}
      {props.className !== 'search' && !isValue &&
        <span className={spanClass}>{props.placeholder}
        </span>}
        {props.error && <p className={s.error}>{props.title}</p>}
      </label>
  );
});

export default TextField;

