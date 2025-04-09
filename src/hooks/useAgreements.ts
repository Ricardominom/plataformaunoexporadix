import { useState, useEffect, useCallback } from 'react';
import agreementsData from '../mocks/agreements.json';
import { Agreement, AgreementStatus } from '../types/agreement';

export const useAgreements = () => {
  const [agreements, setAgreements] = useState<Agreement[]>(agreementsData.agreements);
  const [lists, setLists] = useState(agreementsData.lists);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAgreements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, this would be an API call
      setAgreements(agreementsData.agreements);
      setLists(agreementsData.lists);
    } catch (err) {
      setError('Error loading agreements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAgreement = useCallback((updatedAgreement: Agreement) => {
    setAgreements(prevAgreements =>
      prevAgreements.map(agreement =>
        agreement.id === updatedAgreement.id ? updatedAgreement : agreement
      )
    );
  }, []);

  const updateAgreementStatus = useCallback((id: string, status: AgreementStatus, isSJStatus = false) => {
    setAgreements(prevAgreements =>
      prevAgreements.map(agreement =>
        agreement.id === id
          ? {
              ...agreement,
              [isSJStatus ? 'sjStatus' : 'status']: status
            }
          : agreement
      )
    );
  }, []);

  useEffect(() => {
    loadAgreements();
  }, [loadAgreements]);

  return {
    agreements,
    lists,
    loading,
    error,
    updateAgreement,
    updateAgreementStatus,
    setAgreements,
    setLists
  };
};