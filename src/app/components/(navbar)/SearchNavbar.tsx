"use client";
import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import MoviesArticle from "../MoviesArticle";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { supabase } from "@/app/supabase-client";
import UserDropdown from "./UserDropdown";

export default function SearchNavbar() {
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [movieName, setMovieName] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { ref, inView } = useInView();
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const [session, setSession] = useState<any>(null);

    // confere se o usuário está logado
    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);

        };

        fetchSession();
    }, []);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                closeSearch();
            }
        };

        if (openSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openSearch]);

    const fetchSearchResults = async (query: string, pageNum: number, reset = false) => {
        if (!query || query.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${pageNum}`
            );
            const data = await response.json();

            if (reset) {
                setSearchResults(data.results || []);
                setPage(2);
            } else {
                setSearchResults(prev => [...prev, ...(data.results || [])]);
                setPage(prev => prev + 1);
            }

            setHasMore(data.page < data.total_pages);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (inView && hasMore && !isLoading && movieName.length > 1) {
            fetchSearchResults(movieName, page);
        }
    }, [inView]);

    useEffect(() => {
        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set new timeout
        searchTimeoutRef.current = setTimeout(() => {
            if (movieName.length > 1) {
                fetchSearchResults(movieName, 1, true);
            } else {
                setSearchResults([]);
                setPage(1);
                setHasMore(true);
            }
        }, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [movieName]);

    const closeSearch = () => {
        setOpenSearch(false);
        setMovieName('');
        setSearchResults([]);
        setPage(1);
        setHasMore(true);
    };

    return (
        <>
            <div className="flex gap-x-2 text-2xl font-bold items-center">
                <span
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    onClick={() => setOpenSearch(true)}
                >
                    <IoIosSearch />
                </span>
                {/* <Link href={session ? '/profile' : '/login'} className="rounded-full outline-2 p-1 transition-colors">
                    <CiUser />
                </Link> */}
                {session ? <UserDropdown /> :
                    <Link href='/login' className="rounded-full outline-2 p-1 transition-colors">
                        <CiUser />
                    </Link>
                }

            </div>

            {openSearch && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto">
                    <main
                        ref={searchRef}
                        className="relative max-w-7xl mx-auto px-4 min-h-full pt-20 pb-10"
                    >
                        <div className="w-full rounded-lg bg-zinc-900">
                            <input
                                placeholder="Search movie name..."
                                className="px-4 py-4 text-xl w-full hover-transition rounded-lg bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-zinc-100"
                                value={movieName}
                                onChange={(e) => setMovieName(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="mt-6">
                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {searchResults.map((movie: any, index) => (
                                        <MoviesArticle key={`${movie.id}-${index}`} movie={movie} />
                                    ))}
                                </div>
                            ) : movieName.length > 1 && !isLoading ? (
                                <div className="text-center py-10 text-zinc-400">
                                    No results found for "{movieName}"
                                </div>
                            ) : null}

                            {/* Infinite scroll trigger */}
                            <div ref={ref} className="h-10">
                                {isLoading && (
                                    <div className="flex justify-center py-6">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-100"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            className="absolute top-5 z-[200] right-4 p-3 rounded-full bg-zinc-700 hover:bg-zinc-100 hover:text-black text-white cursor-pointer text-xl transition-colors"
                            onClick={closeSearch}
                            aria-label="Close search"
                        >
                            <IoClose />
                        </button>
                    </main>
                </div>
            )}
        </>
    );
}