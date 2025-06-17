import { apiGenerator } from '@/api';
import type { Video } from '@/entities/video';
import { PATH } from '@/entities/path';

export const VideoList = async ({ movieId }: { movieId: string }) => {
  const response = await apiGenerator<unknown, Video[]>({
    path: PATH.MOVIE_VIDEOS({ movieId }),
    method: 'GET',
  });

  if (response.type === 'error') {
    return <div>{response.message}</div>;
  }

  const videos = response.data;

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>{video.name}</div>
      ))}
    </div>
  );
};
