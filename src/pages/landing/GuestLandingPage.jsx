import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';



const GuestLandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Splitaire
            </span>
          </div>
            <button onClick={()=>navigate('/signup')} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-10">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-8 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">No account required</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center text-gray-900 leading-tight mb-6 max-w-5xl">
            Split bills instantly, no sign up needed
          </h1>

          {/* CTA Button */}
          <button onClick={()=>navigate('/guest-1')} className="group bg-emerald-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-emerald-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-12 flex items-center space-x-3">
            <span>Create a Bill</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>

          {/* Hero Image */}
          <div className="w-full max-w-4xl relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop"
                alt="Friends enjoying together"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce hidden md:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">₦47.50</div>
                  <div className="text-sm text-gray-500">Total Split</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce hidden md:block" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Split Done</div>
                  <div className="text-sm text-gray-500">3 people</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl">
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Split</h3>
              <p className="text-gray-600">Calculate and split bills in seconds without any hassle</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Sign Up</h3>
              <p className="text-gray-600">Start splitting immediately with zero commitment</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Share Easily</h3>
              <p className="text-gray-600">Send split details to friends via link or QR code</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to split your first bill?
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Join thousands who trust Splitaire for fair and easy expense splitting
          </p>
          <button onClick={()=>navigate('/guest-1')} className="bg-white text-emerald-600 px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Create a Bill Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default GuestLandingPage;