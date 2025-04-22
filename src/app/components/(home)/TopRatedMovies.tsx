import Link from "next/link";
import MoviesArticle from "../MoviesArticle";
import { FaArrowRight } from "react-icons/fa6";

export default async function TopRatedMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000`);
    const data = await response.json();
    const moviesData = data.results;

    return (
        <section>
            <div className="flex justify-between items-center mb-3">
                <h2 className='text-xl lg:text-3xl font-semibold '>Top Rated</h2>
                <Link href={"/top-rated"}>
                    <div className="flex gap-x-1 items-center text-zinc-400 cursor-pointer hover:text-zinc-300 hover-transition">
                        <span>See More</span>
                        <FaArrowRight />
                    </div>
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4">
                {moviesData.slice(0, 12).map((movie: any, index: number) =>
                    <MoviesArticle key={index} movie={movie} />
                )}

            </div>
        </section>
    )
}