import { fetchTopRatedMovies } from "../actions";
import MoviesArticle from "../components/MoviesArticle";
import LoadMore from "./LoadMore";

export default async function TopRatedPage() {
    const moviesData = await fetchTopRatedMovies(1);

    return (
        <div className="max-w-7xl mx-auto px-4 pb-5">
            <section className="mt-20 mb-3 flex">
                <h1 className="text-3xl mb-1">Top Rated Movies</h1>
                
            </section>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4 mb-4">
                {moviesData.map((movie: any, index: number) =>
                    <MoviesArticle key={index} movie={movie} />
                )}

            </section>
            <LoadMore />
        </div>
    )
}