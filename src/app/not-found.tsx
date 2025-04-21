import Link from "next/link";
import { FaGhost, FaHome } from "react-icons/fa";
import { MotionDiv } from "./components/MotionDiv";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-4">
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md"
            >
                <MotionDiv
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0], 
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4, 
                        ease: "easeInOut",
                    }}
                    className="flex justify-center mb-6"
                >
                    <FaGhost className="text-8xl text-zinc-50 opacity-80" />
                </MotionDiv>

                <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                <p className="text-xl mb-6 text-zinc-300">
                    The content you're looking for doesn't exist or has vanished into the void.
                </p>

                <Link href='/'
                    className=''
                >
                    <button className='inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg hover-transition hover:scale-105 cursor-pointer'>
                        <FaHome />
                        Return to Safety

                    </button>
                </Link>

                <p className="mt-8 text-sm text-zinc-500">
                    Error code: 404 - Resource Not Found
                </p>
            </MotionDiv>
        </div>
    );
}