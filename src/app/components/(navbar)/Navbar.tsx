import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import MenuNavbar from "./MenuNavbar";
import UL_Navbar from "./UL_Navbar";
import SearchNavbar from "./SearchNavbar";
import Link from "next/link";

export default function Navbar() {
    const navItems: any = [
        { title: "Home", link_page: "/" },
        { title: "Movies", link_page: "/movies" },
        { title: "Series", link_page: "/series" },
        { title: "About", link_page: "/about" }
    ]
    return (
        <header className="h-fit fixed top-0 z-[100] w-full right-0 left-0 bg-gradient-to-b from-black/95 to-transparent">
            <nav className="max-w-7xl mx-auto flex  flex-col gap-y-2 p-4 ">
                {/* old navbar */}
                {/* nav className="max-w-7xl lg:outline-1 lg:outline-slate-900/70 lg:rounded-b-md mx-auto flex bg-black/40 backdrop-blur-lg flex-col gap-y-2 p-4" */}
                {/* old navbar */}
                <div className="h-[50%] flex justify-between items-center">
                    <Link href='/'>
                        <span className="text-2xl font-serif font-semibold cursor-pointer text-slate-50">KinoLog</span>
                    </Link>

                    <MenuNavbar navItems={navItems} />
                    <UL_Navbar navItems={navItems} />

                    <SearchNavbar />
                </div>


            </nav>
        </header>
    )
}