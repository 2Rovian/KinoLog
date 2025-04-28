'use client'
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
    const [session, setSession] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            // 1. Busca a sessão
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            console.log(session)
            if (session) {
                // 2. Se sessão existe, busca o perfil
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('email, username')
                    .eq('user_id', session.user.id)
                    .single();

                setProfile(profileData);
                setIsLoadingSession(false);
            }
        };

        fetchData();
    }, []);

    if (isLoadingSession) {
        return (
            <div className='flex justify-center mt-32'>
                <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full size-16 border-t-2 border-b-2 border-zinc-100" />
                </div>
            </div>
        );
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleInsertUsername = async () => {
        if (!session?.user?.id || !usernameInput.trim()) return;

        const { error } = await supabase
            .from('profiles')
            .update({ username: usernameInput })
            .eq('user_id', session.user.id);

        if (error) {
            console.error("Erro ao atualizar username:", error.message);
            return;
        }

        // Atualiza o estado local para refletir a mudança
        setProfile({ ...profile, username: usernameInput });
        setUsernameInput(''); // Limpa o input
        toast.success("Username atualizado com sucesso!");
    }

    if (!session || !profile) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="mt-20 flex flex-col justify-center ">
                    <h1 className="text-3xl font-bold text-slate-200 mb-4">You must be logged in to access your profile</h1>
                    <p className="text-slate-400 mb-8">Please log in to continue.</p>
                    <Link
                        href="/login"
                        className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold text-center"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-slate-900">
          <main className="bg-white rounded-xl shadow-lg p-10 w-[85%] max-w-[500px]">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Hello, {profile.username ? profile.username : profile.email}!</h1>
              <p className="text-sm text-slate-500 mt-2">Manage your account information below.</p>
            </div>
      
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                  New Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter a username"
                  className="w-full p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>
      
              <button
                onClick={handleInsertUsername}
                className="w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3 rounded-md transition cusor-pointer"
              >
                Update Username
              </button>
      
              <button
                onClick={handleLogout}
                className="w-full border border-slate-300 text-slate-700 hover:bg-red-800 hover:text-white font-semibold py-3 rounded-md transition cursor-pointer"
              >
                Logout
              </button>
            </div>
      
            {/* <div className="mt-10 text-center">
              <p className="text-xs text-slate-400">User ID:</p>
              <p className="text-xs font-mono text-slate-600 mt-1">{session?.user?.id}</p>
            </div> */}
          </main>
        </div>
      );
      
      
}