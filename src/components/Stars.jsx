/**
 * Stars — renders a star rating (static or interactive).
 *
 * Props:
 *  rating      {number}  0–5 (supports decimals for display)
 *  size        {number}  font-size in px
 *  interactive {boolean} if true, stars are clickable
 *  onRate      {fn}      called with new rating when clicked
 */
export default function Stars({ rating = 0, size = 14, interactive = false, onRate = null }) {
  return (
    <span
      style={{ color: '#C0A060', fontSize: size, letterSpacing: 2, lineHeight: 1 }}
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => interactive && onRate && onRate(i)}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            transition: 'transform 0.15s',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => { if (interactive) e.currentTarget.style.transform = 'scale(1.2)'; }}
          onMouseLeave={(e) => { if (interactive) e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {i <= Math.floor(rating) ? '★' : '☆'}
        </span>
      ))}
    </span>
  );
}
