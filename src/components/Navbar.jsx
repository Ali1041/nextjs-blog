"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/db"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(true);

    const scrollToSection = (sectionId) => {
        // Check if we're on the landing page
        if (window.location.pathname === '/' || window.location.pathname === '/landing') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } else {
            // If not on landing page, redirect to landing page with hash
            window.location.href = `/landing#${sectionId}`;
        }
        setIsMenuOpen(false); // Close mobile menu
    };

    useEffect(() => {
        // Check admin status on component mount
        const checkAdminStatus = async () => {
            const { data, error } = await supabase.auth.getSession()
            setIsAdmin(!error && data?.session?.user ? true : false);
            setLoadingAdmin(false);
            console.log(data, error)
        };

        checkAdminStatus();
    }, []);

    useEffect(() => {
        // Handle hash scrolling when page loads with a hash
        const handleHashScroll = () => {
            const hash = window.location.hash.substring(1); // Remove the # symbol
            if (hash) {
                // Wait a bit for the page to fully load
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }
                }, 100);
            }
        };

        // Run on mount and when hash changes
        handleHashScroll();
        window.addEventListener('hashchange', handleHashScroll);

        return () => {
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={logo}
                                alt="Ijaad Labs"
                                className="h-8 w-auto lg:h-10"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    console.log('Logo failed to load');
                                }}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex items-center space-x-8">
                            <button
                                onClick={() => scrollToSection('hero')}
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                            >
                                About Us
                            </button>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                            >
                                Projects
                            </button>
                            <button
                                onClick={() => scrollToSection('pricing')}
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                            >
                                Pricing
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                            >
                                FAQ
                            </button>
                            <Link
                                href="/blog"
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 no-underline"
                                style={{ textDecoration: 'none' }}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/case-studies"
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 no-underline"
                                style={{ textDecoration: 'none' }}
                            >
                                Case Studies
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {!loadingAdmin && isAdmin && (
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-400 text-sm">Admin</span>
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline"
                                        size="sm"
                                        className="text-white border-gray-600 hover:bg-gray-800"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400 transition-colors duration-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 rounded-lg mt-2">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 w-full text-left"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('features')}
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 w-full text-left"
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 w-full text-left"
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 w-full text-left"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 w-full text-left"
                        >
                            FAQ
                        </button>
                        <a
                            href="/blog"
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 no-underline"
                            style={{ textDecoration: 'none' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </a>
                        <a
                            href="/case-studies"
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 no-underline"
                            style={{ textDecoration: 'none' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Case Studies
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
