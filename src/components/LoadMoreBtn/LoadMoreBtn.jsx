import style from './LoadMoreBtn.module.css';
const LoadMoreBtn = ({ loadMore }) => {
  return (
    <div className={style.buttonWrap}>
      <button type="button" className={style.loadMore} onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};
export default LoadMoreBtn;
