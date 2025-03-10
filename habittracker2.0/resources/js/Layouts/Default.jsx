import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Default({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>
                <nav className="bg-blue-600 shadow-md">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                        {/* Logo */}
                        <Link to="/" className="text-white text-2xl font-bold">
                            HabitTracker
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6">
                            <Link href="/" className="text-white hover:text-gray-200">Home</Link>
                            <Link href={route('login')} className="text-white hover:text-gray-200">Login</Link>
                            <Link href={route('register')} className="text-white hover:text-gray-200">Register</Link>
                            <Link href="/profile" className="text-white hover:text-gray-200">Profile</Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={30} /> : <Menu size={30} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden bg-blue-500">
                            <Link to="/" className="block px-4 py-2 text-white">Home</Link>
                            <Link to="/habits" className="block px-4 py-2 text-white">My Habits</Link>
                            <Link to="/progress" className="block px-4 py-2 text-white">Progress</Link>
                            <Link to="/profile" className="block px-4 py-2 text-white">Profile</Link>
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
