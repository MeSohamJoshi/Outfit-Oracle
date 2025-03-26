import React, { useState } from 'react';
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            // Handle login logic
            console.log('Logging in with', { email, password });
        } else {
            // Handle registration logic
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            console.log('Registering with', { email, password });
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
            style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <a href="/dashboard" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Outfit Oracle    
                </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{isLogin ? 'Login' : 'Register'}</h1>
            <form className="space-y-4 md:space-y-6" action="#"onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                {!isLogin && (
                    <div style={{ marginBottom: '10px' }}>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password:</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        />
                    </div>
                )}
                <button 
                    className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                    type="submit" 
                    style={{ width: '100%', padding: '10px', margin: '10px 0' }}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <button
                className="w-sm text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                onClick={() => setIsLogin(!isLogin)}
                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
            >
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
            </div>
            </div>
        </div>
        </section>
    );
};

export default LoginPage;