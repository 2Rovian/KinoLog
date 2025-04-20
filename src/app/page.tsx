import Image from "next/image";
import MovieBanner from "./components/(home)/MovieBanner";
import TrendingMovies from "./components/(home)/TrendingMovies";
import PopularShows from "./components/(home)/PopularShows";
import TopRatedMovies from "./components/(home)/TopRatedMovies";


export default function Home() {
  return (
    <div>
      <MovieBanner />
      <main className="max-w-7xl mx-auto px-4 flex flex-col gap-y-10 py-10">
        <TrendingMovies />
        <PopularShows />
        <TopRatedMovies />
      </main>
    </div>
  );
}