import React from 'react';
import Select, { StylesConfig } from 'react-select';

import s from './SelectField.module.scss';

interface ISelectFieldProps {
  name: string;
  value: string;
  handleChange: (selectedOption: any) => void;
  placeholder: string;
  required: boolean;
  options: { value: string; label: string }[];
  className?: string;
}

const customStyles: StylesConfig = {
  control: (provided: any, state) => ({
    ...provided,
    fontSize: '16px',
    height: '48px',
    color: 'var(--second-text-color)',
    pointerEvents: 'auto',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const backgroundColor = isSelected
        ? 'black'
        : isFocused
        ? 'rgba(0, 0, 0, 0.3)' 
        : 'white';

    const textColor = isSelected ? 'white' : 'black';

    return {
        ...styles,
        backgroundColor: isDisabled ? undefined : backgroundColor,
      color: isDisabled ? '#ccc' : textColor,
        height: '48px',
        lineHeight: '2rem',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled ? isSelected ? 'black' : 'rgba(0, 0, 0, 0.3)' : undefined,
        },
    };
  }
};

const SelectField: React.FC<ISelectFieldProps> = ({
  name,
  value,
  handleChange,
  placeholder,
  required,
  options,
  className,
}) => {
  const labelClass = className ? `${s.label} ${s[className]}` : `${s.label}`;
  const selectClass = className ? `${s.select} ${s[className]}` : `${s.select}`;

  return (
    <label className={labelClass}>
      <Select
        className={selectClass}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        options={options}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
          ...theme.colors,
          primary: 'black',
      },
    })}
      />
    </label>
  );
};

export default SelectField;
