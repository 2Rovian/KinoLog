'use client'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
import { supabase } from "./supabase-client";

export default function BookmarkButton({ media_id }: { media_id: number }) { 
    const [session, setSession] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false); 
    
    useEffect(() => {
        const fetchData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('email, username')
                    .eq('user_id', session.user.id)
                    .single();
                setProfile(profileData);
            }
        };
        fetchData();
    }, []);

    const handleAddFavorite = async (mediaId: number) => {
        if (!session?.user?.id) return;
      
        // 1. Verifica se já está favoritado
        const { data: existing } = await supabase
          .from('favoritesMedia')
          .select()
          .eq('profile_id', session.user.id)
          .eq('media_id', mediaId)
          .single();
      
        if (existing) {
          toast.error("Você já favoritou esta mídia!");
          return;
        }
      
        // 2. Se não existe, insere
        const { error } = await supabase
          .from('favoritesMedia')
          .insert({ media_id: mediaId, profile_id: session.user.id });
      
        if (error) {
          toast.error("Erro ao favoritar: " + error.message);
        } else {
          toast.success("Mídia favoritada!");
        }
      };
      

    return (
        <button
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => handleAddFavorite(media_id)} // Agora é uma função de callback
            disabled={isLoading} // Desabilita durante o carregamento
        >
            <CiBookmark />
        </button>
    );
}