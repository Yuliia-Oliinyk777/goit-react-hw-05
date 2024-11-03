import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/movies'}>Movies</NavLink>
    </header>
  );
};

export default Header;
