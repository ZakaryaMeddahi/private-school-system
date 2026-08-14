'use client';

import React, { useState, createContext } from 'react';

interface LoginContextType {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const LoginContext = createContext<LoginContextType>({} as LoginContextType);

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