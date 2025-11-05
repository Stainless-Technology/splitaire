import billService from '../services/billService';
export const handlePendingGuestBill = async () => {
  try {
    const pendingBillJson = localStorage.getItem('pendingGuestBill');
    if (!pendingBillJson) {
      return null;
    }
    const billData = JSON.parse(pendingBillJson);
    delete billData.isGuest;
    delete billData.createdAt;
    const response = await billService.createBill(billData);
    if (response.success) {
      localStorage.removeItem('pendingGuestBill');
      return {
        success: true,
        bill: response.data.bill,
        message: 'Your bill has been created successfully!'
      };
    } else {
      return {
        success: false,
        message: response.message || 'Failed to create bill'
      };
    }
  } catch (error) {
    console.error('Error handling pending guest bill:', error);
    return {
      success: false,
      message: 'Failed to create bill. Please try again.'
    };
  }
};
export const hasPendingGuestBill = () => {
  return !!localStorage.getItem('pendingGuestBill');
};
export const getPendingGuestBill = () => {
  try {
    const pendingBillJson = localStorage.getItem('pendingGuestBill');
    return pendingBillJson ? JSON.parse(pendingBillJson) : null;
  } catch (error) {
    console.error('Error getting pending guest bill:', error);
    return null;
  }
};
export const clearPendingGuestBill = () => {
  localStorage.removeItem('pendingGuestBill');
};