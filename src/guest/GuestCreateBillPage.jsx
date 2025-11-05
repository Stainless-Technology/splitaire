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
  Mail,
  AlertCircle,
  Percent,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const GuestCreateBillPage = () => {
  const navigate = useNavigate();
  const [splitType, setSplitType] = useState("equal");
  const [formData, setFormData] = useState({
    billName: "",
    totalAmount: "",
    notes: "",
  });
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "",
      email: "",
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
  const [percentageSplits, setPercentageSplits] = useState({});
  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      price: "",
      assignedTo: [],
    },
  ]);
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
  };
  const updateCustomSplit = (email, value) => {
    setCustomSplits({
      ...customSplits,
      [email]: value,
    });
  };
  const updatePercentageSplit = (email, value) => {
    setPercentageSplits({
      ...percentageSplits,
      [email]: value,
    });
  };
  const addItem = () => {
    const newId = Date.now();
    setItems([
      ...items,
      {
        id: newId,
        name: "",
        price: "",
        assignedTo: [],
      },
    ]);
  };
  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };
  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };
  const toggleItemAssignment = (itemId, participantEmail) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const assignedTo = item.assignedTo.includes(participantEmail)
            ? item.assignedTo.filter((email) => email !== participantEmail)
            : [...item.assignedTo, participantEmail];
          return {
            ...item,
            assignedTo,
          };
        }
        return item;
      })
    );
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.billName.trim()) {
      errors.billName = "Bill name is required";
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
      errors.participants =
        "At least 2 participants with name and email are required";
    }
    participants.forEach((p) => {
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
    if (splitType === "custom") {
      const totalCustom = Object.values(customSplits).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      );
      if (Math.abs(totalCustom - amount) > 0.01) {
        errors.customSplits = `Custom amounts must add up to ₦${amount.toFixed(
          2
        )}. Current: ₦${totalCustom.toFixed(2)}`;
      }
    }
    if (splitType === "percentage") {
      const totalPercent = Object.values(percentageSplits).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      );
      if (Math.abs(totalPercent - 100) > 0.1) {
        errors.percentageSplits = `Percentages must add up to 100%. Current: ${totalPercent.toFixed(
          1
        )}%`;
      }
    }
    if (splitType === "itemBased") {
      const validItems = items.filter((item) => item.name.trim() && item.price);
      if (validItems.length === 0) {
        errors.items = "At least one item is required";
      }
      items.forEach((item) => {
        if (item.name.trim() && !item.price) {
          errors[`item_${item.id}_price`] = "Price is required";
        }
        if (item.price && item.assignedTo.length === 0) {
          errors[`item_${item.id}_assigned`] = "Assign to at least one person";
        }
      });
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleProceed = () => {
    setError("");
    setValidationErrors({});
    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }
    const participantsData = participants
      .filter((p) => p.name.trim() && p.email.trim())
      .map((p) => ({
        name: p.name.trim(),
        email: p.email.trim().toLowerCase(),
      }));
    const billData = {
      billName: formData.billName.trim(),
      totalAmount: parseFloat(formData.totalAmount),
      currency: "USD",
      participants: participantsData,
      splitMethod: splitType,
      notes: formData.notes.trim(),
      createdAt: new Date().toISOString(),
      isGuest: true,
    };
    if (splitType === "custom") {
      billData.customSplits = participantsData.map((p) => ({
        participantEmail: p.email,
        amount: parseFloat(customSplits[p.email] || 0),
      }));
    } else if (splitType === "percentage") {
      billData.customSplits = participantsData.map((p) => ({
        participantEmail: p.email,
        percentage: parseFloat(percentageSplits[p.email] || 0),
      }));
    } else if (splitType === "itemBased") {
      billData.items = items
        .filter((item) => item.name.trim() && item.price)
        .map((item) => ({
          name: item.name.trim(),
          price: parseFloat(item.price),
          assignedTo: item.assignedTo,
        }));
    }
    try {
      localStorage.setItem("pendingGuestBill", JSON.stringify(billData));
      alert(
        "Bill saved! Sign up or log in to create your bill and share it with participants."
      );
      navigate("/signup?from=guest-bill");
    } catch (err) {
      console.error("Error saving bill:", err);
      setError("Failed to save bill. Please try again.");
    }
  };
  const calculateEqualSplit = () => {
    const amount = parseFloat(formData.totalAmount);
    if (!isNaN(amount) && amount > 0 && participants.length > 0) {
      return (amount / participants.length).toFixed(2);
    }
    return "0.00";
  };
  const calculatePercentageAmount = (email) => {
    const amount = parseFloat(formData.totalAmount);
    const percentage = parseFloat(percentageSplits[email] || 0);
    if (!isNaN(amount) && !isNaN(percentage)) {
      return ((amount * percentage) / 100).toFixed(2);
    }
    return "0.00";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">Splitaire</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Already have an account?</span>
              <button
                onClick={() => navigate("/login")}
                className="text-emerald-600 font-semibold hover:text-emerald-700">
                Log In
              </button>
            </div>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Guest Mode - No Account Required
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Create a Bill
          </h1>
          <p className="text-lg text-gray-600">
            Split expenses effortlessly - Sign up after to save and track
          </p>
        </div>

        {}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            {}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-red-800">{error}</p>
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          billName: e.target.value,
                        })
                      }
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 font-medium ${
                        validationErrors.billName
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                  </div>
                  {validationErrors.billName && (
                    <p className="mt-1 text-xs text-red-600">
                      {validationErrors.billName}
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalAmount: e.target.value,
                        })
                      }
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 font-medium ${
                        validationErrors.totalAmount
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                  </div>
                  {validationErrors.totalAmount && (
                    <p className="mt-1 text-xs text-red-600">
                      {validationErrors.totalAmount}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                How to Split?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setSplitType("equal")}
                  className={`px-4 py-4 rounded-xl font-semibold transition-all duration-200 ${
                    splitType === "equal"
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>
                  <div className="flex flex-col items-center space-y-1">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">Equal</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSplitType("percentage")}
                  className={`px-4 py-4 rounded-xl font-semibold transition-all duration-200 ${
                    splitType === "percentage"
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>
                  <div className="flex flex-col items-center space-y-1">
                    <Percent className="w-5 h-5" />
                    <span className="text-sm">Percentage</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSplitType("custom")}
                  className={`px-4 py-4 rounded-xl font-semibold transition-all duration-200 ${
                    splitType === "custom"
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>
                  <div className="flex flex-col items-center space-y-1">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm">Custom</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSplitType("itemBased")}
                  className={`px-4 py-4 rounded-xl font-semibold transition-all duration-200 ${
                    splitType === "itemBased"
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>
                  <div className="flex flex-col items-center space-y-1">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-sm">Item-Based</span>
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
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.customSplits}
                </p>
              )}
              {validationErrors.percentageSplits && (
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.percentageSplits}
                </p>
              )}
              {validationErrors.items && (
                <p className="mt-2 text-sm text-red-600">
                  {validationErrors.items}
                </p>
              )}
            </div>

            {}
            {splitType === "itemBased" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Items</h2>
                  <span className="text-sm text-gray-500 font-medium">
                    {items.length} items
                  </span>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border-2 border-gray-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Item name"
                            value={item.name}
                            onChange={(e) =>
                              updateItem(item.id, "name", e.target.value)
                            }
                            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                          />
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="Price"
                              value={item.price}
                              onChange={(e) =>
                                updateItem(item.id, "price", e.target.value)
                              }
                              className="w-full pl-9 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                            />
                          </div>
                        </div>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {validationErrors[`item_${item.id}_price`] && (
                        <p className="text-xs text-red-600 mb-2">
                          {validationErrors[`item_${item.id}_price`]}
                        </p>
                      )}
                      {validationErrors[`item_${item.id}_assigned`] && (
                        <p className="text-xs text-red-600 mb-2">
                          {validationErrors[`item_${item.id}_assigned`]}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {participants.map(
                          (participant) =>
                            participant.email && (
                              <button
                                key={participant.id}
                                type="button"
                                onClick={() =>
                                  toggleItemAssignment(
                                    item.id,
                                    participant.email
                                  )
                                }
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                  item.assignedTo.includes(participant.email)
                                    ? "bg-emerald-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>
                                {participant.name || participant.email}
                              </button>
                            )
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addItem}
                    className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                    <Plus className="w-5 h-5" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
            )}

            {}
            {splitType !== "itemBased" && (
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
                    <p className="text-sm text-red-600">
                      {validationErrors.participants}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 space-y-2">
                          {}
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                              className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-medium ${
                                participant.isMe
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-900 focus:border-emerald-500"
                                  : "border-gray-200 bg-white text-gray-900 focus:border-purple-500"
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

                          {}
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                              className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-medium ${
                                participant.isMe
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-900 focus:border-emerald-500"
                                  : "border-gray-200 bg-white text-gray-900 focus:border-purple-500"
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

                          {}
                          {splitType === "custom" && participant.email && (
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
                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 font-medium"
                              />
                            </div>
                          )}

                          {}
                          {splitType === "percentage" && participant.email && (
                            <div className="relative">
                              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                placeholder="Percentage"
                                value={
                                  percentageSplits[participant.email] || ""
                                }
                                onChange={(e) =>
                                  updatePercentageSplit(
                                    participant.email,
                                    e.target.value
                                  )
                                }
                                className="w-full pl-11 pr-16 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-900 font-medium"
                              />
                              {percentageSplits[participant.email] &&
                                formData.totalAmount && (
                                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-emerald-600">
                                    $
                                    {calculatePercentageAmount(
                                      participant.email
                                    )}
                                  </span>
                                )}
                            </div>
                          )}
                        </div>

                        {!participant.isMe && participants.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeParticipant(participant.id)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addParticipant}
                    className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 font-semibold">
                    <Plus className="w-5 h-5" />
                    <span>Add Participant</span>
                  </button>
                </div>
              </div>
            )}

            {}
            {splitType === "itemBased" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Participants
                </h2>
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-3">
                      <div className="flex-1 grid grid-cols-2 gap-3">
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
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
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
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      {!participant.isMe && participants.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeParticipant(participant.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-emerald-500 hover:text-emerald-600 text-sm">
                    + Add Participant
                  </button>
                </div>
              </div>
            )}

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
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none text-gray-900"></textarea>
            </div>

            {}
            <button
              type="button"
              onClick={handleProceed}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Save My Bill</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-sm text-gray-600">
              Your bill will be saved and created after you sign up or log in
            </p>
          </div>
        </div>

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
export default GuestCreateBillPage;
