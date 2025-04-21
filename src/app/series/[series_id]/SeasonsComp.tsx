"use client"
import Image from "next/image"
import { FaStar } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { useState } from "react";

export default function SeasonsComp({ seriesData, regularSeasons }: any) {
    const [ShowSeasons, setShowSeasons] = useState<boolean>(false);

    return (
        <section className="mt-8">
            <div className="flex items-end justify-between mb-6 pb-2 border-b border-zinc-700 cursor-pointer hover:text-zinc-100 hover-transition"
                onClick={() => setShowSeasons(!ShowSeasons)}
            >
                <h2 className="text-2xl font-bold ">
                    Seasons ({seriesData.number_of_seasons})
                </h2>
                <span className={`text-2xl text-white transition-transform duration-300 ${ShowSeasons ? 'rotate-180' : 'rotate-0'
                    }`}
                >
                    <IoIosArrowDropdownCircle />

                </span>
            </div>
            
            {ShowSeasons && (<div className="space-y-6">
                {regularSeasons.map((season: any) => (
                    <div key={season.id} className="bg-zinc-800/50 rounded-lg overflow-hidden border border-zinc-700 hover:border-zinc-500 transition-colors">
                        <div className="flex flex-col md:flex-row">
                            {season.poster_path && (
                                <div className="md:w-1/4">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                                        width={200}
                                        height={300}
                                        alt={season.name}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}
                            <div className={`p-6 ${season.poster_path ? 'md:w-3/4' : 'w-full'}`}>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold">
                                        {season.name}
                                        <span className="ml-2 text-sm font-normal text-zinc-400">
                                            ({season.air_date?.split('-')[0]})
                                        </span>
                                    </h3>
                                    <div className="flex items-center gap-2 bg-zinc-700 px-3 py-1 rounded-full">
                                        <FaStar className="text-amber-400 text-sm" />
                                        <span className="text-sm">{season.vote_average > 0 ? season.vote_average.toFixed(1) : 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                                    <span>
                                        {season.episode_count} episodes
                                    </span>
                                    {season.air_date && (
                                        <span className="flex items-center gap-1">
                                            <BsCalendar2DateFill />
                                            {new Date(season.air_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    )}
                                </div>

                                {season.overview && (
                                    <p className="mt-4 text-zinc-300">
                                        {season.overview}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>)}
            
        </section>
    )
}