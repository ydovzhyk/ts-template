import s from './Text.module.scss';

interface ITextProps {
    textClass: string;
    text: string;
}

const Text: React.FC<ITextProps> = ({ textClass, text }) => {
  return <p className={s[textClass]}>{text}</p>;
}

export default Text;