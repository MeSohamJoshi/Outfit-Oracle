import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        const storedAuthState = localStorage.getItem("authState");
        return storedAuthState
            ? JSON.parse(storedAuthState)
            : { isAuthenticated: false, user: null };
    });

    useEffect(() => {
        // Save the state to localStorage whenever it changes
        localStorage.setItem("authState", JSON.stringify(authState));
    }, [authState]);

    const login = (user) => {
        setAuthState({
            isAuthenticated: true,
            user,
        });
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);