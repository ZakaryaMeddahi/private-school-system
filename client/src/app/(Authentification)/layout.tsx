'use client';

import { useEffect } from 'react';
import LoginProvider from "../providers/LoginProvider";
import AuthTopBar from "@/components/auth/AuthTopBar";

const Layout = ({ children }) => {
    // globals.css sets a gray body background used site-wide; since <html>
    // has none of its own, browsers paint that gray onto the scroll canvas
    // and it flashes in during overscroll/rubber-banding. Whiten just the
    // canvas while an auth page is mounted, and restore it on the way out.
    useEffect(() => {
        const root = document.documentElement;
        const previousBackground = root.style.backgroundColor;
        root.style.backgroundColor = '#ffffff';
        return () => {
            root.style.backgroundColor = previousBackground;
        };
    }, []);

    return (
        <LoginProvider>
            <div className="relative isolate min-h-screen bg-white">
                {/* Faint color washes so the top bar's backdrop-blur has
                    something to blur — without them the glass effect is
                    invisible against a flat white page. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-112 overflow-hidden"
                >
                    <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-[#4338CA]/10 blur-3xl" />
                    <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#F59E0B]/10 blur-3xl" />
                </div>
                <AuthTopBar />
                {children}
            </div>
        </LoginProvider>
    );
}

export default Layout;
