import Image from 'next/image'
import { FaStar } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";

import Link from "next/link";
import NotFoundPage from '@/app/not-found';


export default async function MovieDetails({
    params,
}: {
    params: { movie_id: number };
}) {
    const { movie_id } = await params;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
        return (<NotFoundPage />);
    }
    const movieData = await response.json();
    
    return (
        <div className="max-w-7xl mx-auto px-4 pb-12 text-white">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-20">
                {/* Poster do filme */}
                <div className="w-full rounded-xl overflow-hidden shadow-lg relative group hover:outline-2 hover:outline-zinc-100 hover:shadow-lg hover-transition">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                        width={500}
                        height={750}
                        alt={movieData.title}
                        className="w-full h-auto object-cover"
                    />
                    <div className='absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40' />

                    <div className='absolute inset-0 flex items-center justify-center gap-x-4 text-zinc-200 text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50'>
                        <span className="cursor-pointer hover:text-white transition-colors">
                            <CiBookmark />
                        </span>

                    </div>
                </div>

                {/* Infos do filme */}
                <div className="md:col-span-2 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold">{movieData.title}</h1>

                        <button className="px-4 py-2 bg-zinc-200 hover:bg-white text-black rounded-md transition-all text-md cursor-pointer">
                            <CiBookmark />

                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-zinc-300">
                        <span className="flex gap-x-1 items-center text-amber-500">
                            <FaStar />
                            {(movieData.vote_average).toFixed(1)}
                        </span>
                        <span className='flex items-center gap-x-1 text-zinc-400'>
                            <BsCalendar2DateFill />
                            {movieData.release_date}
                        </span>
                        <span className='text-zinc-400'>ID: {movie_id}</span>
                    </div>

                    <p className="text-lg leading-relaxed text-zinc-200 mt-4">
                        {movieData.overview}
                    </p>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Left Column */}
                        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-400 mb-1">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movieData.genres.map((g: any) => (
                                            <span key={g.id} className="px-3 py-1 bg-amber-600/20 text-amber-400 rounded-full text-xs">
                                                {g.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400">Runtime</h3>
                                        <p>{movieData.runtime} min</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400">Status</h3>
                                        <p>{movieData.status}</p>
                                    </div>
                                </div>

                                {movieData.tagline && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400">Tagline</h3>
                                        <p className="italic text-amber-100">"{movieData.tagline}"</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-400">Spoken Languages</h3>
                                    <p>{movieData.spoken_languages.map((l: any) => l.english_name).join(', ')}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400">Budget</h3>
                                        <p>${movieData.budget.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400">Revenue</h3>
                                        <p>${movieData.revenue.toLocaleString()}</p>
                                    </div>
                                </div>

                                {movieData.homepage && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400">Homepage</h3>
                                        <Link
                                            href={movieData.homepage}
                                            target="_blank"
                                            className="text-blue-400 hover:text-blue-300 underline break-all"
                                        >
                                            {movieData.homepage}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Production Companies */}
                    <div className="mt-2">
                        <h2 className="text-xl font-semibold mb-4">Production Companies</h2>
                        <div className="flex flex-wrap gap-4">
                            {movieData.production_companies.map((company: any) => (
                                <div key={company.id} className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 flex items-center gap-3">
                                    {company.logo_path ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                            width={60}
                                            height={40}
                                            alt={company.name}
                                            className="h-10 object-contain"
                                        />
                                    ) : (
                                        <span className="text-sm">{company.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}