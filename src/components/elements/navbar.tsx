import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserCircleIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/builds', label: 'Builds' },
];

export default function Navbar() {
  const { user, username } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-full md:w-1/3 flex justify-start">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <img src="/images/logos/sg-logo-250x50.png" alt="Stormgate Tactics Logo" className="h-10 w-auto" />
            </div>
          </Link>
        </div>
        {/* Desktop Navigation Links Centered */}
        <ul className="hidden md:flex space-x-12 justify-center md:w-1/3">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={router.pathname === item.href ? 'text-violet-00 underline' : ''}
            >
              <Link href={item.href} className={`hover:text-gray-400`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop User Profile Section */}
        <div className="items-center hidden md:flex space-x-1 md:w-1/3 justify-end">
          {user ? (
            <span>{username}</span>
          ) : (
            <>
              <span>Not logged in | </span>
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-600">
                Login
              </Link>
            </>
          )}
          {user && (
            <Link href="/profile">
              <UserCircleIcon className="h-7 w-7 text-gray-300 hover:text-gray-500" />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href} className="flex flex-col">
                <Link
                  href={item.href}
                  className={router.pathname === item.href ? 'text-violet-700 underline' : 'hover:text-gray-400'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {/* Mobile User Profile Section */}
            <li className="flex items-center space-x-2 mt-4">
              <Link href="/profile">
                <UserCircleIcon className="h-7 w-7 text-gray-300 hover:text-gray-500" />
              </Link>
              {user ? (
                <span>{username}</span>
              ) : (
                <>
                  <span>Not logged in</span>
                  <Link href="/auth/login" className="hover:text-gray-400">
                    Login
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
