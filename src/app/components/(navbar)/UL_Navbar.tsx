'use client'
import { usePathname } from "next/navigation";
import Link from 'next/link';

export default function UL_Navbar({ navItems }: any) 
{
    const path_name = usePathname();
    
    return (
        <ul className="hidden md:flex gap-6 items-center text-xl font-semibold mx-auto text-slate-300">
            {navItems.map((item: any, index: any) => (
                <li key={index} className="hover:text-slate-200 transition-colors duration-300">
                    <Link href={item.link_page}
                        className={path_name === item.link_page ? "text-slate-50" : ""}
                    >
                        {item.title}</Link>
                </li>
            ))}

        </ul>
    )
}