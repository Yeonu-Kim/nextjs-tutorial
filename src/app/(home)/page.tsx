import { MovieList } from '@/components/movies/movie-list';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-3xl">Today&apos;s Movies</h1>
      <MovieList />
    </div>
  );
}
