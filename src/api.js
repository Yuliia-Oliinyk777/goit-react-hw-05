import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const MY_TMDB_API_KEY = 'e0358e22f2e7dc9df4c54b35fbac35ac';
export const MY_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDM1OGUyMmYyZTdkYzlkZjRjNTRiMzVmYmFjMzVhYyIsIm5iZiI6MTczMDU4Mzk0MS41ODU1NTM2LCJzdWIiOiI2NzI2OTk2MWMwOTAxMDk1ODBmOWMwMDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-epTDWAVYRVofMUlHWYjneAZu_MT0-I6sr5RWKAfZGM';

export const fetchPopularMovies = async () => {
  const { data } = await axios.get(
    '/movie/popular',

    {
      params: {
        api_key: MY_TMDB_API_KEY,
        language: 'en-US',
        page: 1,
        per_page: 40,
      },
      headers: {
        Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
      },
    }
  );
  return data;
};

export const fetchQueryMovies = async query => {
  const { data } = await axios.get('/search/movie', {
    params: {
      api_key: MY_TMDB_API_KEY,
      query: query,
      language: 'en-US',
      page: 1,
    },
    headers: { Authorization: `Bearer ${MY_ACCESS_TOKEN}` },
  });

  return data.results;
};

export const fetchMovieById = async id => {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      api_key: MY_TMDB_API_KEY,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
    },
  });

  return data;
};

export const fetchMovieCast = async id => {
  const { data } = await axios.get(`/movie/${id}/credits`, {
    params: {
      api_key: MY_TMDB_API_KEY,
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
    },
  });
  return data;
};

export const fetchMovieReviews = async id => {
  const { data } = await axios.get(`/movie/${id}/reviews`, {
    params: {
      api_key: MY_TMDB_API_KEY,
    },
    headers: {
      Authorization: `Bearer ${MY_ACCESS_TOKEN}`,
    },
  });
  return data;
};
