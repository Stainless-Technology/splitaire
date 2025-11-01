import React from 'react'
import Onboarding from './pages/Onboarding'
import GuestLandingPage from './pages/GuestLandingPage'
import CreateBillPage from './pages/CreateBillPage '
import BillViewPage from './pages/BillViewPage'
import BillSummaryPage from './pages/BillSummaryPage'
const App = () => {
  return (
    <div>
      <Onboarding />
      <GuestLandingPage />
      <CreateBillPage />
      <BillViewPage />
      <BillSummaryPage />
    </div>
  )
}

export default App