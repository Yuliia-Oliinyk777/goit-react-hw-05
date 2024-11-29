import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './MoviesPage.module.css';

import { fetchQueryMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchInputRef = useRef();

  const query = searchParams.get('query') ?? '';

  const handleSearch = event => {
    event.preventDefault();
    const form = event.target;
    const searchTerm = form.elements.search.value.trim();

    setSearchParams({ query: searchTerm });

    searchInputRef.current.value = '';
  };

  useEffect(() => {
    const getQueryMovies = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        const data = await fetchQueryMovies(query);

        setMovies(data || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getQueryMovies();
  }, [query]);

  return (
    <div className={css.movieWrap}>
      <form className={css.searchForm} onSubmit={handleSearch}>
        <input
          className={css.input}
          ref={searchInputRef}
          name="search"
          type="text"
          defaultValue={query}
          placeholder="Search for movies..."
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <MovieList className={css.list} movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
