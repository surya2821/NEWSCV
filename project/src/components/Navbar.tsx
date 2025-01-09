import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Newspaper, LogIn, LogOut, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Conditionally Render Category Buttons */}
        {session && (
          <div className="flex justify-between items-center py-2">
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/cricket')}
                className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
              >
                Cricket
              </button>

              <button
                onClick={() => navigate('/telugunews')}
                className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
              >
                TeluguNews
              </button>
              <button
                onClick={() => navigate('/politics')}
                className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
              >
                Telugu News Paper
              </button>
              <button
                onClick={() => navigate('/geography')}
                className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
              >
                Geography
              </button>
            </div>
          </div>
        )}

        {/* Main Navbar Section */}
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Newspaper className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">NewsWidget</span>
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
