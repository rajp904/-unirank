import { useState, useCallback } from 'react';
import { checkRank } from '../services/api';
import { addToHistory } from '../utils/helpers';

const useRankChecker = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRank = useCallback(async (registrationNumber) => {
    setLoading(true);
    setError(null);
    try {
      const result = await checkRank(registrationNumber);
      if (result.success && result.data) {
        setData(result.data);
        addToHistory(result.data);
        return result.data;
      }
      throw new Error(result.error || 'Student not found.');
    } catch (err) {
      const msg = err.userMessage || err.message || 'Failed to fetch rank. Please try again.';
      setError(msg);
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => { setData(null); setError(null); setLoading(false); }, []);

  return { data, loading, error, fetchRank, reset };
};

export default useRankChecker;
