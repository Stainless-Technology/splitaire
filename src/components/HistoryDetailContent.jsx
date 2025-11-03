import React, { useState } from "react";
import { Edit2, Share2, CheckCircle } from "lucide-react";

const HistoryDetailContent = () => {
  const [activeTab, setActiveTab] = useState("summary");

  const billData = {
    title: "Friend's dinner at The Gastronome",
    totalAmount: 125.75,
    date: "Mar 15, 2024",
    paidBy: "Alex Johnson",
  };

  const splits = [
    { id: 1, person: "Emily White", owesTo: "Alex Johnson", amount: 35.25 },
    { id: 2, person: "Chris Green", owesTo: "Alex Johnson", amount: 20.0 },
    { id: 3, person: "David Black", owesTo: "Emily White", amount: 25.5 },
    { id: 4, person: "Jessica Blue", owesTo: "Alex Johnson", amount: 10.0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )} */}

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 bg-gray-50 p-4 lg:p-8 flex items-start justify-center">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="border-b border-gray-200 p-6 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Bill: {billData.title}
                  </h2>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1">
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    <span>Share</span>
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Mark Paid
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                {["summary", "participants", "insights"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "bg-emerald-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "summary" && (
              <div className="p-6 bg-emerald-50">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Who Owes Who
                  </h3>
                  <p className="text-sm text-gray-600">
                    A breakdown of financial responsibilities
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-emerald-200 p-4 mb-4">
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">
                      Total Bill:
                    </span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${billData.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    {splits.map((split) => (
                      <div
                        key={split.id}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-gray-700">
                          {split.person} owes {split.owesTo}
                        </span>
                        <span className="font-bold text-red-600">
                          -${split.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-emerald-200 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Date</span>
                    <span className="text-gray-900">{billData.date}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-3 pt-3 border-t border-gray-200">
                    <span className="text-gray-600 font-medium">Paid by</span>
                    <span className="text-gray-900">{billData.paidBy}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "participants" && (
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                        AJ
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Alex Johnson
                        </p>
                        <p className="text-sm text-gray-500">Organizer</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>

                  {splits.map((split) => (
                    <div
                      key={split.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                          {split.person
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {split.person}
                          </p>
                          <p className="text-sm text-red-600">
                            Owes ${split.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "insights" && (
              <div className="p-6 text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Insights Coming Soon
                </h3>
                <p className="text-gray-600">
                  View analytics and spending patterns for this bill.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryDetailContent;
