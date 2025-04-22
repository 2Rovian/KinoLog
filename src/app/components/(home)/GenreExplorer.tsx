'use client'
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchGenreExplorer } from "@/app/actions";
import MoviesArticle from "../MoviesArticle";

let page = 1;
let currentGenre = 28;

export default function GenreExplorer() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const defaultGenres = [
    { id: 28, name: "Action" },
    { id: 18, name: "Drama" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Sci-Fi" }
  ];

  const loadMovies = async (genre: number, reset = false) => {
    setLoading(true);
    try {
      const newData = await fetchGenreExplorer(genre, reset ? 1 : page);
      if (reset) {
        page = 2;
        currentGenre = genre;
        setData(newData);
      } else {
        setData(prev => [...prev, ...newData]);
        page++;
      }
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView && !loading) {
      loadMovies(currentGenre);
    }
  }, [inView]);

  useEffect(() => {
    loadMovies(currentGenre, true);
  }, []);

  return (
    <section className="">
      <div className="mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl mb-1">Genre Explorer</h1>
          <p className="text-zinc-400">Discover films by genre</p>
        </div>
        <div className="flex flex-wrap gap-2 my-1"> {/* Alterado para flex-wrap */}
          {defaultGenres.map(genre => (
            <button
              key={genre.id}
              onClick={() => loadMovies(genre.id, true)}
              disabled={loading}
              className={`px-4 py-1 rounded-lg border transition-colors cursor-pointer
                ${currentGenre === genre.id
                  ? 'bg-amber-600/20 text-amber-600 border-amber-600/30'
                  : 'bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:bg-zinc-700/50'}
                ${loading ? 'opacity-50' : ''}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4 mb-4">
        {data.map((movie, index) => (
          <MoviesArticle key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      {loading && (
        <div className='flex justify-center my-5'>
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-100"></div>
          </div>
        </div>
      )}

      <div ref={ref} className="h-1 invisible" />
    </section>
  );
}