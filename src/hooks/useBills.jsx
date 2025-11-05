import { useState, useEffect } from 'react';
import billService from '../services/billService';
export const useCreateBill = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const createBill = async billData => {
    setLoading(true);
    setError(null);
    try {
      const response = await billService.createBill(billData);
      if (!response.success) {
        setError(response.message);
      }
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to create bill');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to create bill'
      };
    }
  };
  return {
    createBill,
    loading,
    error
  };
};
export const useBill = billId => {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchBill = async () => {
    if (!billId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await billService.getBillById(billId);
      if (response.success && response.data) {
        setBill(response.data.bill);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch bill');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBill();
  }, [billId]);
  return {
    bill,
    loading,
    error,
    refetch: fetchBill
  };
};
export const useUserBills = (params = {}) => {
  const [bills, setBills] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchBills = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await billService.getUserBills(params);
      if (response.success && response.data) {
        setBills(response.data.bills);
        setPagination(response.data.pagination);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBills();
  }, [params.page, params.limit, params.settled]);
  return {
    bills,
    pagination,
    loading,
    error,
    refetch: fetchBills
  };
};
export const useUpdateBill = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateBill = async (billId, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await billService.updateBill(billId, updateData);
      if (!response.success) {
        setError(response.message);
      }
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to update bill');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to update bill'
      };
    }
  };
  return {
    updateBill,
    loading,
    error
  };
};
export const useMarkPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const markPayment = async (billId, paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await billService.markPayment(billId, paymentData);
      if (!response.success) {
        setError(response.message);
      }
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to update payment status');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to update payment status'
      };
    }
  };
  return {
    markPayment,
    loading,
    error
  };
};
export const useDeleteBill = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteBill = async billId => {
    setLoading(true);
    setError(null);
    try {
      const response = await billService.deleteBill(billId);
      if (!response.success) {
        setError(response.message);
      }
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to delete bill');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to delete bill'
      };
    }
  };
  return {
    deleteBill,
    loading,
    error
  };
};
export const useBillStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await billService.getBillStats();
      if (response.success && response.data) {
        setStats(response.data.stats);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);
  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};