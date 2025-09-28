"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(true);

    useEffect(() => {
        // Check admin status on component mount
        const checkAdminStatus = async () => {
            try {
                const response = await fetch('/api/auth/check');
                const data = await response.json();
                setIsAdmin(data.isAdmin || false);
            } catch (error) {
                setIsAdmin(false);
            } finally {
                setLoadingAdmin(false);
            }
        };

        checkAdminStatus();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setIsAdmin(false);
            // Refresh the page to update UI
            window.location.reload();
        } catch (error) {
            console.error('Logout failed');
        }
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
                            <Link
                                href="/"
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 no-underline"
                                style={{ textDecoration: 'none' }}
                            >
                                Home
                            </Link>
                            <Link
                                href="#about"
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 no-underline"
                                style={{ textDecoration: 'none' }}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-300 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-200 no-underline"
                                style={{ textDecoration: 'none' }}
                            >
                                Contact
                            </Link>
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
                            {!loadingAdmin && (
                                <>
                                    {isAdmin ? (
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
                                    ) : (
                                        <Link
                                            href="/admin/login"
                                            className="text-gray-300 hover:text-yellow-400 text-sm px-3 py-2 font-medium transition-all duration-200 no-underline"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Admin Login
                                        </Link>
                                    )}
                                </>
                            )}
                            <Link
                                href="/contact"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 no-underline"
                                style={{ textDecoration: 'none' }}
                            >
                                Get Started
                            </Link>
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
                        <a
                            href="/"
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 no-underline"
                            style={{ textDecoration: 'none' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 no-underline"
                            style={{ textDecoration: 'none' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </a>
                        <a
                            href="/contact"
                            className="text-gray-300 hover:text-yellow-400 block px-3 py-2 text-base font-medium transition-all duration-200 no-underline"
                            style={{ textDecoration: 'none' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </a>
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
                        <div className="pt-4">
                            <a
                                href="/contact"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-base font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 block text-center w-full no-underline"
                                style={{ textDecoration: 'none' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
