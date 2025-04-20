import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


export default async function MovieBanner() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check if results exists and has items
    if (!data.results || data.results.length === 0) {
        throw new Error('No movie data available');
    }

    const movieData = data.results[0];

    return (
        <section className="mt-[0px]">
            <div className="relative">
                <Image src={`https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`}
                    width={500}
                    height={500}
                    alt={`${movieData.title} image`}
                    className="size-full max-h-[600px] object-cover"
                />
                {/* <div className="hidden md:block h-full w-[100%] absolute left-0 top-0 bg-gradient-to-r from-black to-90% div-ref">
                    <div className="w-full max-7-xl mx-auto">
                        <h2>{movieData.title}</h2>
                    </div>
                </div> */}
                <div className="hidden lg:block h-full w-full absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent">
                    <div className="size-full max-w-7xl mx-auto px-4 flex flex-col pt-28 gap-y-2">
                        <h2 className="text-6xl font-bold text-white w-[50%]">{movieData.title}</h2>
                        <p className="w-[30%]">{movieData.overview}</p>

                        <Link href={`/movies/${movieData.id}`}
                        className="rounded-full self-start mt-4"
                        >
                            <button className="px-4 py-2 flex gap-x-2 items-center bg-slate-100 text-slate-950 hover:bg-slate-200 rounded-full backdrop-blur-md  cursor-pointer duration-300 ease-in-out">
                                <span className="font-semibold">See Movie Details</span>
                                <span>
                                    <FaChevronRight />
                                </span>
                            </button>
                        </Link>

                    </div>
                </div>
                {/* Small Layout mobile */}
                <div className="absolute bottom-0 w-full px-4 bg-black/40 py-2 flex gap-x-2 lg:hidden justify-between">
                    <div className='flex gap-x-2'>
                        <div className="rounded-md overflow-hidden">
                            <Image src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                                width={40}
                                height={40}
                                alt={`${movieData.title} poster`}
                                loading="lazy"
                            >
                            </Image>
                        </div>
                        <div >
                            <p className="text-xl font-semibold text-slate-50 cursor-pointer ">{movieData.title}</p>
                            <div className="flex gap-x-2 mt-1 text-slate-200">
                                <span className="flex gap-x-1 items-center text-amber-500">
                                    <FaStar />
                                    {(movieData.vote_average).toFixed(1)}
                                </span>
                                <span>•</span>
                                <span>{(movieData.release_date).slice(0, 4)}</span>
                            </div>
                        </div>
                    </div>
                    <button className="px-4 py-2 self-start flex gap-x-2 items-center bg-slate-100 text-slate-950 hover:bg-slate-200 rounded-full backdrop-blur-md mt-4 cursor-pointer duration-300 ease-in-out">
                        <span className="font-semibold">Details</span>
                        <span>
                            <FaChevronRight />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    )
}