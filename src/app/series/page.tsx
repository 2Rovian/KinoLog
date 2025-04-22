'use client'
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaFilter, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { fetchSeriesByFilter } from "../actions";
import { genreOptions } from "../data";
import { countryOptions } from "../data";
import SeriesArticle from "../components/SeriesArticle";

type SelectedFilters = {
    genre: string;
    country: string;
    year: string;
};

type FilterType = keyof SelectedFilters;

let page = 1;
let currentFilters: SelectedFilters = {
    genre: '',
    country: '',
    year: ''
};

export default function SeriesPage() {
    const [activeDropdown, setActiveDropdown] = useState<FilterType | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        genre: '',
        country: '',
        year: ''
    });

    const [series, setSeries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const { ref, inView } = useInView();

    const yearOptions = Array.from({ length: 30 }, (_, i) => (2023 - i).toString());

    const loadSeries = async (filters: SelectedFilters, reset = false) => {
        const loadingFunction = reset ? setIsLoading : setIsFetchingMore;
        loadingFunction(true);

        try {
            const newData = await fetchSeriesByFilter({
                ...filters,
                page: reset ? 1 : page
            });

            if (reset) {
                page = 2;
                currentFilters = { ...filters };
                setSeries(newData);
            } else {
                setSeries(prev => [...prev, ...newData]);
                page++;
            }
        } catch (error) {
            console.error("Error loading series:", error);
        } finally {
            loadingFunction(false);
        }
    };

    const applyFilters = () => {
        loadSeries(selectedFilters, true);
    };

    useEffect(() => {
        if (inView && !isLoading && !isFetchingMore &&
            (selectedFilters.genre || selectedFilters.country || selectedFilters.year)) {
            loadSeries(selectedFilters);
        }
    }, [inView]);

    const toggleDropdown = (dropdown: FilterType) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const selectFilter = (type: FilterType, value: string) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: prev[type] === value ? '' : value
        }));
        setActiveDropdown(null);
    };

    const clearFilters = () => {
        setSelectedFilters({
            genre: '',
            country: '',
            year: ''
        });
        setSeries([]);
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <main>
                <section className="mt-20 mb-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl">Series</h1>
                        {(selectedFilters.genre || selectedFilters.country || selectedFilters.year) && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 text-sm text-amber-500 hover:text-amber-400 cursor-pointer"
                            >
                                <FaTimes /> Clear filters
                            </button>
                        )}
                    </div>

                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 relative">
                        {/* Genre Filter */}
                        <li className="relative">
                            <div
                                className={`py-3 pl-4 pr-3 rounded-md ${selectedFilters.genre ? 'bg-amber-600/20 border border-amber-500/50' : 'bg-zinc-800'} flex justify-between items-center cursor-pointer hover:bg-zinc-700 transition-colors`}
                                onClick={() => toggleDropdown('genre')}
                            >
                                <span>{selectedFilters.genre || 'Genre'}</span>
                                <span className="text-2xl">
                                    {activeDropdown === 'genre' ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                                </span>
                            </div>
                            {activeDropdown === 'genre' && (
                                <div className="absolute z-[200] mt-1 w-full bg-zinc-800 rounded-md shadow-lg border border-zinc-700 max-h-60 overflow-auto">
                                    {genreOptions.map(genre => (
                                        <div
                                            key={genre.id}
                                            className={`px-4 py-2 hover:bg-zinc-700 cursor-pointer ${selectedFilters.genre === genre.name ? 'bg-amber-600/30' : ''}`}
                                            onClick={() => selectFilter('genre', genre.name)}
                                        >
                                            {genre.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>

                        {/* Country Filter */}
                        <li className="relative">
                            <div
                                className={`py-3 pl-4 pr-3 rounded-md ${selectedFilters.country ? 'bg-amber-600/20 border border-amber-500/50' : 'bg-zinc-800'} flex justify-between items-center cursor-pointer hover:bg-zinc-700 transition-colors`}
                                onClick={() => toggleDropdown('country')}
                            >
                                <span>{selectedFilters.country || 'Country'}</span>
                                <span className="text-2xl">
                                    {activeDropdown === 'country' ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                                </span>
                            </div>
                            {activeDropdown === 'country' && (
                                <div className="absolute z-[200] mt-1 w-full bg-zinc-800 rounded-md shadow-lg border border-zinc-700 max-h-60 overflow-auto">
                                    {countryOptions.map(country => (
                                        <div
                                            key={country.code}
                                            className={`px-4 py-2 hover:bg-zinc-700 cursor-pointer ${selectedFilters.country === country.name ? 'bg-amber-600/30' : ''}`}
                                            onClick={() => selectFilter('country', country.name)}
                                        >
                                            {country.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>

                        {/* Year Filter */}
                        <li className="relative">
                            <div
                                className={`py-3 pl-4 pr-3 rounded-md ${selectedFilters.year ? 'bg-amber-600/20 border border-amber-500/50' : 'bg-zinc-800'} flex justify-between items-center cursor-pointer hover:bg-zinc-700 transition-colors`}
                                onClick={() => toggleDropdown('year')}
                            >
                                <span>{selectedFilters.year || 'Year'}</span>
                                <span className="text-2xl">
                                    {activeDropdown === 'year' ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                                </span>
                            </div>
                            {activeDropdown === 'year' && (
                                <div className="absolute z-[200] mt-1 w-full bg-zinc-800 rounded-md shadow-lg border border-zinc-700 max-h-60 overflow-auto">
                                    {yearOptions.map(year => (
                                        <div
                                            key={year}
                                            className={`px-4 py-2 hover:bg-zinc-700 cursor-pointer ${selectedFilters.year === year.toString() ? 'bg-amber-600/30' : ''}`}
                                            onClick={() => selectFilter('year', year.toString())}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>

                        {/* Filter Button */}
                        <li
                            className={`py-3 px-4 rounded-md bg-amber-600 hover:bg-amber-500 cursor-pointer transition-colors flex items-center justify-center font-semibold gap-x-2 ${isLoading ? 'opacity-70' : ''}`}
                            onClick={applyFilters}
                        >
                            <span><FaFilter /></span>
                            <span>{isLoading ? 'Filtering...' : 'FILTER'}</span>
                        </li>
                    </ul>

                    {/* Active filters display */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {selectedFilters.genre && (
                            <span className="text-xs bg-amber-600/20 text-amber-500 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                            onClick={() => selectFilter('genre', '')}
                            >
                                {selectedFilters.genre}
                                <span className="cursor-pointer" >
                                    <FaTimes className="text-xs" />
                                </span>
                            </span>
                        )}
                        {selectedFilters.country && (
                            <span className="text-xs bg-amber-600/20 text-amber-500 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                            onClick={() => selectFilter('country', '')}
                            >
                                {selectedFilters.country}
                                <span className="cursor-pointer" >
                                    <FaTimes className="text-xs" />
                                </span>
                            </span>
                        )}
                        {selectedFilters.year && (
                            <span className="text-xs bg-amber-600/20 text-amber-500 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                            onClick={() => selectFilter('year', '')}
                            >
                                {selectedFilters.year}
                                <span className="cursor-pointer" >
                                    <FaTimes className="text-xs" />
                                </span>
                            </span>
                        )}
                    </div>
                </section>

                {/* Series grid section */}
                <section className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {series.map((show, index) => (
                        <SeriesArticle key={index} series={show} />
                    ))}

                    {(isLoading || isFetchingMore) && (
                        <div className="col-span-full flex justify-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                        </div>
                    )}

                    {series.length === 0 && !isLoading && !isFetchingMore && (
                        <div className="col-span-full text-center py-10 text-zinc-400">
                            {selectedFilters.genre || selectedFilters.country || selectedFilters.year
                                ? "No series found with these filters"
                                : "Apply filters to see series"}
                        </div>
                    )}
                </section>

                {/* Trigger for infinite scroll */}
                <div ref={ref} className="h-1 invisible" />
            </main>
        </div>
    )
}