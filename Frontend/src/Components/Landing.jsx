import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCalendarCheck, FaCloudSun, FaTshirt, FaHistory } from 'react-icons/fa';

const features = [
    {
        icon: <FaTshirt size={28} className="text-indigo-600" />,
        title: 'Smart Wardrobe',
        desc: 'Easily manage your entire wardrobe and categorize items by type, season, and usage.'
    },
    {
        icon: <FaCloudSun size={28} className="text-indigo-600" />,
        title: 'Weather-Based Styling',
        desc: 'Get outfit suggestions based on the current weather and temperature in your area.'
    },
    {
        icon: <FaRegCalendarCheck size={28} className="text-indigo-600" />,
        title: 'Event Styling',
        desc: 'Plan and style your outfit for upcoming meetings, parties, and formal events.'
    },
    {
        icon: <FaHistory size={28} className="text-indigo-600" />,
        title: 'Style History',
        desc: 'Track what you wore on previous days and avoid outfit repeats effortlessly.'
    }
];

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
            {/* Hero */}
            <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
                <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
                    <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
                        Dress Smarter. Live Stylishly.
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Meet <strong>Outfit Oracle</strong>, your personal AI stylist. Plan, track, and elevate your wardrobe like never before.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-indigo-700 transition">
                            Login
                        </Link>
                        <Link to="/signup" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl text-lg hover:bg-indigo-100 transition">
                            Sign Up
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
                        alt="wardrobe"
                        className="w-80 h-80 object-contain"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16 px-6 md:px-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What You’ll Love</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 md:px-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
                <div className="grid md:grid-cols-3 gap-10 text-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="italic text-gray-600 mb-4">“Outfit Oracle changed how I get ready every morning. It’s like having a stylist in your pocket!”</p>
                        <h4 className="font-semibold text-gray-800">— Priya S.</h4>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="italic text-gray-600 mb-4">“The weather-based outfit recommendations are a life-saver. I never overdress or underdress anymore!”</p>
                        <h4 className="font-semibold text-gray-800">— Alex J.</h4>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="italic text-gray-600 mb-4">“I can plan my looks for events weeks in advance. And no more outfit repeats thanks to the history tracker.”</p>
                        <h4 className="font-semibold text-gray-800">— Maya R.</h4>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-10 text-gray-600 text-sm">
                © {new Date().getFullYear()} Outfit Oracle.
            </footer>
        </div>
    );
};

export default LandingPage;
