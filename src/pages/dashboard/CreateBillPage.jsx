import React, { useState } from "react";
import {
  Plus,
  X,
  User,
  DollarSign,
  FileText,
  Users,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Loader,
  Mail,
  CreditCard,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCreateBill } from "../../hooks/useBills";
const CreateBillPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createBill, loading } = useCreateBill();
  const [formData, setFormData] = useState({
    billName: "",
    totalAmount: "",
    currency: "USD",
    notes: "",
  });
  const [accountDetails, setAccountDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    paymentHandle: "",
  });
  const [splitType, setSplitType] = useState("equal");
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: isAuthenticated ? user?.fullName || "Me" : "",
      email: isAuthenticated ? user?.email || "" : "",
      isMe: true,
    },
    {
      id: 2,
      name: "",
      email: "",
      isMe: false,
    },
  ]);
  const [customSplits, setCustomSplits] = useState({});
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const addParticipant = () => {
    const newId = Date.now();
    setParticipants([
      ...participants,
      {
        id: newId,
        name: "",
        email: "",
        isMe: false,
      },
    ]);
  };
  const removeParticipant = (id) => {
    if (participants.length > 2) {
      setParticipants(participants.filter((p) => p.id !== id));
      const participantEmail = participants.find((p) => p.id === id)?.email;
      if (participantEmail && customSplits[participantEmail]) {
        const newSplits = {
          ...customSplits,
        };
        delete newSplits[participantEmail];
        setCustomSplits(newSplits);
      }
    }
  };
  const updateParticipant = (id, field, value) => {
    setParticipants(
      participants.map((p) =>
        p.id === id
          ? {
              ...p,
              [field]: value,
            }
          : p
      )
    );
    if (validationErrors[`participant_${id}_${field}`]) {
      const newErrors = {
        ...validationErrors,
      };
      delete newErrors[`participant_${id}_${field}`];
      setValidationErrors(newErrors);
    }
  };
  const updateCustomSplit = (email, value) => {
    setCustomSplits({
      ...customSplits,
      [email]: value,
    });
  };
  const updateAccountDetails = (field, value) => {
    setAccountDetails({
      ...accountDetails,
      [field]: value,
    });
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.billName.trim()) {
      errors.billName = "Bill name is required";
    } else if (formData.billName.trim().length < 3) {
      errors.billName = "Bill name must be at least 3 characters";
    }
    const amount = parseFloat(formData.totalAmount);
    if (!formData.totalAmount) {
      errors.totalAmount = "Total amount is required";
    } else if (isNaN(amount) || amount <= 0) {
      errors.totalAmount = "Amount must be greater than 0";
    }
    const validParticipants = participants.filter(
      (p) => p.name.trim() && p.email.trim()
    );
    if (validParticipants.length < 2) {
      errors.participants = "At least 2 participants are required";
    }
    participants.forEach((p, index) => {
      if (!p.name.trim()) {
        errors[`participant_${p.id}_name`] = "Name is required";
      }
      if (!p.email.trim()) {
        errors[`participant_${p.id}_email`] = "Email is required";
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(p.email)
      ) {
        errors[`participant_${p.id}_email`] = "Invalid email";
      }
    });
    const emails = participants
      .map((p) => p.email.toLowerCase().trim())
      .filter((e) => e);
    const duplicates = emails.filter(
      (email, index) => emails.indexOf(email) !== index
    );
    if (duplicates.length > 0) {
      errors.participants = "Duplicate email addresses found";
    }
    if (splitType === "custom") {
      const totalCustom = Object.values(customSplits).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      );
      if (Math.abs(totalCustom - amount) > 0.01) {
        errors.customSplits = `Custom amounts must add up to ₦${amount.toFixed(
          2
        )}. Current total: ₦${totalCustom.toFixed(2)}`;
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }
    try {
      const participantsData = participants
        .filter((p) => p.name.trim() && p.email.trim())
        .map((p) => ({
          name: p.name.trim(),
          email: p.email.trim().toLowerCase(),
        }));
      const billData = {
        billName: formData.billName.trim(),
        totalAmount: parseFloat(formData.totalAmount),
        currency: formData.currency,
        participants: participantsData,
        splitMethod: splitType,
        notes: formData.notes.trim(),
        accountDetails: {
          bankName: accountDetails.bankName.trim(),
          accountNumber: accountDetails.accountNumber.trim(),
          accountHolderName: accountDetails.accountHolderName.trim(),
          paymentHandle: accountDetails.paymentHandle.trim(),
          currency: formData.currency,
        },
      };
      if (splitType === "custom") {
        billData.customSplits = participantsData.map((p) => ({
          participantEmail: p.email,
          amount: parseFloat(customSplits[p.email] || 0),
        }));
      }
      if (!isAuthenticated) {
        billData.createdByName = participantsData[0].name;
        billData.createdByEmail = participantsData[0].email;
      }
      const response = await createBill(billData);
      if (response.success) {
        const billId = response.data.bill.billId;
        navigate(`/bill/${billId}`);
      } else {
        setError(response.message || "Failed to create bill");
        if (response.errors && Array.isArray(response.errors)) {
          const backendErrors = {};
          response.errors.forEach((err) => {
            backendErrors[err.field] = err.message;
          });
          setValidationErrors(backendErrors);
        }
      }
    } catch (err) {
      console.error("Create bill error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  const calculateEqualSplit = () => {
    const amount = parseFloat(formData.totalAmount);
    if (!isNaN(amount) && amount > 0 && participants.length > 0) {
      return (amount / participants.length).toFixed(2);
    }
    return "0.00";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Quick & Easy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Create a Bill
          </h1>
          <p className="text-lg text-gray-600">
            Split expenses effortlessly with your friends and family
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">{error}</p>
                </div>
              </div>
            )}

            {}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Bill Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bill Name *
                  </label>
                  <div className="relative">
                    <FileText
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        validationErrors.billName
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="e.g., Weekend Brunch"
                      value={formData.billName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          billName: e.target.value,
                        });
                        if (validationErrors.billName) {
                          const newErrors = {
                            ...validationErrors,
                          };
                          delete newErrors.billName;
                          setValidationErrors(newErrors);
                        }
                      }}
                      disabled={loading}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 font-medium ${
                        validationErrors.billName
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  {validationErrors.billName && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.billName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Amount *
                  </label>
                  <div className="relative">
                    <DollarSign
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        validationErrors.totalAmount
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      value={formData.totalAmount}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          totalAmount: e.target.value,
                        });
                        if (validationErrors.totalAmount) {
                          const newErrors = {
                            ...validationErrors,
                          };
                          delete newErrors.totalAmount;
                          setValidationErrors(newErrors);
                        }
                      }}
                      disabled={loading}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 font-medium ${
                        validationErrors.totalAmount
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  {validationErrors.totalAmount && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.totalAmount}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Details (Optional)
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Add your payment information so participants know where to send
                their payments
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={accountDetails.accountHolderName}
                      onChange={(e) =>
                        updateAccountDetails(
                          "accountHolderName",
                          e.target.value
                        )
                      }
                      disabled={loading}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Chase Bank"
                      value={accountDetails.bankName}
                      onChange={(e) =>
                        updateAccountDetails("bankName", e.target.value)
                      }
                      disabled={loading}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="XXXX-XXXX-XXXX"
                      value={accountDetails.accountNumber}
                      onChange={(e) =>
                        updateAccountDetails("accountNumber", e.target.value)
                      }
                      disabled={loading}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Handle
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="@username or PayPal, Venmo, etc."
                      value={accountDetails.paymentHandle}
                      onChange={(e) =>
                        updateAccountDetails("paymentHandle", e.target.value)
                      }
                      disabled={loading}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                How to Split?
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSplitType("equal")}
                  disabled={loading}
                  className={`flex-1 min-w-[140px] px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                    splitType === "equal"
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Equal Split</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSplitType("custom")}
                  disabled={loading}
                  className={`flex-1 min-w-[140px] px-6 py-4 rounded-xl font-semibold transition-all duration-200 ${
                    splitType === "custom"
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                  <div className="flex items-center justify-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Custom Split</span>
                  </div>
                </button>
              </div>
              {splitType === "equal" && formData.totalAmount && (
                <p className="mt-3 text-sm text-gray-600 text-center">
                  Each person pays:{" "}
                  <span className="font-bold text-emerald-600">
                    ${calculateEqualSplit()}
                  </span>
                </p>
              )}
              {validationErrors.customSplits && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.customSplits}</span>
                </p>
              )}
            </div>

            {}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Who's Splitting?
                  </h2>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {participants.length} people
                </span>
              </div>

              {validationErrors.participants && (
                <div className="mb-3 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.participants}</span>
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={participant.id} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 space-y-2">
                        <div className="relative">
                          <User
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                              validationErrors[
                                `participant_${participant.id}_name`
                              ]
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                          <input
                            type="text"
                            placeholder="Name"
                            value={participant.name}
                            onChange={(e) =>
                              updateParticipant(
                                participant.id,
                                "name",
                                e.target.value
                              )
                            }
                            disabled={loading}
                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-medium ${
                              participant.isMe
                                ? "border-emerald-200 bg-emerald-50 text-emerald-900 focus:border-emerald-500"
                                : validationErrors[
                                    `participant_${participant.id}_name`
                                  ]
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 bg-white text-gray-900 focus:border-purple-500"
                            } ${
                              loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          />
                          {participant.isMe && (
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                              YOU
                            </span>
                          )}
                        </div>
                        {validationErrors[
                          `participant_${participant.id}_name`
                        ] && (
                          <p className="text-xs text-red-600 ml-1">
                            {
                              validationErrors[
                                `participant_${participant.id}_name`
                              ]
                            }
                          </p>
                        )}

                        <div className="relative">
                          <Mail
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                              validationErrors[
                                `participant_${participant.id}_email`
                              ]
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={participant.email}
                            onChange={(e) =>
                              updateParticipant(
                                participant.id,
                                "email",
                                e.target.value
                              )
                            }
                            disabled={loading}
                            className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-medium ${
                              participant.isMe
                                ? "border-emerald-200 bg-emerald-50 text-emerald-900 focus:border-emerald-500"
                                : validationErrors[
                                    `participant_${participant.id}_email`
                                  ]
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 bg-white text-gray-900 focus:border-purple-500"
                            } ${
                              loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          />
                        </div>
                        {validationErrors[
                          `participant_${participant.id}_email`
                        ] && (
                          <p className="text-xs text-red-600 ml-1">
                            {
                              validationErrors[
                                `participant_${participant.id}_email`
                              ]
                            }
                          </p>
                        )}

                        {splitType === "custom" && (
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="Amount"
                              value={customSplits[participant.email] || ""}
                              onChange={(e) =>
                                updateCustomSplit(
                                  participant.email,
                                  e.target.value
                                )
                              }
                              disabled={loading}
                              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 font-medium"
                            />
                          </div>
                        )}
                      </div>

                      {!participant.isMe && participants.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeParticipant(participant.id)}
                          disabled={loading}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addParticipant}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                  <Plus className="w-5 h-5" />
                  <span>Add Participant</span>
                </button>
              </div>
            </div>

            {}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Optional Notes
              </h2>
              <textarea
                placeholder="Add any additional details about this bill..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notes: e.target.value,
                  })
                }
                disabled={loading}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"></textarea>
            </div>

            {}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-2xl hover:scale-105"
              }`}>
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Creating Bill...</span>
                </>
              ) : (
                <>
                  <span>Create Bill</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-600 font-medium">
              Instant calculation
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-gray-600 font-medium">
              Secure & private
            </p>
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
export default CreateBillPage;
