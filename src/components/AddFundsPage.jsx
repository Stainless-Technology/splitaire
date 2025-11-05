import React, { useState } from "react";
import {
  Plus,
  CreditCard,
  Lock,
  Calendar,
  User,
  http://localhost:5173/bill/935b4457-b118-4005-820a-57970c00eb07,
  Sparkles,
  ArrowRight,
  Wallet,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
const AddFundsPage = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const quickAmounts = [20, 50, 100, 200];
  const handleAddFunds = async (e) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert("Please fill in all payment details");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`₦${amount} has been added to your account!`);
      navigate("/dashboard");
    }, 2000);
  };
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.substring(0, 19);
  };
  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <Wallet className="w-4 h-4" />
            <span className="text-sm font-semibold">Quick & Secure</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Add Funds
          </h1>
          <p className="text-lg text-gray-600">
            Choose an amount and fund your account securely
          </p>
        </div>

        {}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleAddFunds} className="p-6 md:p-8 space-y-8">
            {}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FaNairaSign className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Choose Amount
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                      selectedAmount === amount && !customAmount
                        ? "bg-emerald-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}>
                    ₦{amount}
                  </button>
                ))}
              </div>

              {}
              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-bold text-emerald-600 z-10">
                  Custom Amount
                </label>
                <div className="relative">
                  <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder="Enter custom amount"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 font-semibold"
                  />
                </div>
              </div>
            </div>

            {}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Details
                </h2>
              </div>

              <div className="space-y-4">
                {}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-bold text-purple-600 z-10">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 font-semibold"
                    />
                  </div>
                </div>

                {}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-bold text-purple-600 z-10">
                    Cardholder Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 font-semibold"
                    />
                  </div>
                </div>

                {}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-bold text-purple-600 z-10">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) =>
                          setExpiryDate(formatExpiryDate(e.target.value))
                        }
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-bold text-purple-600 z-10">
                      CVV
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        maxLength="3"
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>Add ₦{customAmount || selectedAmount}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-gray-600 font-medium">Secure Payment</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-600 font-medium">
              Instant Transfer
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">✓</div>
            <p className="text-sm text-gray-600 font-medium">Verified Safe</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AddFundsPage;
