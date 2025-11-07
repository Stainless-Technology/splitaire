import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  Users,
  Smartphone,
  Shield,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const LearnMore = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
        <Navbar />
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Splitaire</h1>
        <p className="text-lg text-green-50 max-w-2xl mx-auto">
          Split bills, track expenses, and settle up seamlessly — because money
          shouldn’t come between friends.
        </p>
        <button onClick={() => navigate('/welcome')} className="mt-8 px-8 py-4 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-green-50 transition">
          Get Started
        </button>
      </section>

      <section className="py-16 px-8 text-center">
        <Lightbulb className="w-10 h-10 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          At Splitaire, we’re redefining how groups handle shared expenses.
          Our goal is to make money management transparent, fair, and stress-free —
          so you can focus on making memories, not managing receipts.
        </p>
      </section>

      <section className="bg-neutral-800 py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Splitaire?</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 shadow hover:shadow-lg transition">
            <Users className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Group Friendly</h3>
            <p className="text-gray-400 text-sm">
              Add unlimited friends, family, or teammates to split expenses fairly.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 shadow hover:shadow-lg transition">
            <Smartphone className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Works Everywhere</h3>
            <p className="text-gray-400 text-sm">
              Access Splitaire anytime, anywhere — on desktop, tablet, or mobile.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 shadow hover:shadow-lg transition">
            <Shield className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
            <p className="text-gray-400 text-sm">
              Your data is encrypted and protected with bank-level security.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 shadow hover:shadow-lg transition">
            <Sparkles className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Smart Insights</h3>
            <p className="text-gray-400 text-sm">
              Get insights into your spending habits and group balances.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 shadow hover:shadow-lg transition">
            <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Fair & Transparent</h3>
            <p className="text-gray-400 text-sm">
              Know exactly who owes who — no confusion, no hidden numbers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-gradient-to-r from-green-700 to-emerald-600">
        <h2 className="text-4xl font-bold mb-3">Split Smarter. Live Better.</h2>
        <p className="text-green-50 mb-6">
          Join thousands of people simplifying shared expenses with Splitaire today.
        </p>
        <button onClick={() => navigate("/guest-1")} className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-green-50 transition">
          Try It Free
        </button>
      </section>
    </div>
  );
};

export default LearnMore;
