import { useState, useEffect } from 'react';
import useQuotes from '../hooks/useQuotes';
import QuoteCard from './QuoteCard';

const QuoteGenerator = () => {
  const { loading, error, getQuoteByIndex, fetchQuotes, quoteData } = useQuotes();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const index = parseInt(inputValue, 10);
    if (isNaN(index) || index < 0 || index >= 1000) {
      setQuote('');
      setAuthor('');
      setError('Please enter a valid number between 0 and 999.');
      return;
    }
    const { quote: newQuote, author: newAuthor, error: newError } = getQuoteByIndex(index);
    if (newError) {
      setQuote('');
      setAuthor('');
    } else {
      setQuote(newQuote);
      setAuthor(newAuthor);
    }
  };

  // Show a default message on initial load
  useEffect(() => {
    if (!loading && !error && quoteData.length > 0) {
      setQuote('');
      setAuthor('');
    }
  }, [loading, error, quoteData.length]);

  return (
    <div className="quote-generator">
      <div>
        <input
          type="number"
          className="quote-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter 0-999"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          className="quote-submit"
          disabled={loading}
        >
          Submit
        </button>
      </div>
      <QuoteCard
        quote={quote}
        author={author}
        error={error}
        loading={loading}
        onRetry={fetchQuotes}
      />
    </div>
  );
};

export default QuoteGenerator;