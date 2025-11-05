import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Search, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return <div className="flex min-h-screen bg-gray-50">
      {}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {}
      <div className="flex-1 flex flex-col">
        {}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              
              <div className="hidden lg:block">
                <h1 className="text-2xl font-bold text-gray-900">
                  Dashboard
                </h1>
              </div>

              <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Search bills, participants..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
              </div>

              <button onClick={() => navigate('/dashboard/profile')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        {}
        <main className="flex-1 px-4 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default DashboardLayout;