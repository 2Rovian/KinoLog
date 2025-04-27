'use client'
import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const [session, setSession] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [usernameInput, setUsernameInput] = useState<string>('');

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
            }
        };

        fetchData();
    }, []);

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

    return (
        <>
            <div className="">
                <main className="mt-20 mx-auto max-w-7xl px-4">
                    <p>User id: {session?.user?.id}</p>
                    {profile &&
                        (<>
                            <h1 className="font-semibold text-lg">Welcome, {profile.username ? profile.username : profile.email}
                            </h1>
                            <p>Would you like to put some username?</p>
                            <div className="flex gap-x-2 items-center mt-4">
                                <input type="text" placeholder="username" className="pl-2 py-1 rounded-md outline-2 outline-slate-400 "
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                />
                                <button className="bg-zinc-300 py-1 rounded-md px-4 text-slate-950 font-semibold cursor-pointer hover:bg-zinc-200 hover-transition"
                                    onClick={handleInsertUsername}
                                >Confirm</button>
                            </div>
                            <button
                                className="px-5 py-1 rounded-md bg-zinc-200 text-slate-950 mt-4 font-semibold cursor-pointer hover:bg-zinc-200 hover-transition"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>)}

                </main>

            </div>


            {/* <div className="text-center">
                <h1 className="mt-20">Welcome</h1>
                {session ? (
                    <>
                        <p>Session loaded</p>
                        {profile && (
                            <div className="mt-4">
                                <p>Email: {profile.email}</p>
                                <p>Username: {profile.username || "Not set"}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <p>No session</p>
                )}

                {session && (
                    <button
                        className="px-5 py-1 rounded-md bg-zinc-200 text-slate-950 mt-4 cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Logout
                    </button>
                )}
            </div> */}
        </>

    );
}