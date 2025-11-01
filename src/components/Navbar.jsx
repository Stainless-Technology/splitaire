import React from 'react'
import { Menu, X, Users, Receipt, Wallet } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Splitaire
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              How it Works
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              About
            </a> */}
            <button className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Login
            </button>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-100">
            <a href="#features" className="block py-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              How it Works
            </a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              About
            </a>
            <button className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Login
            </button>
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar