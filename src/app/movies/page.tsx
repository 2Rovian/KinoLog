import { FaFilter } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function MoviesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <main className='mt-0'>
                <section className="mt-20 mb-4 flex flex-col ">
                    <h1 className="text-3xl mb-4 ">Movies</h1>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <li className="py-3 px-2 rounded-md bg-zinc-800 flex justify-between items-center cursor-pointer text-lg">
                            <span className="">Genre</span>
                            <span className=""><RiArrowDropDownLine />
                            </span>
                        </li>
                        <li className="py-3 px-2 rounded-md bg-zinc-800 flex justify-between items-center cursor-pointer text-lg">
                            <span className="">Country</span>
                            <span className=""><RiArrowDropDownLine />
                            </span>
                        </li>
                        <li className="py-3 px-2 rounded-md bg-zinc-800 flex justify-between items-center cursor-pointer text-lg">
                            <span className="">Year</span>
                            <span className=""><RiArrowDropDownLine />
                            </span>
                        </li>
                        <li className="py-3 px-2 rounded-md bg-amber-600 hover:bg-amber-500 cursor-pointer hover-transition flex items-center justify-center font-semibold gap-x-2">
                            <span><FaFilter /></span>
                            <span>FILTER</span>
                            
                        </li>
                    </ul>
                </section>
                <section>grid</section>

            </main>


        </div>
    )
}