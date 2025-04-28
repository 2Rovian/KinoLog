'use client'
import { useEffect, useState } from "react"
import ProvidersComponent from "./ProvidersComponent";
import toast from "react-hot-toast";
import { supabase } from "../supabase-client";
import Link from "next/link";

export default function LoginComponent() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ConfirmPassword, setConfirmPassword] = useState<string>('');
    const [session, setSession] = useState<any>(null);
    const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setIsLoadingSession(false); // 👈 só aqui para de carregar
        };
        fetchSession();
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

    if (session) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="mt-36 flex flex-col justify-center ">
                    <h1 className="text-3xl font-bold text-slate-200 mb-4">You are already logged in</h1>
                    <p className="text-slate-400 mb-8">Go back to the homepage to continue browsing.</p>
                    <Link
                        href="/"
                        className="bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors self-center font-semibold"
                    >
                        <button className="px-6 py-3 rounded-lg cursor-pointer ">Go to Home</button>
                    </Link>
                </div>
            </div>
        );
    }
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!isLogin) { // registro
            // validaçao
            if (password !== ConfirmPassword) {
                toast.error("Passwords do not match");
                return;
            } else if (password.length < 6) {
                toast.error("Password must be at least 6 char");
                return;
            }
            // -------

            const { error: SignUpError } = await supabase.auth.signUp({ email, password })
            if (SignUpError) {
                console.error("Error signing up: ", SignUpError.message)
                return;
            }

            const { data: userData } = await supabase.auth.getUser();
            const user = userData?.user;

            if (user) {
                await supabase.from('profiles').insert({
                    user_id: user.id,
                    email: user.email,
                    username: '', // Pode pedir no formulário depois
                });
            }

            toast.success('Congrats! You are ready to go');
        } else { // login
            const { error: SignInError } = await supabase.auth.signInWithPassword({ email, password });

            if (SignInError) {
                console.error("Error signing in: ", SignInError.message)
                return;
            }

            toast.success("You have a session now!")
        }

    }

    return (
        <div className="flex flex-col items-center mx-auto ">
            <div className="mt-20 border border-slate-400 text-slate-950 flex flex-col p-5 w-[90%] max-w-[500px] bg-zinc-100 rounded-xl shadow-md relative">

                <div className="mb-5">
                    <h2 className="text-2xl text-slate-950 font-bold">{isLogin ? "Welcome" : "Sign Up"}</h2>
                    <p className="text-slate-700">{isLogin ? "Log in with your email and password." : "Sign up for free."}</p>
                </div>

                <form
                    className='flex flex-col'
                >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" className="outline-slate-400 outline-2 rounded-md pl-2 py-2 shadow focus:outline-slate-800 duration-300 ease-in-out mt-1" placeholder="email@hotmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="outline-slate-400 outline-2 rounded-md pl-2 py-2 shadow focus:outline-slate-800 duration-300 ease-in-out mt-1" placeholder="••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {!isLogin && <div className="flex flex-col mt-2">
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" className="outline-slate-400 outline-2 rounded-md pl-2 py-2 shadow focus:outline-slate-800 duration-300 ease-in-out mt-1" placeholder="••••••••••"
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>}
                    <button type='submit' className='bg-slate-950 hover:bg-slate-900 cursor-pointer active:bg-slate-700 duration-300 ease-in-out  text-white py-3 rounded-md font-bold mt-5'
                        onClick={handleSubmit}
                    >{isLogin ? 'Login' : 'Register'}
                    </button>

                </form>

                {isLogin && (
                    <ProvidersComponent />
                )}

                {isLogin && <p className="text-center text-gray-600 mt-5">By continuing, you agree to our Terms of Use and Privacy Policy.</p>}
            </div>
            <p className="text-slate-200 mt-5">{isLogin ? "Don't have an account?" : "Already have an account?"}
                <span className="font-semibold text-white hover:underline cursor-pointer"
                    onClick={() => { setIsLogin(!isLogin) }}
                >{isLogin ? ' Sign up' : ' Log in'}</span>.
            </p>
        </div>
    )
}