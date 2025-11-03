// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import GuestLayout from "./layouts/GuestLayout";

// Pages
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import GuestLandingPage from "./pages/landing/GuestLandingPage";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import CreateBillPage from "./pages/dashboard/CreateBillPage";
import BillViewPage from "./pages/dashboard/BillViewPage";
import BillSummaryPage from "./pages/dashboard/BillSummaryPage";
import HistoryPage from "./pages/dashboard/HistoryPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import Onboarding from "./pages/landing/Onboarding";
import GuestCreateBillPage from "../guest/GuestCreateBillPage";
import AddFundsPage from "./components/AddFundsPage";
import HistoryDetail from "./pages/dashboard/HistoryDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/welcome" element={<GuestLandingPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/guest-1" element={<GuestCreateBillPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="create-bill" element={<CreateBillPage />} />
          <Route path="bill/:id" element={<BillViewPage />} />
          <Route path="summary/:id" element={<BillSummaryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="funds" element={<AddFundsPage />} />
          <Route path="historydetail" element={<HistoryDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
