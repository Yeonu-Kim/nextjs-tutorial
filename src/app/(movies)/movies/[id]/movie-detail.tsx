import { apiGenerator } from '@/api';
import type { Movie } from '@/entities/movie';
import type { Video } from '@/entities/video';
import { PATH } from '@/entities/path';
import Image from 'next/image';

export const MovieDetail = async ({ movieId }: { movieId: string }) => {
  const [movieResponse, videoResponse] = await Promise.all([
    apiGenerator<unknown, Movie>({
      path: PATH.MOVIE_DETAIL({ movieId }),
      method: 'GET',
    }),
    apiGenerator<unknown, Video[]>({
      path: PATH.MOVIE_VIDEOS({ movieId }),
      method: 'GET',
    }),
  ]);

  if (movieResponse.type === 'error') {
    return <div>{movieResponse.message}</div>;
  }

  if (videoResponse.type === 'error') {
    return <div>{videoResponse.message}</div>;
  }

  const { adult, backdrop_path, overview, original_title } = movieResponse.data;
  const videos = videoResponse.data;

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
      <div>
        {videos.map((video) => (
          <div key={video.id}>{video.name}</div>
        ))}
      </div>
    </div>
  );
};
