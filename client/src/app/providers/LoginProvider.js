'use client';

import React, { useState, createContext } from 'react';

export const LoginContext = createContext();

const LoginProvider = ({children}) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <LoginContext.Provider 
            value={{
                email, 
                setEmail, 
                password, 
                setPassword, 
                username, 
                setUsername, 
                confirmPassword,
                setConfirmPassword
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;