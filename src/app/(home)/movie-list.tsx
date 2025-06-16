'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiGenerator } from '@/api';

type MovieResponse = {
  adult: boolean;
  backdrop_path: string;
  genre_id: number[];
  id: string;
  original_language: 'en' | 'ko';
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const MovieList = () => {
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMovies = useCallback(async () => {
    const response = await apiGenerator<unknown, MovieResponse[]>({
      path: '/movies',
      method: 'GET',
    });
    if (response.type === 'success') {
      setMovies(response.data);
      return;
    }
    setError(response.message);
  }, []);

  useEffect(() => {
    getMovies()
      .catch(() => {
        setError('데이터를 불러오는 데 실패했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getMovies, setLoading, setError]);

  if (loading === true) {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <p>{movie.original_title}</p>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};
