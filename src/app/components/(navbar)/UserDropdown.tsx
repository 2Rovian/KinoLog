'use client';
import { supabase } from "@/app/supabase-client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { CiUser } from "react-icons/ci";
import { IoBookmarks } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null); 

    const dropDownItens: any = [
        {
            icon: <MdAccountBox />,
            title: 'Profile',
            link_page: '/profile'
        },
        {
            icon: <IoBookmarks />,
            title: 'Favorites',
            link_page: '/favorites'
        },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // Detecta clique fora do dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="rounded-full outline-2 p-1 transition-colors cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <CiUser />
            </div>

            {isOpen && (
                <div className="absolute right-0 top-8 mt-2 bg-slate-100 rounded-md shadow-lg py-1 z-[300] border border-gray-200 text-slate-950">
                    <ul className="flex flex-col justify-center px-2 py-1 space-y-1 font-normal text-lg">
                        {dropDownItens.map((item: any, index: any) => (
                            <li key={index}>
                                <Link
                                    href={item.link_page}
                                    className="w-full py-1 px-3 hover:bg-slate-950 hover:text-white duration-300 ease-in-out rounded-md text-center flex gap-x-2 items-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        <li
                            className="w-full py-1 px-3 hover:bg-slate-950 hover:text-white duration-300 ease-in-out rounded-md text-center flex gap-x-2 items-center cursor-pointer"
                            onClick={handleLogout}
                        >
                            <FiLogOut />
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
