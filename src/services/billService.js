import apiClient from '../utility/apiClient';
const billService = {
  async createBill(billData) {
    try {
      return await apiClient.post('/bills', billData);
    } catch (error) {
      console.error('Create bill error:', error);
      return {
        success: false,
        message: 'Failed to create bill. Please try again.',
        error: error.message
      };
    }
  },
  async getBillById(billId) {
    try {
      return await apiClient.get(`/bills/${billId}`);
    } catch (error) {
      console.error('Get bill error:', error);
      return {
        success: false,
        message: 'Failed to fetch bill details.',
        error: error.message
      };
    }
  },
  async getUserBills(params = {}) {
    try {
      return await apiClient.get('/bills', params);
    } catch (error) {
      console.error('Get user bills error:', error);
      return {
        success: false,
        message: 'Failed to fetch bills.',
        error: error.message
      };
    }
  },
  async updateBill(billId, updateData) {
    try {
      return await apiClient.put(`/bills/${billId}`, updateData);
    } catch (error) {
      console.error('Update bill error:', error);
      return {
        success: false,
        message: 'Failed to update bill.',
        error: error.message
      };
    }
  },
  async markPayment(billId, paymentData) {
    try {
      return await apiClient.patch(`/bills/${billId}/payment`, paymentData);
    } catch (error) {
      console.error('Mark payment error:', error);
      return {
        success: false,
        message: 'Failed to update payment status.',
        error: error.message
      };
    }
  },
  async deleteBill(billId) {
    try {
      return await apiClient.delete(`/bills/${billId}`);
    } catch (error) {
      console.error('Delete bill error:', error);
      return {
        success: false,
        message: 'Failed to delete bill.',
        error: error.message
      };
    }
  },
  async getBillStats() {
    try {
      return await apiClient.get('/bills/stats');
    } catch (error) {
      console.error('Get stats error:', error);
      return {
        success: false,
        message: 'Failed to fetch statistics.',
        error: error.message
      };
    }
  },
  createEqualSplitBill(billName, totalAmount, participants, options = {}) {
    return this.createBill({
      billName,
      totalAmount,
      participants,
      splitMethod: 'equal',
      currency: options.currency || 'USD',
      notes: options.notes,
      createdByName: options.createdByName,
      createdByEmail: options.createdByEmail
    });
  },
  createPercentageSplitBill(billName, totalAmount, participants, customSplits, options = {}) {
    return this.createBill({
      billName,
      totalAmount,
      participants,
      splitMethod: 'percentage',
      customSplits,
      currency: options.currency || 'USD',
      notes: options.notes,
      createdByName: options.createdByName,
      createdByEmail: options.createdByEmail
    });
  },
  createCustomSplitBill(billName, totalAmount, participants, customSplits, options = {}) {
    return this.createBill({
      billName,
      totalAmount,
      participants,
      splitMethod: 'custom',
      customSplits,
      currency: options.currency || 'USD',
      notes: options.notes,
      createdByName: options.createdByName,
      createdByEmail: options.createdByEmail
    });
  },
  createItemBasedBill(billName, totalAmount, participants, items, options = {}) {
    return this.createBill({
      billName,
      totalAmount,
      participants,
      splitMethod: 'itemBased',
      items,
      currency: options.currency || 'USD',
      notes: options.notes,
      createdByName: options.createdByName,
      createdByEmail: options.createdByEmail
    });
  }
};
export default billService;