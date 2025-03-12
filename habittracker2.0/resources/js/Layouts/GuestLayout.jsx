import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import style from '@/Styles/Default.module.css'
export default function GuestLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>
                <nav className={`${style.nav}`}>
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                        {/* Logo */}
                        <Link to="/" className="text-violet-500 text-2xl font-bold">
                            HabitTracker
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6">
                            <Link href="/" className="text-violet-500 hover:text-violet-900 hover:underline hover:transition-all hover:duration-1000">Home</Link>
                            <Link href={route('login')} className="text-violet-500 hover:text-violet-900 hover:underline hover:transition-all hover:duration-1000">Login</Link>
                            <Link href={route('register')} className="text-violet-500 hover:text-violet-900 hover:underline hover:transition-all hover:duration-1000">Register</Link>
                            {/* <Link href="/profile" className="text-violet-500 hover:text-violet-900 hover:underline hover:transition-all hover:duration-1000">Profile</Link> */}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-violet-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={30} /> : <Menu size={30} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden bg-blue-500">
                            <Link to="/" className="block px-4 py-2 text-violet-500">Home</Link>
                            <Link to="/habits" className="block px-4 py-2 text-violet-500">My Habits</Link>
                            <Link to="/progress" className="block px-4 py-2 text-violet-500">Progress</Link>
                            <Link to="/profile" className="block px-4 py-2 text-violet-500">Profile</Link>
                        </div>
                    )}
                </nav>
            </div>
            <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </>
    );
}
