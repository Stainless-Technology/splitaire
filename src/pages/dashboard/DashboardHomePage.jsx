import React, { useEffect } from 'react';
import { Wallet, Plus, FileText, History, User, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useBillStats, useUserBills } from '../../hooks/useBills';
const DashboardHomePage = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated
  } = useAuth();
  const {
    stats,
    loading: statsLoading
  } = useBillStats();
  const {
    bills,
    loading: billsLoading
  } = useUserBills({
    page: 1,
    limit: 4
  });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  const recentActivity = bills.map(bill => ({
    id: bill.billId,
    title: bill.billName,
    amount: bill.totalAmount,
    time: new Date(bill.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),
    type: 'expense',
    isSettled: bill.isSettled
  }));
  const totalSpent = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
  const firstName = user?.fullName?.split(' ')[0] || 'User';
  return <>
      {}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {firstName}!
        </h2>
        <p className="text-gray-600">Keep track of your expenses and stay organized</p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-emerald-100 text-sm font-medium mb-2">Total Bills</p>
              <h3 className="text-5xl font-bold">
                {statsLoading ? '...' : stats?.totalBills || 0}
              </h3>
              <p className="text-emerald-100 text-sm mt-2">All time</p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
          </div>
        </div>

        {}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-2">Settled Bills</p>
              <h3 className="text-5xl font-bold">
                {statsLoading ? '...' : stats?.settledBills || 0}
              </h3>
              <p className="text-blue-100 text-sm mt-2">Fully paid</p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <Wallet className="w-7 h-7" />
            </div>
          </div>
        </div>

        {}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-2">Pending Bills</p>
              <h3 className="text-5xl font-bold">
                {statsLoading ? '...' : stats?.pendingBills || 0}
              </h3>
              <p className="text-orange-100 text-sm mt-2">Awaiting payment</p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <RefreshCw className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button onClick={() => navigate('/dashboard/create-bill')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Create New Bill</h3>
          <p className="text-gray-600 text-sm">Split expenses instantly with friends</p>
        </button>

        <button onClick={() => navigate('/dashboard/history')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <History className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Bill History</h3>
          <p className="text-gray-600 text-sm">View your past bills and payments</p>
        </button>

        <button onClick={() => navigate('/dashboard/profile')} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all text-left group">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Manage Profile</h3>
          <p className="text-gray-600 text-sm">Update your personal details and account</p>
        </button>
      </div>

      {}
      {stats && <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-600 font-semibold mb-2">Total Amount (All Bills)</h3>
              <p className="text-4xl font-bold text-emerald-600">
                ₦{stats.totalAmount.toFixed(2)}
              </p>
              <p className="text-gray-600 text-sm font-medium mt-2">
                {stats.settledBills} of {stats.totalBills} bills settled
              </p>
            </div>
            <button onClick={() => window.location.reload()} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {}
          {stats.totalBills > 0 && <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-500" style={{
            width: `${stats.settledBills / stats.totalBills * 100}%`
          }}></div>
              </div>
              <p className="text-right text-sm text-gray-600">
                {Math.round(stats.settledBills / stats.totalBills * 100)}% of bills settled
              </p>
            </div>}
        </div>}

      {}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Recent Bills</h3>
          <button onClick={() => navigate('/dashboard/history')} className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm">
            View All
          </button>
        </div>

        {billsLoading ? <div className="px-8 py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600">Loading bills...</p>
          </div> : recentActivity.length > 0 ? <div className="divide-y divide-gray-100">
            {recentActivity.map(activity => <div key={activity.id} onClick={() => navigate(`/bill/${activity.id}`)} className="px-8 py-5 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.isSettled ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                      {activity.isSettled ? <ArrowDownRight className="w-6 h-6 text-emerald-600" /> : <ArrowUpRight className="w-6 h-6 text-orange-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${activity.isSettled ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                          {activity.isSettled ? 'Settled' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    ₦{activity.amount.toFixed(2)}
                  </p>
                </div>
              </div>)}
          </div> : <div className="px-8 py-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No bills yet</h4>
            <p className="text-gray-600 mb-6">Create your first bill to get started</p>
            <button onClick={() => navigate('/dashboard/create-bill')} className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Create Bill</span>
            </button>
          </div>}
      </div>
    </>;
};
export default DashboardHomePage;