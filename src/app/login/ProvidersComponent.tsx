import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ProvidersComponent() {
    return (
        <>
            <div className="flex items-center w-full my-4">
                <div className="h-[2px] bg-slate-400 flex-1"></div>
                <span className="px-3 text-slate-800 text-sm">Or sign in with</span>
                <div className="h-[2px] bg-slate-400 flex-1"></div>
            </div>
            <section className="flex flex-col gap-y-2">

                <button type='button' className='flex outline-1 outline-slate-300 text-slate-900 rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:outline-slate-600 duration-300 ease-in-out'>
                    <span className='text-2xl'>
                        <FaGithub />
                    </span>
                    <span className="font-semibold">Github</span>
                </button>

                <form action=''>
                    <button type='submit' className='flex outline-1 outline-slate-300 text-slate-900 rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:outline-slate-600 duration-300 ease-in-out'>
                        <span className='text-2xl'>
                            <FaGoogle />
                        </span>
                        <span className="font-semibold">Google</span>
                    </button>
                </form>

                <button type='button' className='flex outline-1 outline-slate-300 text-slate-900 rounded-md py-2 pl-2 gap-x-2 cursor-pointer items-center w-full hover:outline-slate-600 duration-300 ease-in-out'>
                    <span className='text-2xl'>
                        <FaXTwitter />
                    </span>
                    <span className="font-semibold">Twitter</span>
                </button>

            </section>
        </>
    )
}