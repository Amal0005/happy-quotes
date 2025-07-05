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
      !loading && <p className="loading">Click to get a random quote!</p>
    )}
    {loading && <p className="loading">Loading quotes from API...</p>}
    <p className="attribution">
      Quotes provided by{' '}
      <a href="https://api-ninjas.com/api/quotes" target="_blank">
        API Ninjas
      </a>
    </p>
  </div>
);

export default QuoteCard;