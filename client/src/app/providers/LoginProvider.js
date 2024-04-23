'use client';

import React, { useState, createContext } from 'react';

export const LoginContext = createContext();

const LoginProvider = ({children}) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <LoginContext.Provider 
            value={{
                email, 
                setEmail, 
                password, 
                setPassword, 
                firstName, 
                setFirstName,
                lastName,
                setLastName, 
                confirmPassword,
                setConfirmPassword
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;