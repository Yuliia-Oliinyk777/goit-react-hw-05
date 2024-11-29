import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchMovieById } from '../../api.js';

import Loader from '../../components/Loader/Loader.jsx';

import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
const linkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBack = useRef(location.state ?? '/movies');

  useEffect(() => {
    const getMuvieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieById(movieId);

        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMuvieDetails();
  }, [movieId]);

  if (!movie) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      <Link to={goBack.current}>
        <button className={css.backBtn}>Go back</button>
      </Link>

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div>
        <div className={css.movieWrap}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
          />
          <div>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.text}>
              Release date: &nbsp; {movie.release_date}
            </p>
            <p className={css.text}>Raiting: &nbsp;{movie.vote_average}</p>
            <h3 className={css.subtitle}>Genres</h3>
            <p className={css.text}>
              {movie.genres.map(genre => genre.name).join(', ')}
            </p>
            <h3 className={css.subtitle}>Overview</h3>
            <p className={css.text}>{movie.overview}</p>
          </div>
        </div>
        <div className={css.additionalWrap}>
          <h3 className={css.additional}>Additional Information</h3>
          <ul>
            <li className={css.link}>
              <NavLink className={linkClass} to="cast" state={location.state}>
                Cast
              </NavLink>
            </li>
            <li className={css.link}>
              <NavLink
                className={linkClass}
                to="reviews"
                state={location.state}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
