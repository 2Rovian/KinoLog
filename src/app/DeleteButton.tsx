'use client'

import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
export default function DeleteButton({ media_id }: { media_id: number }) {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            // 1. Busca a sessão
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);

        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        if (!session?.user?.id) {
            toast.error("Session not ready.");
            return;
        }

        const { error } = await supabase
            .from('favoritesMedia')
            .delete()
            .eq('profile_id', session.user.id)
            .eq('media_id', media_id)

        if(error){
            toast.error("Error deleting media ");
            return;
        }

        toast.success("Media deleted.")
    }

    return (
        <button className={`py-2 px-3 text-red-500 hover:text-red-700 transition-colors ${!session ? "cursor-not-allowed" : "cursor-pointer"} z-[300]`}
        onClick={handleDelete}
        disabled={!session}

        >
            <IoTrashOutline />
        </button>
    )
}