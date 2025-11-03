import React, { useState } from 'react';
import { Plus, X, User, DollarSign, FileText, Users, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../src/components/Navbar';


const GuestCreateBillPage = () => {
  const navigate = useNavigate()
  const [splitType, setSplitType] = useState('equal');
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Me', isMe: true },
    { id: 2, name: 'Friend A', isMe: false },
    { id: 3, name: 'Friend B', isMe: false }
  ]);

  const addParticipant = () => {
    const newId = participants.length + 1;
    setParticipants([...participants, { id: newId, name: `Friend ₦{String.fromCharCode(64 + newId)}`, isMe: false }]);
  };

  const removeParticipant = (id) => {
    if (participants.length > 1) {
      setParticipants(participants.filter(p => p.id !== id));
    }
  };

  const updateParticipantName = (id, newName) => {
    setParticipants(participants.map(p => p.id === id ? { ...p, name: newName } : p));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* <Navbar /> */}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Quick & Easy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Create a bill
          </h1>
          <p className="text-lg text-gray-600">
            Split expenses effortlessly with your friends and family
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {/* Bill Details Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Bill Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Weekend Brunch"
                      defaultValue="Weekend Brunch"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 font-medium"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="0.00"
                      defaultValue="75.5"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* How to Split Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">How to Split?</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSplitType('equal')}
                  className={`flex-1 min-w-[140px] px-6 py-4 rounded-xl font-semibold transition-all duration-200 ₦{
                    splitType === 'equal'
                      ? 'bg-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Equal Split</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setSplitType('custom')}
                  className={`flex-1 min-w-[140px] px-6 py-4 rounded-xl font-semibold transition-all duration-200 ₦{
                    splitType === 'custom'
                      ? 'bg-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Custom Split</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Who's Splitting Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Who's Splitting?</h2>
                </div>
                <span className="text-sm text-gray-500 font-medium">{participants.length} people</span>
              </div>
              
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={participant.name}
                        onChange={(e) => updateParticipantName(participant.id, e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-medium ₦{
                          participant.isMe
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-900 focus:border-emerald-500'
                            : 'border-gray-200 bg-white text-gray-900 focus:border-purple-500'
                        }`}
                      />
                      {participant.isMe && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                          YOU
                        </span>
                      )}
                    </div>
                    {!participant.isMe && participants.length > 1 && (
                      <button
                        onClick={() => removeParticipant(participant.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={addParticipant}
                  className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Participant</span>
                </button>
              </div>
            </div>

            {/* Optional Notes Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Optional Notes</h2>
              <textarea
                placeholder="Write anything..."
                defaultValue="Write anything"
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none text-gray-900"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button onClick={()=>navigate('/billsummary')} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Proceed to Summary</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-600 font-medium">Instant calculation</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-gray-600 font-medium">Secure & private</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">📱</div>
            <p className="text-sm text-gray-600 font-medium">Easy to share</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestCreateBillPage;