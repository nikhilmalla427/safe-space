import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, Home, Smile, ShieldCheck, MessageSquare, BookOpen, HeartHandshake } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close sidebar on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            <button className="hamburger-btn" onClick={() => setIsOpen(true)} aria-label="Open Menu">
                <Menu size={24} />
            </button>

            <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <NavLink to="/" className="logo" onClick={() => setIsOpen(false)}>
                        <HeartPulse size={28} color="var(--primary)" />
                        SafeSpace
                    </NavLink>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                        <X size={24} />
                    </button>
                </div>

                <div className="sidebar-links">
                    <NavLink to="/" className="sidebar-link">
                        <Home size={20} />
                        Home
                    </NavLink>
                    <NavLink to="/mood" className="sidebar-link">
                        <Smile size={20} />
                        Mood Tracker
                    </NavLink>
                    <NavLink to="/share" className="sidebar-link">
                        <ShieldCheck size={20} />
                        Anonymous Share
                    </NavLink>
                    <NavLink to="/chat" className="sidebar-link">
                        <MessageSquare size={20} />
                        AI Chat Assistant
                    </NavLink>
                    <NavLink to="/motivational-stories" className="sidebar-link">
                        <BookOpen size={20} />
                        Motivational Stories
                    </NavLink>
                    <NavLink to="/resources" className="sidebar-link">
                        <HeartHandshake size={20} />
                        Resources / Helplines
                    </NavLink>
                </div>
            </div>
        </>
    );
}