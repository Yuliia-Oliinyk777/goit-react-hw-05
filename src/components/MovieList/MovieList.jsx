import { Link, useLocation } from 'react-router-dom';

import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  const defaultImage =
    'https://kinorium-images.s3.amazonaws.com/web/placeholder_person_male.svg';
  return (
    <div className={css.listWrap}>
      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.link}>
            <Link
              to={
                location.pathname === '/'
                  ? `/movies/${movie.id}`
                  : `${movie.id}`
              }
              state={location}
            >
              <img
                className={css.poster}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : defaultImage
                }
                alt={movie.title}
              />
              <h3 className={css.name}>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
