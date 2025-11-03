import React from 'react';
import { CheckCircle, ArrowRight, Share2, Mail, MessageCircle, Sparkles, Download, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';


const BillSummaryPage = () => {
  
  const splits = [
    { id: 1, from: 'Alice', to: 'Bob', amount: 31.67, type: 'owes' },
    { id: 2, from: 'Alice', to: 'Bob', amount: 31.67, type: 'owes' },
    { id: 3, from: 'Bob', to: '', amount: 63.34, type: 'gets' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Success Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Bill Split Successfully!</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Bill is Split
          </h1>
          <p className="text-xl text-gray-600">
            Weekend Brunch at Cafe Delight
          </p>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 text-center border border-gray-100">
          <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide mb-3">Total Bill</p>
          <h2 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            ₦95.00
          </h2>
          <p className="text-gray-500 text-lg">Split among 3 people</p>
        </div>

        {/* Who Owes What Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-emerald-50 to-white px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Who Owes What</h2>
          </div>
          
          <div className="p-8 space-y-4">
            {splits.map((split) => (
              <div key={split.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ₦{
                    split.type === 'owes' 
                      ? 'bg-gradient-to-br from-orange-100 to-orange-50' 
                      : 'bg-gradient-to-br from-emerald-100 to-emerald-50'
                  }`}>
                    {split.type === 'owes' ? (
                      <ArrowRight className="w-6 h-6 text-orange-600" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    {split.type === 'owes' ? (
                      <p className="text-gray-900 font-semibold text-lg">
                        {split.from} owes {split.to}
                      </p>
                    ) : (
                      <p className="text-gray-900 font-semibold text-lg">
                        {split.from} gets back
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">₦{split.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-blue-50 to-white px-8 py-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Share2 className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Share Your Bill Easily</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                <Mail className="w-5 h-5" />
                <span>SMS</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </button>
            </div>

            {/* Link Copy */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value="https://splitaire.com/bill/abc123"
                  readOnly
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button className="flex items-center space-x-2 px-5 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Bill CTA */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-10 md:p-12 text-center text-white mb-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Save Your Bill & More?
          </h2>
          <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Sign up for Splitaire to track all your splits, manage payments and get personalized insights. It's free, quick and makes life simpler.
          </p>
          <button onClick={() => navigate('/signup')} className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-2">
            <span>Sign Up to Save</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md transition-all">
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all">
            <span>Create Another Bill</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BillSummaryPage;