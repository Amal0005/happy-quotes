import React from 'react';
import useQuotes from './useQuotes';

const QuoteComponent = () => {
  const { quoteData, loading, error, getQuoteByIndex } = useQuotes();

  if (loading) return <p>Loading quotes...</p>;
  if (error) return <p>{error}</p>;

  const { quote, author } = getQuoteByIndex(Math.floor(Math.random() * quoteData.length));

  return (
    <div>
      <blockquote>"{quote}"</blockquote>
      <p>- {author}</p>
    </div>
  );
};

export default QuoteComponent;
