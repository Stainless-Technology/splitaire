import React, { useState } from 'react';
import { Share2, Download, Check, Clock, DollarSign, MessageCircle, Send, Users, Calendar } from 'lucide-react';


const BillViewPage = () => {
  const [comment, setComment] = useState('');
  
  const participants = [
    { id: 1, name: 'Alex Johnson', amount: 31.44, status: 'pending' },
    { id: 2, name: 'Moresca Breezy', amount: 31.44, status: 'paid' },
    { id: 3, name: 'Golden Ade', amount: 31.44, status: 'pending' },
    { id: 4, name: 'Moresca Breezy', amount: 31.44, status: 'paid' }
  ];

  const comments = [
    { id: 1, author: 'Alex Johnson', text: "I'll send my share by tomorrow morning. Thanks for organizing!", timestamp: 'Nov 3, 2025 3:25 pm' },
    { id: 2, author: 'Alex Johnson', text: "I'll send my share by tomorrow morning. Thanks for organizing!", timestamp: 'Nov 3, 2025 3:25 pm' }
  ];

  const totalPaid = participants.filter(p => p.status === 'paid').length;
  const totalPending = participants.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
          
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            View Your Bill
          </h1>
          <p className="text-gray-600">
            This is a temporary view of the bill. You can check details, mark your share as paid, or add comments.
          </p>
        </div>

        {/* Bill Summary Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <p className="text-emerald-100 text-sm font-medium mb-2">Total Amount</p>
              <h2 className="text-5xl md:text-6xl font-extrabold">₦125.75</h2>
              <p className="text-emerald-100 mt-2 text-lg">Team Dinner at the Eatery</p>
            </div>
            
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-2">
                  <Check className="w-10 h-10" />
                </div>
                <p className="text-2xl font-bold">{totalPaid}</p>
                <p className="text-emerald-100 text-sm">Paid</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-2">
                  <Clock className="w-10 h-10" />
                </div>
                <p className="text-2xl font-bold">{totalPending}</p>
                <p className="text-emerald-100 text-sm">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Owes What Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 md:px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Who Owes What</h2>
              </div>
              <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                Mark as Paid
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {participants.map((participant) => (
              <div key={participant.id} className="px-6 md:px-8 py-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{participant.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-500 font-medium">₦{participant.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {participant.status === 'paid' ? (
                    <span className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Paid</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200">
            <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Mark all as Paid</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 md:px-8 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
            </div>
          </div>
          
          {/* Comment Input */}
          <div className="px-6 md:px-8 py-6 border-b border-gray-200">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                Y
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none text-gray-900"
                ></textarea>
                <button className="mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                  <span>Post Comment</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Comments List */}
          <div className="divide-y divide-gray-100">
            {comments.map((cmt) => (
              <div key={cmt.id} className="px-6 md:px-8 py-6 hover:bg-gray-50 transition-colors">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {cmt.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{cmt.author}</p>
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{cmt.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{cmt.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillViewPage;