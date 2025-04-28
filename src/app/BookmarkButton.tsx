'use client'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
import { IoBookmarks } from "react-icons/io5";
import { supabase } from "./supabase-client";

export default function BookmarkButton({ media_id }: { media_id: number }) {
  const [session, setSession] = useState<any>(null);
  const [isMediaSaved, setIsMediaSaved] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.id) {
        // Check if the media is already saved
        const { data: existing } = await supabase
          .from('favoritesMedia')
          .select()
          .eq('profile_id', session.user.id)
          .eq('media_id', media_id)
          .single();

        if (existing) {
          setIsMediaSaved(true);
        }
      }
    };

    fetchData();
  }, [media_id]);

  const handleToggle = async (mediaId: number) => {
    if (!session?.user?.id) {
      toast.error("You need a acc to storage your favorites")
      return
    };

    // 1. Check again if it's already favorited (optional, safety)
    const { data: existing } = await supabase
      .from('favoritesMedia')
      .select()
      .eq('profile_id', session.user.id)
      .eq('media_id', mediaId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('favoritesMedia')
        .delete()
        .eq('profile_id', session.user.id)
        .eq('media_id', media_id)

      if (error) {
        toast.error("Error deleting media ");
        return;
      } else {
        setIsMediaSaved(false);
        toast.success("Media deleted.")
        return;
      }
    }

    // 2. If it doesn't exist, insert it
    const { error } = await supabase
      .from('favoritesMedia')
      .insert({ media_id: mediaId, profile_id: session.user.id });

    if (error) {
      toast.error("Error favoriting: " + error.message);
    } else {
      toast.success("Media favorited!");
      setIsMediaSaved(true);
    }
  };

  return (
    <button
      className="cursor-pointer hover:text-white transition-colors"
      onClick={() => handleToggle(media_id)}

    >
      {isMediaSaved ? <IoBookmarks /> : <CiBookmark />}
    </button>
  );
}
