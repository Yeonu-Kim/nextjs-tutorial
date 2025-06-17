import { Suspense } from 'react';
import { MovieDetail } from '@/components/movies/movie-detail';
import { VideoList } from '@/components/movies/video-list';

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  return (
    <div>
      <Suspense fallback={<h1>Loading Movie Detail...</h1>}>
        <MovieDetail movieId={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading videos...</h1>}>
        <VideoList movieId={id} />
      </Suspense>
    </div>
  );
}
