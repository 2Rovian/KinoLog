"use server"
import { genreOptions } from "./data";
import { countryOptions } from "./data";

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

export const fetchMovieByFilter = async (filters: {
    genre?: string;
    country?: string;
    year?: string;
    page?: number;
}) => {
    // Convert filter names to API parameters
    const genreId = genreOptions.find(g => g.name === filters.genre)?.id;
    const countryCode = countryOptions.find(c => c.name === filters.country)?.code;

    // Build the API URL
    const url = new URL(`https://api.themoviedb.org/3/discover/movie`);
    url.searchParams.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY || '');
    url.searchParams.append('language', 'en-US');
    url.searchParams.append('page', filters.page?.toString() || '1');

    if (genreId) {
        url.searchParams.append('with_genres', genreId.toString());
    }
    if (countryCode) {
        url.searchParams.append('with_origin_country', countryCode);
    }
    if (filters.year) {
        url.searchParams.append('primary_release_year', filters.year);
    }

    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching filtered movies:", error);
        return [];
    }
};

export const fetchSeriesByFilter = async (filters: {
    genre?: string;
    country?: string;
    year?: string;
    page?: number;
}) => {
    // Convert filter names to API parameters
    const genreId = genreOptions.find(g => g.name === filters.genre)?.id;
    const countryCode = countryOptions.find(c => c.name === filters.country)?.code;

    // Build the API URL
    const url = new URL(`https://api.themoviedb.org/3/discover/tv`);
    url.searchParams.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY || '');
    url.searchParams.append('language', 'en-US');
    url.searchParams.append('page', filters.page?.toString() || '1');

    if (genreId) {
        url.searchParams.append('with_genres', genreId.toString());
    }
    if (countryCode) {
        url.searchParams.append('with_origin_country', countryCode);
    }
    if (filters.year) {
        url.searchParams.append('first_air_date_year', filters.year);
    }

    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching filtered series:", error);
        return [];
    }
};
