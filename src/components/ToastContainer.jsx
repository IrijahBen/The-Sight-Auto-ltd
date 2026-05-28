/**
 * ToastContainer — renders all active toast notifications.
 *
 * Props:
 *  notes {Array} from useNotify() hook
 */
export default function ToastContainer({ notes }) {
  if (!notes.length) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 70,
        right: 14,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none',
        maxWidth: 'calc(100vw - 28px)',
      }}
    >
      {notes.map((n) => (
        <div
          key={n.id}
          className="anim-slide-in"
          style={{
            background:
              n.type === 'success' ? '#0D2B0D' :
              n.type === 'error'   ? '#2B0D0D' :
              'var(--surface-2)',
            border: `1px solid ${
              n.type === 'success' ? '#4CAF50' :
              n.type === 'error'   ? '#f44444' :
              'var(--gold)'
            }`,
            color: 'var(--text)',
            padding: '10px 18px',
            borderRadius: 10,
            fontSize: 13,
            backdropFilter: 'blur(16px)',
            minWidth: 200,
            boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
            pointerEvents: 'auto',
          }}
        >
          {n.msg}
        </div>
      ))}
    </div>
  );
}
