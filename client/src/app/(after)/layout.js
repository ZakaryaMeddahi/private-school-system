'use client';
import React from 'react';
import { ChatProvider } from '../providers/ChatProvider';

function PagesLayout({ children }) {
    return <ChatProvider>{children}</ChatProvider>;
}

export default PagesLayout;