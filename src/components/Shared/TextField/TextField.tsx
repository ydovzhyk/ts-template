import { forwardRef, ChangeEventHandler } from 'react';
import { FieldError, Control } from 'react-hook-form';

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

  return (
    <div className={s.groupInput}>
      <label className={labelClass}>
        <input
          ref={ref}
          className={inputClass}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          required={props.required}
          title={props.title}
        />
        <span className={props.value ? `${spanClass} ${s.value}` : spanClass}>{props.placeholder}</span>
        {props.error && <p className={s.error}>{props.title}</p>}
      </label>
    </div>
  );
});

export default TextField;

