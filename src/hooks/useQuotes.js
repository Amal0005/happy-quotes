import { useState, useEffect } from 'react';

const useQuotes = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const apiKey = 'RgOYdJvriOy00hONnCuIog==7Aj8CfBBF3Ow5ZnN'; // Replace with your API key (e.g., RgOYdJvriOy00hONnCuIog==7Aj8CfBBF3Ow5ZnN)
      const quotes = [];
      for (let i = 0; i < 10; i++) {
        const response = await fetch('https://api-ninjas.com/api/quotes?category=inspirational&limit=100', {
          headers: { 'X-Api-Key': apiKey }
        });
        if (!response.ok) throw new Error('Failed to fetch quotes from API');
        const data = await response.json();
        quotes.push(...data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Respect rate limits
      }
      setQuoteData(quotes);
      localStorage.setItem('quotes', JSON.stringify(quotes)); // Cache as backup
      setError('');
    } catch (error) {
      console.error('API Error:', error);
      const cachedQuotes = localStorage.getItem('quotes');
      if (cachedQuotes) {
        setQuoteData(JSON.parse(cachedQuotes));
        setError('Using cached quotes due to API failure. Click Retry to try again.');
      } else {
        setQuoteData([]);
        setError('No data available. Click Retry to fetch from API.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const getRandomQuote = () => {
    if (quoteData.length === 0) {
      setError('No quotes available.');
      return { quote: '', author: '', error: 'No quotes available.' };
    }
    const randomIndex = Math.floor(Math.random() * quoteData.length);
    setError('');
    return { quote: quoteData[randomIndex].quote, author: quoteData[randomIndex].author, error: '' };
  };

  return { quoteData, loading, error, getRandomQuote, fetchQuotes };
};

export default useQuotes;