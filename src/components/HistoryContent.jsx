// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, Calendar, Users, X, ChevronDown } from "lucide-react";

// const HistoryContent = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const bills = [
//     {
//       id: 1,
//       title: "Dinner with friends",
//       date: "Oct 25, 2023",
//       amount: 125.5,
//       status: "Paid",
//       participants: 5,
//     },
//     {
//       id: 2,
//       title: "Grocery Split",
//       date: "Oct 24, 2023",
//       amount: 78.99,
//       status: "Pending",
//       participants: 2,
//     },
//     {
//       id: 3,
//       title: "Travel Expenses - Weekend Trip",
//       date: "Oct 26, 2023",
//       amount: 450.0,
//       status: "Settled",
//       participants: 3,
//     },
//     {
//       id: 4,
//       title: "Utility Bill - October",
//       date: "Oct 15, 2023",
//       amount: 89.2,
//       status: "Unsettled",
//       participants: 5,
//     },
//     {
//       id: 5,
//       title: "Movie Night & Snacks",
//       date: "Oct 12, 2023",
//       amount: 42.75,
//       status: "Paid",
//       participants: 3,
//     },
//     {
//       id: 6,
//       title: "Birthday Gift Fund",
//       date: "Oct 8, 2023",
//       amount: 150.0,
//       status: "Settled",
//       participants: 2,
//     },
//     {
//       id: 7,
//       title: "Book Club Dinner",
//       date: "Oct 5, 2023",
//       amount: 95.0,
//       status: "Unsettled",
//       participants: 5,
//     },
//     {
//       id: 8,
//       title: "Home Repair Materials",
//       date: "Sept 30, 2023",
//       amount: 210.3,
//       status: "Pending",
//       participants: 3,
//     },
//     {
//       id: 9,
//       title: "Gym Membership Fee",
//       date: "Sep 25, 2023",
//       amount: 60.0,
//       status: "Paid",
//       participants: 3,
//     },
//   ];

//   const getStatusColor = (status) => {
//     const colors = {
//       Paid: "bg-emerald-100 text-emerald-700",
//       Pending: "bg-yellow-100 text-yellow-700",
//       Settled: "bg-blue-100 text-blue-700",
//       Unsettled: "bg-red-100 text-red-700",
//     };
//     return colors[status] || "bg-gray-100 text-gray-700";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="min-h-screen bg-gray-50 flex">
//         <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//           <div className="text-center mb-10">
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
//               Bill History
//             </h1>
//             <p className="text-lg text-gray-600">
//               Track, filter and view all your past bills at a glance
//             </p>
//           </div>

//           <div className="flex flex-wrap justify-between items-center gap-4 bg-white shadow-lg border border-gray-100 rounded-3xl p-6 mb-10">
//             <div className="flex flex-wrap gap-3">
//               <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all">
//                 <Calendar className="w-4 h-4" />
//                 <span>Last 30 days</span>
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all">
//                 <span>All Groups</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-all">
//                 <span>All Statuses</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2 text-emerald-600 text-sm hover:text-emerald-700">
//                 <X className="w-4 h-4" />
//                 <span>Clear Filters</span>
//               </button>
//             </div>

//             <div className="relative">
//               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search bills, participants"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 w-72"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bills.map((bill) => (
//               <div
//                 key={bill.id}
//                 className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-emerald-200 transition-all"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
//                     {bill.title}
//                   </h3>
//                   <span
//                     className={`text-xs font-medium px-2 py-1 rounded-lg ${getStatusColor(
//                       bill.status
//                     )}`}
//                   >
//                     {bill.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500 mb-4">{bill.date}</p>

//                 <div className="mb-4">
//                   <p className="text-3xl font-bold text-emerald-600">
//                     ${bill.amount.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     <Users className="inline w-4 h-4 mr-1 text-gray-400" />
//                     {bill.participants} participants
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => navigate("/billhistorydetail")}
//                   className="w-full mt-3 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all"
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default HistoryContent;
