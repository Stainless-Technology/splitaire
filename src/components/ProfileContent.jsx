import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxSwitch } from "react-icons/rx";
import {
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  User,
  ChevronDown,
  Camera,
  ChevronUp,
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Profile & Settings
        </h1>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Profile Information
            </h2>
            <div className="flex flex-col items-start space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <button className="mt-3 flex items-center gap-2 font-semibold px-6 py-3 rounded-lg text-sm text-white bg-emerald-600 border hover:underline">
                  <Camera className="w-4 h-4" /> Change Avatar
                </button>
              </div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full border border-gray-300 text-black rounded-lg p-3"
              />
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Jane.doe@example.com"
                className="w-full border border-gray-300 text-black rounded-lg p-3"
              />
              <button className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 transition">
                Save Profile
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Account Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-gray-700">Change Password</p>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-800">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3">
                <p className="font-medium text-gray-700">
                  Two-Factor Authentication
                </p>
                <RxSwitch className="accent-emerald-600 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" /> Payment Method
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3">
              <p>
                Visa ending in 4242 <br /> • Expires 12/25
              </p>
              <button className="text-sm text-red-500 hover:underline">
                Remove
              </button>
            </div>
            <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3">
              <p>
                Mastercard ending in 8888 <br /> • Expires 7/25
              </p>
              <button className="text-sm text-red-500 hover:underline">
                Remove
              </button>
            </div>
            <button className="text-sm text-emerald-600 hover:underline">
              + Add New Method
            </button>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" /> Notification
            Preferences
          </h2>
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center border border-gray-300 rounded-lg p-3"
              >
                <p className="capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    setNotifications({ ...notifications, [key]: !value })
                  }
                  className="accent-emerald-600 w-5 h-5"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" /> Help and Support
          </h2>
          <div className="space-y-3">
            {Object.entries(faqs).map(([key, open]) => (
              <div key={key} className="border border-gray-300 rounded-lg">
                <button
                  onClick={() => toggleFAQ(key)}
                  className="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                >
                  <span>
                    {key === "addBill" && "How do I add a new bill?"}
                    {key === "unevenSplit" && "Can I split bills unevenly?"}
                    {key === "invite" && "How do I invite others to a bill?"}
                    {key === "unpaid" && "What if someone doesn’t pay?"}
                    {key === "updatePic" &&
                      "How do I update my profile picture?"}
                  </span>
                  {open ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {open && (
                  <p className="px-4 pb-3 text-gray-600 text-sm leading-relaxed border-t bg-gray-50">
                    {faqAnswers[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          type="button"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </main>
    </div>
  );
};

export default ProfileContent;
