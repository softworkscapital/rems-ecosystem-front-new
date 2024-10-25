import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEcosystemAdmin, setIsEcosystemAdmin] = useState(false);

    useEffect(() => {
        // Fetch role and category from localStorage
        const role = localStorage.getItem('async_role');
        const category = localStorage.getItem('async_category');

        console.log('Fetched role:', role);
        console.log('Fetched category:', category);

        // Set admin state based on role and category
        if (role === 'Admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }

        if (category === 'ecosystem_admin') {
            setIsEcosystemAdmin(true);
        } else {
            setIsEcosystemAdmin(false);
        }

        // Redirect if role is not set
        if (!role) {
            window.location.href = '/';
        }
    }, []); // Only run on initial mount

    return (
        <UserContext.Provider value={{ isAdmin, isEcosystemAdmin }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};