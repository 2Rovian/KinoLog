import Link from "next/link";

export default function AboutPage(){
    return(
        <div className="max-w-7xl mx-auto px-4">
            <h1 className='mt-20 text-4xl text-center font-semibold text-slate-200'>About 
                <Link href='/'><span className='font-serif cursor-pointer text-slate-50'>KinoLog</span></Link>
            </h1>
        </div>
    )
}