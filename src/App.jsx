import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from './pages/Onboarding'
import GuestLandingPage from './pages/GuestLandingPage'
import CreateBillPage from './pages/CreateBillPage '
import BillViewPage from './pages/BillViewPage'
import BillSummaryPage from './pages/BillSummaryPage'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProfileScreenPage from "./pages/ProfileScreenPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landingpage" element={<GuestLandingPage />} />
        <Route path="/createbill" element={<CreateBillPage />} />
        <Route path="/billsummary" element={<BillSummaryPage />} />
        <Route path="/billview" element={<BillViewPage />} />
        <Route path="/profilescreen" element={<ProfileScreenPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App