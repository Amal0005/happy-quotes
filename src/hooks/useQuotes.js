import { useState, useEffect } from 'react';

const CATEGORIES = ['happiness'];

const useQuotes = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError('');
      const allQuotes = [];

      for (const category of CATEGORIES) {
        const res = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'RgOYdJvriOy00hONnCuIog==7Aj8CfBBF3Ow5ZnN',
          },
        });

        if (!res.ok) {
          throw new Error(`Error fetching quote for category: ${category}`);
        }

        const data = await res.json(); // returns [ { quote, author } ]
        if (Array.isArray(data)) {
          allQuotes.push(...data.map(q => ({ quote: q.quote, author: q.author })));
        }
      }

      setQuoteData(allQuotes);
    } catch (err) {
      console.error('[useQuotes] Fetch error:', err);
      setError('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();

    // Optional: auto-refresh quotes every 10 mins
    const interval = setInterval(fetchQuotes, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, []);

  const getQuoteByIndex = (index) => {
    if (!quoteData.length) return { quote: '', author: '', error: 'No quotes available.' };
    const validIndex = Math.min(Math.max(0, index), quoteData.length - 1);
    return quoteData[validIndex];
  };

  const getRandomQuote = () => {
    if (!quoteData.length) return { quote: '', author: '', error: 'No quotes available.' };
    const i = Math.floor(Math.random() * quoteData.length);
    return quoteData[i];
  };

  return { quoteData, loading, error, getQuoteByIndex, getRandomQuote };
};

export default useQuotes;
