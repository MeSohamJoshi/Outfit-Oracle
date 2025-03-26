import React, { useState } from 'react';
import axios from "axios";
import { doSignInWithEmailAndPassword } from "../firebase/firebaseFunctions.js";
import { useAuth } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, authState } = useAuth();


    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const userCredential = await doSignInWithEmailAndPassword(
                email,
                password
            );

            const token = await userCredential.user.getIdToken();

            const lp = await axios.post("http://localhost:3000/users/login", {token: token});
            login({
                _id: lp.data._id,
                email: lp.data.email,
            });

            navigate("/wardrobe");
        }catch (e) {
            console.log(e.message);
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 to-blue-100 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
