import React from 'react';
import { X, Home, Plus, History, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
const menuItems = [{
  id: 'home',
  label: 'Home',
  icon: Home,
  path: '/dashboard'
}, {
  id: 'create',
  label: 'Create Bill',
  icon: Plus,
  path: '/dashboard/create-bill'
}, {
  id: 'history',
  label: 'History',
  icon: History,
  path: '/dashboard/history'
}, {
  id: 'profile',
  label: 'Profile',
  icon: User,
  path: '/dashboard/profile'
}];
const MenuItems = ({
  handleMenuClick
}) => {
  const location = useLocation();
  return <nav className="flex-1 p-4 space-y-2">
      {menuItems.map(item => {
      const Icon = item.icon;
      const isActive = location.pathname === item.path;
      return <Link key={item.id} to={item.path} onClick={handleMenuClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Icon className="w-5 h-5" />
            <span className="font-semibold">{item.label}</span>
          </Link>;
    })}
    </nav>;
};
const Sidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const handleMenuClick = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  return <>
      {}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Logo />
          <span className="text-xl font-bold text-emerald-600">
            Splitaire
          </span>
        </div>
        <MenuItems handleMenuClick={handleMenuClick} />
      </aside>

      {}
      {isMobileMenuOpen && <>
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="lg:hidden fixed left-0 top-0 w-64 bg-white h-screen z-50 shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="text-xl font-bold text-emerald-600">
                  Splitaire
                </span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <MenuItems handleMenuClick={handleMenuClick} />
          </aside>
        </>}
    </>;
};
export default Sidebar;