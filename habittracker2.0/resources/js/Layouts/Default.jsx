import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from '@/Styles/Default.module.css'
export default function Default({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>
                <nav className={`${styles.nav}`}>
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
                            <Link href="/profile" className="text-violet-500 hover:text-violet-900 hover:underline hover:transition-all hover:duration-1000">Profile</Link>
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
                        <div className={`${styles.nav} flex flex-col gap-5 p-5 m-5`}>
                           <Link href="/" className="text-violet-500 hover:text-gray-200">Home</Link>
                            <Link href={route('login')} className="text-violet-500 hover:text-gray-200">Login</Link>
                            <Link href={route('register')} className="text-violet-500 hover:text-gray-200">Register</Link>
                            <Link href="/profile" className="text-violet-500 hover:text-gray-200">Profile</Link>
                        </div>
                    )}
                </nav>
            </div>
            <div className='m-14'>
                {children}
            </div>
        </>
    );
}
