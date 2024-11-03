import { useState } from 'react';
import style from './SearchBar.module.css';
import { MdOutlineSearch } from 'react-icons/md';
import toast from 'react-hot-toast';
const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const onFieldChange = event => {
    setQuery(event.target.value);
  };
  const onSearchSubmit = event => {
    event.preventDefault();
    if (!query.trim()) {
      toast.error('You need to enter text to search for images.', {
        position: 'top-center',
        duration: 1000,
        style: { color: '#ffffff', backgroundColor: 'red' },
      });
      return;
    }

    onSubmit(query);
    setQuery('');
  };
  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={onSearchSubmit}>
        <input
          className={style.searchInput}
          type="text"
          value={query}
          onChange={onFieldChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={style.searchBtn} type="submit">
          <MdOutlineSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
