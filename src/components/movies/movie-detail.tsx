import { apiGenerator } from '@/api';
import type { Movie } from '@/entities/movie';
import { PATH } from '@/entities/path';
import Image from 'next/image';
import Link from 'next/link';

const formatCurrency = (amount: number) =>
  amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

export const MovieDetail = async ({ movieId }: { movieId: string }) => {
  const response = await apiGenerator<unknown, Movie>({
    path: PATH.MOVIE_DETAIL({ movieId }),
    method: 'GET',
  });

  if (response.type === 'error') {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        {response.message}
      </div>
    );
  }

  const {
    backdrop_path,
    poster_path,
    title,
    original_title,
    tagline,
    overview,
    genres,
    release_date,
    runtime,
    vote_average,
    vote_count,
    spoken_languages,
    production_companies,
    budget,
    revenue,
    homepage,
    status,
    adult,
  } = response.data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* 배경 이미지 */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md">
        <Image
          src={backdrop_path}
          alt={`${title} backdrop`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 포스터 */}
        <div className="relative w-full md:w-1/3 aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={poster_path}
            alt={`${title} poster`}
            fill
            className="object-cover"
          />
        </div>

        {/* 정보 패널 */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              {title} {adult && <span className="text-xl">🔞</span>}
            </h1>
            {title !== original_title && (
              <h3 className="text-xl font-light">{original_title}</h3>
            )}
            <p className="italic text-gray-500">{tagline}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm py--2 rounded-lg">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="border border-gray-900 px-2 py-0.5 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-gray-800 leading-relaxed">{overview}</p>

          <div className="text-sm space-y-1 text-gray-700">
            <div>
              <strong>개봉일:</strong> {release_date}
            </div>
            <div>
              <strong>러닝타임:</strong> {runtime}분
            </div>
            <div>
              <strong>상태:</strong> {status}
            </div>
            <div>
              <strong>언어:</strong>{' '}
              {spoken_languages.map((lang) => lang.english_name).join(', ')}
            </div>
            <div>
              <strong>평점:</strong> ⭐ {vote_average.toFixed(1)} ({vote_count}
              명 참여)
            </div>
            <div>
              <strong>예산:</strong> {formatCurrency(budget)}
            </div>
            <div>
              <strong>수익:</strong> {formatCurrency(revenue)}
            </div>
            {homepage && (
              <div>
                <strong>홈페이지:</strong>{' '}
                <Link
                  href={homepage}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  방문하기
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 제작사 */}
      {production_companies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">제작사</h2>
          <div className="flex flex-wrap gap-6">
            {production_companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center gap-2"
              >
                {company.logo_path && (
                  <div className="relative w-20 h-10">
                    <Image
                      src={company.logo_path}
                      alt={company.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="text-sm text-gray-800">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
