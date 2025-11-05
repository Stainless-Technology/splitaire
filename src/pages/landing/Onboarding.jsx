import React from 'react';
import { Menu, X, Users, Receipt, Wallet } from 'lucide-react';
import Navbar from '../../components/Navbar';
import FeatureCard from '../../components/FeaturedCard';
import { useNavigate } from 'react-router-dom';
const Onboarding = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <Navbar />

      {}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Splitaire!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
              Your journey to effortless expense management starts here
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={() => navigate('/welcome')} className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300">
              Learn More
            </button>
          </div>

          {}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">100K+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">₦50M+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Split Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">4.9★</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FeatureCard icon={Receipt} title="Split Bills Instantly, No Sign-up Needed" description="Jump right in and start splitting expenses with friends. Our instant bill splitting feature requires zero commitment - just enter amounts and share. Perfect for quick calculations when dining out or traveling together." image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop" reverse={false} />

        <FeatureCard icon={Users} title="Manage Expenses Effortlessly with Friends and Family" description="Keep track of shared costs without the awkward conversations. Our intuitive interface makes it easy to add expenses, see who owes what, and settle up when convenient. Transparency and fairness built right in." image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" reverse={true} />

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center space-y-6 shadow-2xl">
          <Wallet className="w-16 h-16 mx-auto" />
          <h3 className="text-3xl md:text-4xl font-bold">
            Group Money Management: Create groups, add members, and manage common funds effortlessly
          </h3>
          <p className="text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto">
            Whether it's a vacation fund, household expenses, or a group gift, manage shared money with complete transparency and ease.
          </p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mt-4">
            Create Your First Group
          </button>
        </div>
      </section>

      {}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 text-center text-white space-y-6 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Simplify Your Expenses?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of users who've made expense splitting effortless
          </p>
          <button onClick={() => navigate('/welcome')} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-4">
            Get Started Free
          </button>
        </div>
      </section>

      {}
      {}
    </div>;
};
export default Onboarding;