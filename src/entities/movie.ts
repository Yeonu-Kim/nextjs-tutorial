export type MovieResponse = {
  adult: boolean;
  backdrop_path: string;
  genre_id: number[];
  id: string;
  original_language: 'en' | 'ko';
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
