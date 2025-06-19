import { Suspense } from 'react';
import { MovieDetail } from '@/components/movies/movie-detail';
import { VideoList } from '@/components/movies/video-list';
import { apiGenerator } from '@/api';
import type { Movie } from '@/entities/movie';
import { PATH } from '@/entities/path';

type Params = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { id } = await params;
  const response = await apiGenerator<unknown, Movie>({
    path: PATH.MOVIE_DETAIL({ movieId: id }),
    method: 'GET',
  });

  if (response.type === 'error') {
    return {
      title: 'Movie Detail',
      description: 'Welcome to the movie sites!',
    };
  }
  const { title, overview, backdrop_path } = response.data;
  return {
    title,
    description: overview,
    openGraph: {
      images: backdrop_path,
    },
  };
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
