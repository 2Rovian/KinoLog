// "use client"
// import { motion } from 'framer-motion';
import Image from 'next/image'
import { MotionDiv } from './MotionDiv';

import { FaInfoCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Link from 'next/link';

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

export default function MoviesArticle({ movie, index }: any) {
    return (
        <MotionDiv className="overflow-hidden rounded-sm relative group hover:outline-2 hover:outline-zinc-100 hover:scale-105 hover:shadow-lg hover-transition"
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
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width={100}
                height={100}
                alt={`${movie.title} image`}
                loading='lazy'
                className='max-h-64 w-full sm:max-h-full object-cover'
            />
            <div className='absolute top-1 right-1 bg-zinc-950 px-2 py-1 rounded-xl flex items-center z-50'>
                <span className="flex gap-x-1 items-center text-amber-500">
                    <FaStar />
                    
                    {movie.vote_average === 0
                        ? "N/A"
                        : movie.vote_average.toFixed(1)}

                </span>
            </div>
            <div className='absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40' />

            <div className='absolute inset-0 flex items-center justify-center gap-x-4 text-zinc-200 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50'>
                <Link href={`${"name" in movie ? `/series/${movie.id}` : `/movies/${movie.id}`}`}>
                    <span className="cursor-pointer hover:text-white transition-colors">
                        <FaInfoCircle />
                    </span>
                </Link>

                <span className="cursor-pointer hover:text-white transition-colors">
                    <CiBookmark />
                </span>

            </div>
        </MotionDiv>

        // <motion.article className="overflow-hidden rounded-sm relative"
        // variants={variants}
        // initial="hidden"
        // animate="visible"
        // transition={{
        //     delay: 1,
        //     ease: 'easeInOut',
        //     duration: 0.5
        // }}
        // viewport={{ amount: 0 }}
        // >
        //     <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        //         width={100}
        //         height={100}
        //         alt={`${movie.title} image`}
        //         loading='lazy'
        //         className='max-h-64 w-full sm:max-h-full object-cover'
        //     />
        //     <div className='absolute top-1 right-1 bg-zinc-950 px-2 py-1 rounded-xl flex items-center'>
        //         <span className="flex gap-x-1 items-center text-amber-500">
        //             <FaStar />
        //             {(movie.vote_average).toFixed(1)}
        //         </span>
        //     </div>
        // </motion.article>

        // <article className="overflow-hidden rounded-sm relative"

        // >
        //     <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        //         width={100}
        //         height={100}
        //         alt={`${movie.title} image`}
        //         loading='lazy'
        //         className='max-h-64 w-full sm:max-h-full object-cover'
        //     />
        //     <div className='absolute top-1 right-1 bg-zinc-950 px-2 py-1 rounded-xl flex items-center'>
        //         <span className="flex gap-x-1 items-center text-amber-500">
        //             <FaStar />
        //             {(movie.vote_average).toFixed(1)}
        //         </span>
        //     </div>
        // </article>
    )
}