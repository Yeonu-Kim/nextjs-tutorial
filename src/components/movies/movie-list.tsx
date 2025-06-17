import { apiGenerator } from '@/api';
import { PATH } from '@/entities/path';
import type { MovieBrief } from '@/entities/movie';
import Image from 'next/image';
import Link from 'next/link';

export async function MovieList() {
  const response = await apiGenerator<unknown, MovieBrief[]>({
    path: '/movies',
    method: 'GET',
  });

  if (response.type === 'error') {
    return (
      <div className="text-red-500 text-center py-10">{response.message}</div>
    );
  }

  const movies = response.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={PATH.MOVIE_DETAIL({ movieId: movie.id })}
          className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 rounded-xl hover:shadow hover:bg-gray-100 transition p-4"
        >
          {/* 포스터 이미지 */}
          <div className="relative w-full sm:w-1/3 aspect-[2/3] sm:aspect-[2/3] rounded-lg overflow-hidden">
            <Image
              src={movie.poster_path}
              alt={movie.original_title}
              fill
              className="object-cover"
            />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                {movie.title}{' '}
                {movie.adult && (
                  <span className="text-red-500 text-sm">🔞</span>
                )}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {movie.overview}
              </p>
            </div>
            <div className="mt-3 text-sm text-gray-500 space-y-1">
              <div>📅 개봉일: {movie.release_date}</div>
              <div>
                ⭐ 평점: {movie.vote_average.toFixed(1)} ({movie.vote_count}
                명)
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
