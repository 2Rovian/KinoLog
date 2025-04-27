'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase-client'
import toast from 'react-hot-toast'

import FavSeriesCard from './FavSeriesCard';
import FavMovieCard from './FavMovieCard';

export default function FavoritesPage() {

    const [loading, setLoading] = useState(true);
    const [mediaData, setMediaData] = useState<any[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session?.user?.id) {
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('favoritesMedia')
                .select('media_id')
                .eq('profile_id', session.user.id)

            if (error) {
                toast.error('Erro fetching favorites')
                console.error(error)
                setLoading(false);
                return;
            }

            const mediaIds = data.map(item => item.media_id)
            const mediaResults = await Promise.all(
                mediaIds.map(async (id) => {
                    try {
                        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
                        if (!res.ok) throw new Error('Not a movie');

                        const movie = await res.json();
                        return { ...movie, type: 'movie' }
                    } catch (err) {
                        try {
                            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
                            if (!res.ok) throw new Error('Not a TV show');

                            const tv = await res.json();
                            return { ...tv, type: 'tv' }
                        } catch (err) {
                            console.error('Failed to fetch media with id', id);
                            return null;
                        }
                    }
                })
            );

            const filtered = mediaResults.filter(item => item !== null);
            setMediaData(filtered);
            setLoading(false);
        }

        fetchFavorites();
    }, [])

    if (loading) return (
        <div className='flex justify-center mt-20'>
            <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full size-16 border-t-4 border-b-4 border-zinc-100" />
            </div>
        </div>
    )

    return (
        <div className="flex flex-col mx-auto max-w-7xl px-4">
            <h1 className="text-2xl font-bold mb-4 mt-20">Your Favorites</h1>

            {mediaData.length === 0 && <p>No favorites found.</p>}

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4 mb-10">
                {mediaData.map((item, index) => (
                    <li key={index} className=" rounded-md shadow-md">
                        {item.type === 'movie' ?
                            (<FavMovieCard movie={item} index={index}/>)
                            :
                            (<FavSeriesCard series={item} index={index}/>)
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}
