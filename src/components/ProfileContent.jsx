import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Bell, HelpCircle, LogOut, User, ChevronDown, Camera, ChevronUp, Lock, Shield, Mail, UserCircle, Loader, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
const ProfileContent = () => {
  const navigate = useNavigate();
  const {
    user,
    logout,
    loading: authLoading
  } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || ''
  });
  const [notifications, setNotifications] = useState({
    bills: true,
    features: false,
    payments: true,
    marketing: false
  });
  const [faqs, setFaqs] = useState({
    addBill: false,
    unevenSplit: false,
    invite: false,
    unpaid: false,
    updatePic: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const toggleFAQ = key => {
    setFaqs({
      ...faqs,
      [key]: !faqs[key]
    });
  };
  const faqAnswers = {
    addBill: "To add a new bill, go to 'Create Bill' from the dashboard. Enter the bill name, total amount, participants' details, and any notes. Once saved, the app automatically calculates how much each person owes.",
    unevenSplit: "Yes! When creating a bill, you can select 'Custom Split' and manually assign amounts to each participant. This is perfect when people order different items or contribute different amounts.",
    invite: "After creating a bill, click 'Copy Link' to share the bill link with participants via email, messaging apps, or social media. They can view the bill and mark their payments.",
    unpaid: "The app tracks payment status for each participant. You can mark payments as paid/unpaid from the bill details page. Bills remain 'Pending' until all participants have paid their share.",
    updatePic: "Go to Profile → Edit Profile, then click 'Change Avatar'. Choose a new image from your device and click 'Save Changes'. Your updated photo will appear across the app."
  };
  const notificationLabels = {
    bills: "Bill Updates & Reminders",
    features: "New Features & Updates",
    payments: "Payment Confirmations",
    marketing: "Marketing & Promotions"
  };
  const handleSaveProfile = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      if (!formData.fullName.trim()) {
        setError('Full name is required');
        setSaving(false);
        return;
      }
      setTimeout(() => {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setSaving(false);
        setTimeout(() => setSuccess(''), 3000);
      }, 1000);
    } catch (err) {
      setError('Failed to update profile');
      setSaving(false);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/login');
    }
  };
  const getInitials = name => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  if (authLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile & Settings
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {}
        {success && <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <p className="text-emerald-800 font-semibold">{success}</p>
          </div>}

        {error && <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 font-semibold">{error}</p>
          </div>}

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-white">
                    {getInitials(user?.fullName)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2.5 rounded-full shadow-lg border-2 border-gray-100 hover:bg-gray-50 transition" title="Change avatar (coming soon)">
                  <Camera className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.fullName || 'User'}
              </h2>
              <p className="text-gray-500 mb-2">{user?.email || 'user@example.com'}</p>
              <p className="text-xs text-gray-400 mb-6">
                Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })}
              </p>
              <button onClick={() => setIsEditing(!isEditing)} className="w-full bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition shadow-sm">
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {}
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
                <input type="text" value={formData.fullName} onChange={e => setFormData({
                ...formData,
                fullName: e.target.value
              })} disabled={!isEditing || saving} placeholder="Enter your full name" className={`w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''} ${saving ? 'opacity-50' : ''}`} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" value={formData.email} disabled={true} placeholder="your.email@example.com" className="w-full border border-gray-300 text-gray-900 rounded-xl pl-12 pr-4 py-3 bg-gray-50 cursor-not-allowed" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {isEditing && <div className="pt-4 flex gap-3">
                  <button onClick={handleSaveProfile} disabled={saving} className={`bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-700 transition shadow-sm flex items-center gap-2 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {saving ? <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </> : 'Save Changes'}
                  </button>
                  <button onClick={() => {
                setIsEditing(false);
                setFormData({
                  fullName: user?.fullName || '',
                  email: user?.email || ''
                });
              }} disabled={saving} className="bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-300 transition">
                    Cancel
                  </button>
                </div>}
            </div>
          </div>
        </div>

        {}
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
                      Keep your account secure
                    </p>
                  </div>
                </div>
                <button className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition" onClick={() => alert('Password change feature coming soon!')}>
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
                      Coming soon
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
                  <input type="checkbox" disabled className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Methods
            </h2>
          </div>

          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Payment Integration Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're working on integrating payment methods to make bill splitting even easier!
            </p>
          </div>
        </div>

        {}
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
            {Object.entries(notifications).map(([key, value]) => <div key={key} className="flex justify-between items-center border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition">
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
                  <input type="checkbox" checked={value} onChange={() => setNotifications({
                ...notifications,
                [key]: !value
              })} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>)}
          </div>
        </div>

        {}
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
            {Object.entries(faqs).map(([key, open]) => <div key={key} className="border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-300 transition">
                <button onClick={() => toggleFAQ(key)} className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center bg-white hover:bg-gray-50 transition">
                  <span className="text-gray-900">
                    {key === "addBill" && "How do I add a new bill?"}
                    {key === "unevenSplit" && "Can I split bills unevenly?"}
                    {key === "invite" && "How do I invite others to a bill?"}
                    {key === "unpaid" && "What if someone doesn't pay?"}
                    {key === "updatePic" && "How do I update my profile picture?"}
                  </span>
                  {open ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {open && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faqAnswers[key]}
                    </p>
                  </div>}
              </div>)}
          </div>
        </div>

        {}
        <div className="flex justify-center pt-4">
          <button onClick={handleLogout} type="button" className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 flex items-center gap-3 font-semibold shadow-sm transition">
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </main>
    </div>;
};
export default ProfileContent;