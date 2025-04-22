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
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-zinc-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div ref={ref} className="h-1 invisible" />
    </section>
  );
}