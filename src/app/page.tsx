import MovieBanner from "./components/(home)/MovieBanner";
import TrendingMovies from "./components/(home)/TrendingMovies";
import PopularShows from "./components/(home)/PopularShows";
import TopRatedMovies from "./components/(home)/TopRatedMovies";
import GenreExplorer from "./components/(home)/GenreExplorer";
// import Footer from "./components/(home)/Footer";

export default function Home() {
  return (
    <div>
      <MovieBanner />
      <main className="max-w-7xl mx-auto px-4 flex flex-col gap-y-10 py-10">
        <TrendingMovies />
        <PopularShows />
        <TopRatedMovies />
        {/* <Footer /> */}
        <GenreExplorer />
      </main>
    </div>
  );
}