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

export const MovieList = async () => {
  const response = await apiGenerator<unknown, MovieResponse[]>({
    path: '/movies',
    method: 'GET',
  });

  if (response.type === 'error') {
    return <div>{response.message}</div>;
  }

  const movies = response.data;

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
