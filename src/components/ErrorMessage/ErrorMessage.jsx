import style from './ErrorMessage.module.css';
import { PiSmileySadBold } from 'react-icons/pi';

const ErrorMessage = ({ error }) => {
  return (
    <div className={style.errorWrap}>
      <PiSmileySadBold className={style.sad} size={80} />
      <p className={style.error}>{error}</p>
    </div>
  );
};

export default ErrorMessage;
