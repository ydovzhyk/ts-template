import s from './Button.module.scss';

interface IBottonProps {
    text: string;
    type?: "submit" | "button" | "reset";
    btnClass: string;
    handleClick?: () => void;
}

const Button: React.FC<IBottonProps> = ({
    text = '',
    type = 'submit',
    btnClass = 'btnDark',
    handleClick,
}) => {
  return (
    <button className={s[btnClass]} onClick={handleClick} type={type}>
      {text}
    </button>
  );
};

export default Button;