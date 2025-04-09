import { useState, useEffect, useCallback } from 'react';
import toolboxData from '../mocks/toolbox.json';

export const useToolboxData = () => {
  const [financialMetrics, setFinancialMetrics] = useState(toolboxData.financialMetrics);
  const [actionPlans, setActionPlans] = useState(toolboxData.actionPlans);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadToolboxData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, this would be an API call
      setFinancialMetrics(toolboxData.financialMetrics);
      setActionPlans(toolboxData.actionPlans);
    } catch (err) {
      setError('Error loading toolbox data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadToolboxData();
  }, [loadToolboxData]);

  return {
    financialMetrics,
    actionPlans,
    loading,
    error,
    setFinancialMetrics,
    setActionPlans
  };
};