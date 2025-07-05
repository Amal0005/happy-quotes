import { useState, useEffect } from 'react';
import useQuotes from '../hooks/useQuotes';
import QuoteCard from './QuoteCard';

const QuoteGenerator = () => {
  const { loading, error, getRandomQuote, fetchQuotes, quoteData } = useQuotes();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleGenerateQuote = () => {
    const { quote: newQuote, author: newAuthor, error: newError } = getRandomQuote();
    if (newError) {
      setQuote('');
      setAuthor('');
    } else {
      setQuote(newQuote);
      setAuthor(newAuthor);
    }
  };

  // Show a random quote on initial load
  useEffect(() => {
    if (!loading && !error && quoteData.length > 0) {
      handleGenerateQuote();
    }
  }, [loading, error, quoteData.length]);

  return (
    <div className="quote-generator">
      <button
        onClick={handleGenerateQuote}
        className="quote-button"
        disabled={loading}
      >
        Get Random Quote
      </button>
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