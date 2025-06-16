export const PATH = {
  HOME: '/',
  ABOUT_US: '/about-us',
  MOVIE_DETAIL: ({ movieId }: { movieId: string }) => `/movies/${movieId}`,
  MOVIE_VIDEOS: ({ movieId }: { movieId: string }) =>
    `/movies/${movieId}/videos`,
};
