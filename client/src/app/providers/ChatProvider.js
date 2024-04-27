import React, { createContext, useState, useRef } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const chatRef = useRef();
    const roomInfoRef = useRef();
    const [messages, setMessages] = useState([
        'hello',
        'hi',
        'how are you',
        'I am fine',
        'what about you',
        'I am good',
        'bye',
        'goodbye',
        'see you later',
        'ok',
        'thanks',
        'thank you',
        'welcome',
        'you are welcome',
        'good morning',
        'good afternoon',
    ]);

    return (
        <ChatContext.Provider
            value={{ messages, roomInfoRef, chatRef, setMessages }}
        >
            {children}
        </ChatContext.Provider>
    );
};
