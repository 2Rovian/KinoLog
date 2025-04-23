import Link from "next/link";
import Image from "next/image";
import { FaFilm, FaTv, FaSearch, FaBookmark, FaHeart, FaExternalLinkAlt } from "react-icons/fa";

import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";

import { Zen_Antique } from "next/font/google";

const ZenAntiqueFont = Zen_Antique({
    subsets: ["latin"],
    weight: "400"
})

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="mt-8 text-5xl font-bold text-amber-500 mb-2">
                    About <span className={`${ZenAntiqueFont.className} text-white`}
                    style={{ textShadow: "0 0 1px white" }}
                    >KinoLog</span>
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Your ultimate destination for discovering and tracking movies & TV series
                </p>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
                {/* What is KinoLog */}
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <FaFilm className="mr-2 text-amber-500" />
                        What is KinoLog?
                    </h2>
                    <p className="text-zinc-300 leading-relaxed">
                        KinoLog is a modern web application designed for movie and TV show enthusiasts. 
                        It provides comprehensive information about films and series, allowing users to 
                        discover new content, filter by various criteria, and keep track of their favorites.
                    </p>
                </section>

                {/* Features */}
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <FaTv className="mr-2 text-amber-500" />
                        Key Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-zinc-800 p-6 rounded-lg">
                            <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                                <FaSearch className="mr-2 text-amber-500" />
                                Advanced Filtering
                            </h3>
                            <p className="text-zinc-300">
                                Filter movies and TV shows by genre, country, release year, and more to 
                                find exactly what you're looking for.
                            </p>
                        </div>
                        <div className="bg-zinc-800 p-6 rounded-lg">
                            <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                                <FaBookmark className="mr-2 text-amber-500" />
                                Save Favorites
                            </h3>
                            <p className="text-zinc-300">
                                Bookmark your favorite titles to watch later and create personalized 
                                collections.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technology Stack */}
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Built With Modern Technologies
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-zinc-200 text-[#000000] rounded-full text-sm flex gap-x-2 items-center">
                            <RiNextjsFill />
                            Next.js
                        </span>
                        <span className="px-3 py-1 bg-zinc-200 text-[#000000] rounded-full text-sm flex gap-x-2 items-center">
                            <IoLogoVercel />
                            Vercel
                        </span>
                        <span className="px-3 py-1 bg-zinc-800 text-[#3178C6] rounded-full text-sm flex gap-x-2 items-center">
                            <SiTypescript />
                            TypeScript
                        </span>
                        <span className="px-3 py-1 bg-zinc-800 text-[#06B6D4] rounded-full text-sm flex gap-x-2 items-center">
                            <RiTailwindCssFill />
                            Tailwind CSS
                        </span>
                        <span className="px-3 py-1 bg-zinc-800 text-[#01B4E4] rounded-full text-sm ">TMDB API</span>
                        
                    </div>
                </section>

                <section className="bg-zinc-800 p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0">
                            <Image 
                                src="./tmdb-logo.svg" 
                                alt="TMDB Logo" 
                                width={150} 
                                height={75}
                                className="w-36"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Powered by TMDB API
                            </h3>
                            <p className="text-zinc-300 mb-4">
                                This product uses the TMDB API but is not endorsed or certified by TMDB.
                                All movie and TV show data is provided by The Movie Database.
                            </p>
                            <a 
                                href="https://www.themoviedb.org/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors"
                            >
                                Visit TMDB <FaExternalLinkAlt className="ml-1 text-sm" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center pt-0">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center">
                        <FaHeart className="mr-2 text-amber-500" />
                        Ready to Explore?
                    </h2>
                    <Link 
                        href="/" 
                        className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors"
                    >
                        Start Browsing Now
                    </Link>
                </section>
            </div>
        </div>
    )
}