import { Oval } from 'react-loader-spinner';

import s from './Loader.module.scss';

const Loader: React.FC = () => {

  return (
    <div className={s.loader}>
      <Oval
        height="130"
        width="130"
        color="#fbef35"
        secondaryColor="transparent"
      />
    </div>
  );
};

export default Loader;