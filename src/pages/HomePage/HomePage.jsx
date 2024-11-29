import css from './HomePage.module.css';
import { fetchPopularMovies } from '../../api';

import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPopularMovies();

        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPopularMovies();
  }, []);
  return (
    <div className={css.homePage}>
      <h1 className={css.title}>Trending Movies</h1>

      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <MovieList className={css.list} movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
