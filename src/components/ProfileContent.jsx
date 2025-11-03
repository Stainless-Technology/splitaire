import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  User,
  ChevronDown,
  Camera,
  ChevronUp,
  Lock,
  Shield,
  Mail,
  UserCircle,
} from "lucide-react";

const ProfileContent = () => {
  const [notifications, setNotifications] = useState({
    bills: true,
    features: false,
    payments: true,
    marketing: false,
  });
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState({
    addBill: false,
    unevenSplit: false,
    invite: false,
    unpaid: false,
    updatePic: false,
  });

  const toggleFAQ = (key) => {
    setFaqs({ ...faqs, [key]: !faqs[key] });
  };

  const faqAnswers = {
    addBill:
      "To add a new bill, go to the 'Create Bill' section in the sidebar. Enter the bill name, total amount, participants, and any notes. Once saved, the app automatically calculates how much each person owes.",
    unevenSplit:
      "Yes! When creating a bill, you can enable 'Split Unevenly' and manually assign amounts or percentages to each participant. This is perfect when people contribute or consume different items.",
    invite:
      "After creating a bill, select 'Share' or 'Invite Members'. You can invite others by email, unique bill link, or QR code. Once they accept, the bill will appear in their dashboard.",
    unpaid:
      "You can mark a bill as 'Pending' until everyone pays their share. The app keeps track of unpaid amounts and sends reminders automatically, or you can send one manually from the Bill Details page.",
    updatePic:
      "Go to Profile → Profile Information, then click 'Change Avatar'. Choose a new image from your device and click 'Save Profile'. Your updated photo appears across all your groups and bills.",
  };

  const notificationLabels = {
    bills: "Bill Updates & Reminders",
    features: "New Features & Updates",
    payments: "Payment Confirmations",
    marketing: "Marketing & Promotions",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile & Settings
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Profile Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2.5 rounded-full shadow-lg border-2 border-gray-100 hover:bg-gray-50 transition">
                  <Camera className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Jane Doe
              </h2>
              <p className="text-gray-500 mb-6">jane.doe@example.com</p>
              <button className="w-full bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition shadow-sm">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <UserCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="jane.doe@example.com"
                    className="w-full border border-gray-300 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-700 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Security Settings
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Lock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Password</p>
                    <p className="text-sm text-gray-500">
                      Last changed 3 months ago
                    </p>
                  </div>
                </div>
                <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                  Change
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Shield className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Two-Factor Auth
                    </p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Methods
            </h2>
          </div>

          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition bg-gradient-to-r from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                    VISA
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      •••• •••• •••• 4242
                    </p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Remove
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition bg-gradient-to-r from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-orange-600 to-red-500 rounded flex items-center justify-center text-white font-bold text-xs">
                    MC
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      •••• •••• •••• 8888
                    </p>
                    <p className="text-sm text-gray-500">Expires 07/25</p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Remove
                </button>
              </div>
            </div>

            <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-emerald-600 font-semibold hover:border-emerald-500 hover:bg-emerald-50 transition">
              + Add New Payment Method
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Bell className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {notificationLabels[key]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {key === "bills" && "Get notified about bill updates"}
                    {key === "features" && "Learn about new app features"}
                    {key === "payments" && "Receive payment receipts"}
                    {key === "marketing" && "Special offers and news"}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      setNotifications({ ...notifications, [key]: !value })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Help & Support
            </h2>
          </div>

          <div className="space-y-3">
            {Object.entries(faqs).map(([key, open]) => (
              <div
                key={key}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-300 transition"
              >
                <button
                  onClick={() => toggleFAQ(key)}
                  className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center bg-white hover:bg-gray-50 transition"
                >
                  <span className="text-gray-900">
                    {key === "addBill" && "How do I add a new bill?"}
                    {key === "unevenSplit" && "Can I split bills unevenly?"}
                    {key === "invite" && "How do I invite others to a bill?"}
                    {key === "unpaid" && "What if someone doesn't pay?"}
                    {key === "updatePic" &&
                      "How do I update my profile picture?"}
                  </span>
                  {open ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {open && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faqAnswers[key]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 flex items-center gap-3 font-semibold shadow-sm transition"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfileContent;