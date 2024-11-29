import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api';

import css from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const defaultImage =
    'https://kinorium-images.s3.amazonaws.com/web/placeholder_person_male.svg';

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCast();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <ul className={css.list}>
        {cast.map(actor => (
          <li className={css.item} key={actor.cast_id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : defaultImage
              }
              alt={actor.name}
              width={100}
            />
            <h3> {actor.name}</h3>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
