import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';
const NotFoundPage = () => {
  return (
    <div className={css.notFound}>
      <h1 className={css.title}>Ooops, page is not found</h1>
      <nav className={css.nav}>
        <Link className={css.navLink} to={'/'}>
          Home
        </Link>
        <Link className={css.navLink} to={'/movies'}>
          Movies
        </Link>
      </nav>
    </div>
  );
};

export default NotFoundPage;
