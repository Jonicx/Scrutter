import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, Menu, X, User, Calendar, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, setUserRole } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  const handleRoleChange = (role: 'user' | 'organizer' | 'admin') => {
    setUserRole(role);
  };

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-white">TicketEasily</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/events') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
              }`}
            >
              Events
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-tickets"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/my-tickets') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>My Tickets</span>
                </Link>
                {user?.role === 'organizer' && (
                  <Link
                    to="/organizer"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/organizer') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/admin') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <select
                    value={user?.role || 'user'}
                    onChange={(e) => handleRoleChange(e.target.value as 'user' | 'organizer' | 'admin')}
                    className="text-xs bg-gray-700 border border-gray-600 text-white rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="organizer">Organizer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  onClick={logout}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-700 py-2">
            <div className="space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/events') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/about') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/contact') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/my-tickets"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/my-tickets') ? 'text-purple-400 bg-purple-900' : 'text-gray-300 hover:text-purple-400 hover:bg-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    My Tickets
                  </Link>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;