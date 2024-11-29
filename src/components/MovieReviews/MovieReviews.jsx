import { fetchMovieReviews } from '../../api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import css from './MovieReviews.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const defaultImage =
  'https://kinorium-images.s3.amazonaws.com/web/placeholder_person_male.svg';

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReview = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
        console.log(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReview();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {!error && reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map(review => (
            <li key={review.id}>
              <img
                className={css.photo}
                src={
                  review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                    : defaultImage
                }
                alt={review.author}
              />
              <h3 className={css.title}>Autor: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
