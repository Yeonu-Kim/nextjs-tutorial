import { apiGenerator } from '@/api';
import type { MovieResponse } from '@/entities/movie';
import { PATH } from '@/entities/path';
import Image from 'next/image';

export const MovieDetail = async ({ movieId }: { movieId: string }) => {
  const response = await apiGenerator<unknown, MovieResponse>({
    path: PATH.MOVIE_DETAIL({ movieId }),
    method: 'GET',
  });

  if (response.type === 'error') {
    return <div>{response.message}</div>;
  }

  const { adult, backdrop_path, overview, original_title } = response.data;

  return (
    <div>
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={backdrop_path}
          alt={`${original_title}'s poster`}
          fill
          className="object-contain"
        />
      </div>
      <p>{original_title}</p>
      <span>{adult && '🔞'}</span>
      <p>{overview}</p>
    </div>
  );
};
