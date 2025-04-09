import { useState, useEffect, useCallback } from 'react';
import leadsData from '../mocks/leads.json';

export const useLeads = () => {
  const [leads, setLeads] = useState(leadsData.leads);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, this would be an API call
      setLeads(leadsData.leads);
    } catch (err) {
      setError('Error loading leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return {
    leads,
    loading,
    error,
    setLeads
  };
};