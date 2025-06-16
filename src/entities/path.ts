export const PATH = {
  HOME: '/',
  ABOUT_US: '/about-us',
  MOVIE_DETAIL: ({ movieId }: { movieId: string }) => `/movies/${movieId}`,
};
