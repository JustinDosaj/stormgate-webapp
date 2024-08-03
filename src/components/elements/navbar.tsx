// components/Navbar.tsx
import { useState } from 'react';
import Link from 'next/link';
import { UserCircleIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/', label: 'Home', isDropDown: false },
  { href: '/news', label: 'News', isDropDown: false },
  { href: '/builds', label: 'Builds', isDropDown: true },
];

const buildNav = [
  { href: '/builds/celestial-armada', label: 'Celestial Armada' },
  { href: '/builds/human-vanguard', label: 'Human Vanguard' },
  { href: '/builds/infernal-host', label: 'Infernal Host' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBuildsOpen, setIsBuildsOpen] = useState(false); // State to toggle Builds submenu in mobile

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* LOGO PLACEHOLDER */}
          <UserCircleIcon className="h-10 w-10" />
        </div>

        {/* Desktop Navigation Links Centered */}
        <ul className="hidden md:flex space-x-12 justify-center absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={item.isDropDown ? 'relative group' : ''}
            >
              <Link href={item.href} className={`hover:text-gray-400`}>
                {item.label}
              </Link>
              {item.isDropDown && (
                <div className="absolute opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 ease-in-out w-max">
                  <div className="left-0 mt-2 bg-gray-900 rounded-md">
                    {buildNav.map((build) => (
                      <Link
                        key={build.href}
                        href={build.href}
                        className="block px-4 py-2 hover:bg-gray-600 rounded-md"
                      >
                        {build.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop User Profile Section */}
        <div className="items-center hidden md:flex space-x-1">
          <UserCircleIcon className="h-8 w-8 text-gray-300" />
          <button className="" onClick={logout}> Logout</button>
          {user ? (
            <span>{user.email}</span>
          ) : (
            <>
              <span>Not logged in | </span>
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-600">
                Login
              </Link>
            </>
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
                {!item.isDropDown ? (
                  <Link href={item.href} className="hover:text-gray-400">
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsBuildsOpen(!isBuildsOpen)}
                    className="hover:text-gray-400 focus:outline-none flex justify-between items-center"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isBuildsOpen ? 'rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}

                {item.isDropDown && isBuildsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {buildNav.map((build) => (
                      <Link
                        key={build.href}
                        href={build.href}
                        className="block px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                      >
                        {build.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {/* Mobile User Profile Section */}
            <li className="flex items-center space-x-2 mt-4">
              <UserCircleIcon className="h-8 w-8 text-gray-300" />
              {user ? (
                <>
                  <span>{user.email}</span>
                </>
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
