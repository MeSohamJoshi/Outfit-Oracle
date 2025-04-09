import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
// import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { authState, logout } = useAuth();
    // const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Wardrobe', path: '/wardrobe' },
        { name: 'Outfits', path: '/outfits-ai' },
        // { name: 'Event Fashion', path: '/event-fashion' },
        { name: 'History', path: '/history' }
    ];

    const handleLogout = async () => {
        console.log("Here");
        await logout();
        console.log(authState)
        window.location.href = "/";
    };


    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
                            <img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="logo" className="w-8 h-8" />
                            Outfit Oracle
                        </Link>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex space-x-6">
                        {authState.isAuthenticated &&
                            navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition"
                                >
                                    {link.name}
                                </Link>
                            ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-4">
                        {!authState.isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setOpen(!open)} className="text-gray-700 focus:outline-none">
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-6 pb-4 space-y-3">
                    {authState.isAuthenticated &&
                        navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="block text-gray-700 hover:text-indigo-600 font-medium"
                                onClick={() => setOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    <hr />
                    {!authState.isAuthenticated ? (
                        <>
                            <Link
                                to="/login"
                                className="block text-indigo-600 font-medium"
                                onClick={() => setOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="block text-indigo-600 font-medium"
                                onClick={() => setOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="block text-red-600 font-medium cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
