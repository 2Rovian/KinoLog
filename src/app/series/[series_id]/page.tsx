import Image from 'next/image'
import { FaStar } from "react-icons/fa";
import { BsCalendar2DateFill, BsCollectionPlay } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
import SeasonsComp from './SeasonsComp';
import NotFoundPage from '@/app/not-found';
import BookmarkButton from '@/app/BookmarkButton';

export default async function SeriesDetails({
    params,
}: {
    params: { series_id: number };
}) {
    const { series_id } = await params;
    const response = await fetch(`https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
        return (<NotFoundPage />);
    }

    const seriesData = await response.json();
    const regularSeasons = seriesData.seasons.filter((season: any) => season.season_number !== 0);

    return (
        <div className="max-w-7xl mx-auto px-4 pb-12 text-white">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-20">
                {/* Left Column (Poster + Production Companies) */}
                <div className="flex flex-col gap-8">
                    {/* Series Poster */}
                    <div className="w-full rounded-xl overflow-hidden shadow-lg relative group hover:outline-2 hover:outline-zinc-100 hover:shadow-lg hover-transition">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${seriesData.poster_path}`}
                            width={500}
                            height={750}
                            alt={seriesData.name}
                            className="w-full h-auto object-cover"
                        />
                        <div className='absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40' />
                        <div className='absolute inset-0 flex items-center justify-center gap-x-4 text-zinc-200 text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50'>
                            <BookmarkButton media_id={seriesData.id} />
                        </div>
                    </div>

                    {/* Production Companies - Only shown below poster on md+ screens */}
                    <div className="hidden md:block">
                        <h2 className="text-xl font-semibold mb-4">Production Companies</h2>
                        <div className="flex flex-wrap gap-4">
                            {seriesData.production_companies.map((company: any) => (
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

                {/* Right Column (All other info) */}
                <div className="md:col-span-2 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold">{seriesData.name}</h1>
                        
                    </div>

                    <div className="flex items-center gap-4 text-sm text-zinc-300">
                        <span className="flex gap-x-1 items-center text-amber-500">
                            <FaStar />
                            {seriesData.vote_average.toFixed(1)}
                        </span>
                        <span className='flex items-center gap-x-1 text-zinc-400'>
                            <BsCalendar2DateFill />
                            {seriesData.first_air_date} - {seriesData.last_air_date}
                        </span>
                        <span className="flex items-center gap-x-1 text-zinc-400">
                            <BsCollectionPlay />
                            {seriesData.number_of_seasons} seasons • {seriesData.number_of_episodes} episodes
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-zinc-700 rounded-md text-xs">
                            {seriesData.status}
                        </span>
                        <span className="px-2 py-1 bg-zinc-700 rounded-md text-xs">
                            {seriesData.type}
                        </span>
                    </div>

                    <p className="text-lg leading-relaxed text-zinc-200 mt-4">
                        {seriesData.overview}
                    </p>

                    {seriesData.tagline && (
                        <p className="italic text-amber-100">"{seriesData.tagline}"</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Left Column */}
                        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-400 mb-1">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {seriesData.genres.slice(0, 6).map((g: any) => (
                                            <span key={g.id} className="px-3 py-1 bg-amber-600/20 text-amber-400 rounded-full text-xs">
                                                {g.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {seriesData.created_by.length > 0 && (<div>
                                    <h3 className="text-sm font-semibold text-zinc-400">Created By</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {seriesData.created_by.map((creator: any) => (
                                            <span key={creator.id} className="px-3 py-1 bg-zinc-700/50 rounded-full text-xs">
                                                {creator.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>)}


                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-400">Networks</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        {seriesData.networks.slice(0, 5).map((network: any) => (
                                            network.logo_path && (
                                                <Image
                                                    key={network.id}
                                                    src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                                                    width={80}
                                                    height={40}
                                                    alt={network.name}
                                                    className="h-6 object-contain"
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-400">Spoken Languages</h3>
                                    <p>{seriesData.spoken_languages.map((l: any) => l.english_name).join(', ')}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-400">Origin Country</h3>
                                    <p>{seriesData.origin_country.join(', ')}</p>
                                </div>

                                {seriesData.homepage && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400">Homepage</h3>
                                        <Link
                                            href={seriesData.homepage}
                                            target="_blank"
                                            className="text-blue-400 hover:text-blue-300 underline break-all"
                                        >
                                            {seriesData.homepage}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Seasons Section */}
                    <SeasonsComp seriesData={seriesData} regularSeasons={regularSeasons} />

                    {/* Production Companies - Only shown here on mobile */}
                    <div className="md:hidden mt-6">
                        <h2 className="text-xl font-semibold mb-4">Production Companies</h2>
                        <div className="flex flex-wrap gap-4">
                            {seriesData.production_companies.map((company: any) => (
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