import { apiGenerator } from '@/api';
import type { Video } from '@/entities/video';
import { PATH } from '@/entities/path';

export const VideoList = async ({ movieId }: { movieId: string }) => {
  const response = await apiGenerator<unknown, Video[]>({
    path: PATH.MOVIE_VIDEOS({ movieId }),
    method: 'GET',
  });

  if (response.type === 'error') {
    return (
      <div className="text-red-500 text-center py-10">{response.message}</div>
    );
  }

  const videos = response.data.filter((v) => v.site === 'YouTube');

  if (videos.length === 0) {
    return <div className="text-gray-500">등록된 영상이 없습니다.</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">🎬 트레일러 및 영상</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col gap-2"
          >
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
            <p className="text-sm text-gray-800">{video.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
