import { useState, useEffect } from 'react';

const useQuotes = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllQuotes = async () => {
    const perPage = 50;
    let allQuotes = [];

    try {
      // Step 1: Fetch first page to get total count
      const firstRes = await fetch(`https://api.quotable.io/quotes?tags=success|happiness|inspirational&limit=${perPage}&page=1`);
      if (!firstRes.ok) throw new Error('Failed to fetch first page');
      const firstData = await firstRes.json();

      const total = firstData.totalCount;
      const totalPages = Math.ceil(total / perPage);
      console.log(`Total quotes: ${total} | Total pages: ${totalPages}`);

      // Add first page quotes
      allQuotes = [...firstData.results.map(q => ({ quote: q.content, author: q.author }))];

      // Step 2: Fetch remaining pages in a loop
      const pageFetches = [];
      for (let page = 2; page <= totalPages; page++) {
        const url = `https://api.quotable.io/quotes?tags=success|happiness|inspirational&limit=${perPage}&page=${page}`;
        pageFetches.push(fetch(url).then(res => res.json()));
      }

      const pagesData = await Promise.all(pageFetches);
      pagesData.forEach(data => {
        const quotes = data.results.map(q => ({
          quote: q.content,
          author: q.author
        }));
        allQuotes = [...allQuotes, ...quotes];
      });

      setQuoteData(allQuotes);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load all quotes:', err);
      setError('Could not fetch quotes from API.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  const getQuoteByIndex = (index) => {
    if (quoteData.length === 0) {
      return { quote: '', author: '', error: 'No quotes available.' };
    }
    const validIndex = Math.min(Math.max(0, index), quoteData.length - 1);
    const selectedQuote = quoteData[validIndex];
    return {
      quote: selectedQuote.quote,
      author: selectedQuote.author,
      error: ''
    };
  };

  return { quoteData, loading, error, getQuoteByIndex };
};

export default useQuotes;
