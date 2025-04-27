// components/SeriesArticle.tsx
import Image from 'next/image'
import Link from 'next/link'
import { FaInfoCircle, FaStar } from "react-icons/fa";

import { IoTrashOutline } from "react-icons/io5";
import { MotionDiv } from '../components/MotionDiv';
import { CiImageOff } from "react-icons/ci";
import DeleteButton from '../DeleteButton';


const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

export default function FavSeriesCard({ series, index }: any) {
    return (
        <MotionDiv className="overflow-hidden rounded-sm relative group hover:outline-2 hover:outline-zinc-100  hover-transition "
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: index * 0.25,
                ease: 'easeInOut',
                duration: 0.5
            }}
            viewport={{ amount: 0 }}
        >
            {series.poster_path ?
                (<Image src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                    width={100}
                    height={100}
                    alt={`${series.title} image`}
                    loading='lazy'
                    className='max-h-72 w-full sm:max-h-full object-cover'
                />) :
                (
                    <div className="flex flex-col items-center justify-center bg-zinc-900 text-white size-full">
                        <CiImageOff className="size-16 mb-2" />
                        <span className="text-lg">Unavailable image</span>
                        <span className="text-sm mt-2 text-zinc-500">Movie Title: {series.title}</span>
                    </div>)}


            <div className='absolute top-1 left-1 bg-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center overflow-hidden'>
                <DeleteButton media_id={series.id}/>

            </div>

            <div className='absolute top-1 right-1 bg-zinc-950 px-2 py-1 rounded-xl flex items-center z-50'>
                <span className="flex gap-x-1 items-center text-amber-500">
                    <FaStar />
                    {series.vote_average === 0
                        ? "N/A"
                        : series.vote_average.toFixed(1)}
                </span>
            </div>
            <div className='absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40' />

            <div className='absolute inset-0 flex items-center justify-center gap-x-4 text-zinc-200 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50'>
                <Link href={`/series/${series.id}`}>
                    <span className="cursor-pointer hover:text-white transition-colors">
                        <FaInfoCircle />
                    </span>
                </Link>

                {/* <BookmarkButton media_id={series.id} /> */}
            </div>
        </MotionDiv>
    )
}