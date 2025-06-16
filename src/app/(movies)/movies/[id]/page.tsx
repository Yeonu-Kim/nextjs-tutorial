import { MovieDetail } from './movie-detail';

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  return <MovieDetail movieId={id} />;
}
