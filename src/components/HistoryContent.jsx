import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Users, X, ChevronDown, FileText, Loader } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useUserBills } from "../hooks/useBills";
const HistoryContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    isAuthenticated
  } = useAuth();
  const settledParam = statusFilter === 'settled' ? true : statusFilter === 'pending' ? false : undefined;
  const {
    bills,
    loading,
    error,
    pagination
  } = useUserBills({
    page,
    limit: 9,
    settled: settledParam
  });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  const filteredBills = bills.filter(bill => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return bill.billName.toLowerCase().includes(searchLower) || bill.participants?.some(p => p.name.toLowerCase().includes(searchLower) || p.email.toLowerCase().includes(searchLower));
  });
  const getStatusColor = isSettled => {
    return isSettled ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700";
  };
  const getStatusText = isSettled => {
    return isSettled ? "Settled" : "Pending";
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPage(1);
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gray-50 flex">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
          {}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Bill History
            </h1>
            <p className="text-lg text-gray-600">
              Track, filter and view all your past bills at a glance
            </p>
          </div>

          {}
          <div className="flex flex-wrap justify-between items-center gap-4 bg-white shadow-lg border border-gray-100 rounded-3xl p-6 mb-10">
            <div className="flex flex-wrap gap-3">
              {}
              <div className="relative">
                <select value={statusFilter} onChange={e => {
                setStatusFilter(e.target.value);
                setPage(1);
              }} className="appearance-none flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer pr-8">
                  <option value="all">All Statuses</option>
                  <option value="settled">Settled Only</option>
                  <option value="pending">Pending Only</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {}
              {(searchQuery || statusFilter !== 'all') && <button onClick={handleClearFilters} className="flex items-center gap-2 px-4 py-2 text-emerald-600 text-sm hover:text-emerald-700 transition-colors">
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>}
            </div>

            {}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search bills, participants..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 w-72" />
            </div>
          </div>

          {}
          {loading && <div className="flex flex-col items-center justify-center py-20">
              <Loader className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Loading your bills...</p>
            </div>}

          {}
          {error && <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-800 font-semibold mb-2">Failed to load bills</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Retry
              </button>
            </div>}

          {}
          {!loading && !error && filteredBills.length === 0 && <div className="bg-white border-2 border-gray-200 rounded-3xl p-12 text-center">
              <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {searchQuery || statusFilter !== 'all' ? "No bills found" : "No bills yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== 'all' ? "Try adjusting your filters or search query" : "Create your first bill to get started"}
              </p>
              {!searchQuery && statusFilter === 'all' && <button onClick={() => navigate('/create-bill')} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
                  <FileText className="w-5 h-5" />
                  <span>Create Your First Bill</span>
                </button>}
              {(searchQuery || statusFilter !== 'all') && <button onClick={handleClearFilters} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors">
                  <X className="w-5 h-5" />
                  <span>Clear Filters</span>
                </button>}
            </div>}

          {}
          {!loading && !error && filteredBills.length > 0 && <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredBills.map(bill => <div key={bill.billId} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer" onClick={() => navigate(`/dashboard/historydetail/${bill.billId}`)}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 flex-1 mr-2">
                        {bill.billName}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg whitespace-nowrap ${getStatusColor(bill.isSettled)}`}>
                        {getStatusText(bill.isSettled)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(bill.createdAt)}
                    </p>

                    <div className="mb-4">
                      <p className="text-3xl font-bold text-emerald-600">
                        ₦{bill.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Users className="inline w-4 h-4 mr-1 text-gray-400" />
                        {bill.participantsCount || bill.participants?.length || 0} participants
                      </p>
                    </div>

                    <button onClick={e => {
                e.stopPropagation();
                navigate(`/dashboard/historydetail/${bill.billId}`);
              }} className="w-full mt-3 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all">
                      View Details
                    </button>
                  </div>)}
              </div>

              {}
              {pagination && pagination.totalPages > 1 && <div className="flex justify-center items-center gap-4 mt-8">
                  <button onClick={() => setPage(page - 1)} disabled={!pagination.hasPrevPage} className={`px-6 py-3 rounded-xl font-semibold transition-all ${pagination.hasPrevPage ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                  </div>

                  <button onClick={() => setPage(page + 1)} disabled={!pagination.hasNextPage} className={`px-6 py-3 rounded-xl font-semibold transition-all ${pagination.hasNextPage ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    Next
                  </button>
                </div>}

              {}
              {pagination && <p className="text-center text-gray-600 mt-6">
                  Showing {filteredBills.length} of {pagination.totalItems} total bills
                </p>}
            </>}
        </main>
      </div>
    </div>;
};
export default HistoryContent;