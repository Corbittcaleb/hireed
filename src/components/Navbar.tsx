'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#0A1D37] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              HireED
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                href="/gigs"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/gigs')
                    ? 'bg-[#F4B400] text-[#0A1D37]'
                    : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
                }`}
              >
                Find Gigs
              </Link>
              <Link
                href="/post"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/post')
                    ? 'bg-[#F4B400] text-[#0A1D37]'
                    : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
                }`}
              >
                Post a Task
              </Link>
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#F4B400] hover:text-[#0A1D37]"
                  >
                    <span>{user.name}</span>
                    <svg
                      className={`h-5 w-5 transition-transform ${
                        isMenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/login')
                        ? 'bg-[#F4B400] text-[#0A1D37]'
                        : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/register')
                        ? 'bg-[#F4B400] text-[#0A1D37]'
                        : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#F4B400] hover:text-[#0A1D37] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/gigs"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/gigs')
                  ? 'bg-[#F4B400] text-[#0A1D37]'
                  : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Gigs
            </Link>
            <Link
              href="/post"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/post')
                  ? 'bg-[#F4B400] text-[#0A1D37]'
                  : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Post a Task
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#F4B400] hover:text-[#0A1D37]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#F4B400] hover:text-[#0A1D37]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/login')
                      ? 'bg-[#F4B400] text-[#0A1D37]'
                      : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/register')
                      ? 'bg-[#F4B400] text-[#0A1D37]'
                      : 'text-white hover:bg-[#F4B400] hover:text-[#0A1D37]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 