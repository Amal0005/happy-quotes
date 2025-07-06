const QuoteCard = ({ quote, author, error, loading, onRetry }) => (
  <div className="quote-card">
    {error ? (
      <>
        <p className="error">{error}</p>
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      </>
    ) : quote ? (
      <div className="fade-in">
        <p>"{quote}"</p>
        <p className="author">— {author}</p>
      </div>
    ) : (
      !loading && <p className="loading">Enter a number (0-999) to get a quote!</p>
    )}
    {loading && <p className="loading">Loading quotes from API...</p>}
    
  </div>
);

export default QuoteCard;