import { apiGenerator } from '@/api';
import { PATH } from '@/entities/path';
import Link from 'next/link';
import type { Movie } from '@/entities/movie';

export async function MovieList() {
  const response = await apiGenerator<unknown, Movie[]>({
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
          <Link href={PATH.MOVIE_DETAIL({ movieId: movie.id })}>
            <p>{movie.original_title}</p>
            <p>{movie.overview}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
