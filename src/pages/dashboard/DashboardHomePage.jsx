// src/components/DashboardHomePage.jsx
import React from 'react';
import { Wallet, Plus, FileText, History, User, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHomePage = () => {
  const navigate = useNavigate()
  const recentActivity = [
    { id: 1, title: 'You paid for Groceries', amount: -45.00, time: '2 hours ago', type: 'expense' },
    { id: 2, title: 'David sent you money', amount: 20.00, time: 'Yesterday', type: 'income' },
    { id: 3, title: 'Split for Dinner', amount: -32.50, time: '2 days ago', type: 'expense' },
    { id: 4, title: 'Received payment for utilities', amount: 55.00, time: '2 days ago', type: 'income' },
  ];

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h2>
        <p className="text-gray-600">Keep track of your daily expenses and stay motivated</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-2">Available Balance</p>
            <h3 className="text-5xl font-bold">₦1,250.75</h3>
            <p className="text-emerald-100 text-sm mt-2">Last updated today</p>
          </div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Wallet className="w-7 h-7" />
          </div>
        </div>
        <button onClick={() => navigate('funds')} className="flex items-center space-x-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          <span>Add Funds</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Create New Bill</h3>
          <p className="text-gray-600 text-sm">Split expenses instantly with friends</p>
        </button>

        <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <History className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Transaction History</h3>
          <p className="text-gray-600 text-sm">View your past expenses and payments</p>
        </button>

        <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Manage Profile</h3>
          <p className="text-gray-600 text-sm">Update your personal details and account</p>
        </button>
      </div>

      {/* Total Spent Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gray-600 font-semibold mb-2">Total Spent (This Month)</h3>
            <p className="text-4xl font-bold text-red-600">-₦872.30</p>
            <p className="text-emerald-600 text-sm font-medium mt-2">5% less than last month - you are doing great!</p>
          </div>
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-right text-sm text-gray-600">75% of your typical monthly spending</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
          <button onClick={()=> navigate('/dashboard/history')} className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm">
            View All
          </button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-8 py-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ₦{
                    activity.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'
                  }`}>
                    {activity.type === 'income' ? (
                      <ArrowDownRight className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <p className={`text-xl font-bold ₦{
                  activity.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {activity.type === 'income' ? '+' : ''}₦{Math.abs(activity.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardHomePage;