"use server"

export const fetchTopRatedMovies = async (page: number) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=${page}`);
    const data = await response.json();
    const moviesData = data.results;
    return moviesData;
};

export const fetchTrendingMovies = async (page: number) => {
    // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=${page}`);
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`);

    const data = await response.json();
    const moviesData = data.results;
    return moviesData;
};

export const fetchPopularShows = async (page: number) => {
    // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=${page}`);
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&page=1&vote_count.gte=100&page=${page}`);
    // https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&page=1&vote_count.gte=100
    const data = await response.json();
    const moviesData = data.results;
    return moviesData;
};

export const fetchGenreExplorer = async (genreId: number, page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};