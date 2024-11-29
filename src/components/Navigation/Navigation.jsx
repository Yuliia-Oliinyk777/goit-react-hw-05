import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import css from './Navigation.module.css';

const linkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink className={linkClass} to={'/'}>
          Home
        </NavLink>
        <NavLink className={linkClass} to={'/movies'}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
