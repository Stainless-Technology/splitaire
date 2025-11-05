import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, CheckCircle, XCircle, Loader, Copy, Check, Calendar, DollarSign, FileText, CreditCard, Building2, User } from "lucide-react";
import { useBill } from "../hooks/useBills";
const PaymentAccountDetails = ({
  accountDetails,
  currency = 'USD'
}) => {
  const [copiedField, setCopiedField] = useState(null);
  const hasAccountDetails = accountDetails && (accountDetails.bankName || accountDetails.accountNumber || accountDetails.accountHolderName || accountDetails.paymentHandle);
  if (!hasAccountDetails) {
    return null;
  }
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };
  return <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Payment Information</h3>
          <p className="text-sm text-gray-600">Send your payment using the details below</p>
        </div>
      </div>

      <div className="space-y-3">
        {accountDetails.accountHolderName && <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Account Holder
                  </p>
                  <p className="text-base font-bold text-gray-900 break-words">
                    {accountDetails.accountHolderName}
                  </p>
                </div>
              </div>
              <button onClick={() => copyToClipboard(accountDetails.accountHolderName, 'holder')} className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" title="Copy to clipboard">
                {copiedField === 'holder' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>}

        {accountDetails.bankName && <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Bank Name
                  </p>
                  <p className="text-base font-bold text-gray-900 break-words">
                    {accountDetails.bankName}
                  </p>
                </div>
              </div>
              <button onClick={() => copyToClipboard(accountDetails.bankName, 'bank')} className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" title="Copy to clipboard">
                {copiedField === 'bank' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>}

        {accountDetails.accountNumber && <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Account Number
                  </p>
                  <p className="text-base font-bold text-gray-900 font-mono break-all">
                    {accountDetails.accountNumber}
                  </p>
                </div>
              </div>
              <button onClick={() => copyToClipboard(accountDetails.accountNumber, 'account')} className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" title="Copy to clipboard">
                {copiedField === 'account' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>}

        {accountDetails.paymentHandle && <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Payment Handle
                  </p>
                  <p className="text-base font-bold text-gray-900 break-words">
                    {accountDetails.paymentHandle}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PayPal, Venmo, Cash App, etc.
                  </p>
                </div>
              </div>
              <button onClick={() => copyToClipboard(accountDetails.paymentHandle, 'handle')} className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" title="Copy to clipboard">
                {copiedField === 'handle' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>}
      </div>

      {/* <div className="mt-5 bg-blue-100 rounded-xl p-4">
        <p className="text-sm text-blue-800 font-medium flex items-start space-x-2">
          <span className="text-lg">💡</span>
          <span>
            Please send your payment and then mark it as paid below. The bill creator will be notified.
          </span>
        </p>
      </div> */}
    </div>;
};
const BillView = () => {
  const {
    billId
  } = useParams();
  const navigate = useNavigate();
  const {
    bill,
    loading,
    error
  } = useBill(billId);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!billId) {
      navigate('/');
    }
  }, [billId, navigate]);
  const handleCopyLink = () => {
    const shareLink = window.location.href;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const getInitials = name => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-xl">Loading bill details...</p>
        </div>
      </div>;
  }
  if (error || !bill) {
    return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Bill Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'The bill you are looking for does not exist or has been deleted.'}
          </p>
          <button onClick={() => navigate('/')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
            Go to Home
          </button>
        </div>
      </div>;
  }
  const settledCount = bill.participants?.filter(p => p.isPaid).length || 0;
  const totalParticipants = bill.participants?.length || 0;
  const settlementPercentage = totalParticipants > 0 ? Math.round(settledCount / totalParticipants * 100) : 0;
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">Splitaire</span>
            </div>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-6">
          {}
          <div className={`px-6 py-4 ${bill.isSettled ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`}>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                {bill.isSettled ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                <span className="font-bold text-lg">
                  {bill.isSettled ? 'Fully Settled' : 'Pending Payment'}
                </span>
              </div>
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {settlementPercentage}% Complete
              </span>
            </div>
          </div>

          {}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {bill.billName}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(bill.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{totalParticipants} participants</span>
                  </div>
                </div>
              </div>
              
              <button onClick={handleCopyLink} className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold">
                {copied ? <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </> : <>
                    <Copy className="w-4 h-4" />
                    <span>Share</span>
                  </>}
              </button>
            </div>

            {}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium mb-1">Total Amount</p>
                  <div className="flex items-baseline space-x-2">
                    <DollarSign className="w-8 h-8 text-emerald-600" />
                    <span className="text-5xl font-bold text-gray-900">
                      {bill.totalAmount.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-600">{bill.currency}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 font-medium mb-1">Split Method</p>
                  <span className="inline-block bg-white px-4 py-2 rounded-lg text-gray-900 font-semibold capitalize">
                    {bill.splitMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        {bill.accountDetails && <div className="mb-6">
            <PaymentAccountDetails accountDetails={bill.accountDetails} currency={bill.currency} />
          </div>}

        {}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900">Participants</h2>
            <p className="text-gray-600 mt-1">
              {settledCount} of {totalParticipants} have paid their share
            </p>
          </div>

          <div className="p-6">
            {}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500" style={{
                width: `${settlementPercentage}%`
              }}></div>
              </div>
            </div>

            {}
            <div className="space-y-3">
              {bill.participants?.map((participant, index) => <div key={index} className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${participant.isPaid ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${participant.isPaid ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                      {getInitials(participant.name)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {participant.name}
                      </p>
                      <p className="text-sm text-gray-600">{participant.email}</p>
                      {participant.isPaid && participant.paidAt && <p className="text-xs text-emerald-600 font-semibold mt-1">
                          Paid on {formatDate(participant.paidAt)}
                        </p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold ${participant.isPaid ? 'text-emerald-600' : 'text-orange-600'}`}>
                      ${participant.amountOwed.toFixed(2)}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${participant.isPaid ? 'bg-emerald-600 text-white' : 'bg-orange-500 text-white'}`}>
                      {participant.isPaid ? '✓ PAID' : '⏳ PENDING'}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>

        {}
        {bill.notes && <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-6">
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-2xl font-bold text-gray-900">Notes</h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 leading-relaxed">{bill.notes}</p>
            </div>
          </div>}

        {}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-3">Want to split bills easily?</h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Create an account to manage and track all your shared expenses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/signup')} className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
              Sign Up Free
            </button>
            <button onClick={() => navigate('/create-bill')} className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-colors">
              Create a Bill
            </button>
          </div>
        </div>
      </main>

      {}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-600">
            Made with ❤️ by <span className="font-semibold text-emerald-600">Splitaire</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Split bills, not friendships
          </p>
        </div>
      </footer>
    </div>;
};
export default BillView;