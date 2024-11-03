import style from './Loader.module.css';
import { Bars } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={style.loader}>
      <Bars
        height="80"
        width="80"
        color="rgb(61, 61, 198)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
