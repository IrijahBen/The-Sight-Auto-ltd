import CarImage from './CarImage';
import { formatPrice } from "../utils";

/**
 * CartDrawer — slide-in panel showing cart items.
 *
 * Props:
 *  open         {boolean}
 *  onClose      {fn}
 *  cart         {Array}
 *  removeCart   {fn}   (id) => void
 *  increaseQty  {fn}   (id) => void
 *  decreaseQty  {fn}   (id) => void
 *  nearestBranch{object|null}
 *  onCheckout   {fn}
 */
export default function CartDrawer({ open, onClose, cart, removeCart, increaseQty, decreaseQty, nearestBranch, onCheckout }) {
  const total = cart.reduce((sum, c) => sum + c.price * (c.quantity || 1), 0);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
        }}
      />

      {/* Panel */}
      <aside
        className="anim-slide-in"
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed', right: 0, top: 0, bottom: 0,
          width: 'min(360px, 100vw)',
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          padding: 22, overflowY: 'auto',
          zIndex: 2001,
          display: 'flex', flexDirection: 'column', gap: 0,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)' }}>
            Cart ({cart.reduce((sum, c) => sum + (c.quantity || 1), 0)})
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: 22, cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: 60, fontSize: 14 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
            Your cart is empty
          </div>
        ) : (
          <>
            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
              {cart.map((car) => (
                <div
                  key={car.id}
                  className="anim-fade-up"
                  style={{
                    display: 'flex', gap: 10, alignItems: 'center',
                    padding: 11, background: 'var(--surface-2)',
                    borderRadius: 11, border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ width: 78, height: 55, borderRadius: 7, overflow: 'hidden', flexShrink: 0 }}>
                    <CarImage
                      brand={car.brand}
                      model={car.model}
                      year={car.year}
                      color={car.color}
                      angle="23"
                      style={{ width: 78, height: 55 }}
                      alt={car.model}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {car.brandName} {car.model}
                    </div>
                    <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700 }}>
                      {formatPrice(car.price * (car.quantity || 1))}
                    </div>
                    {car.color && (
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{car.color}</div>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6  }}>
                    <button onClick={() => decreaseQty(car.id)} style={qtyBtn}>–</button>
                    <span style={{ minWidth: 20, textAlign: 'center' , color :"white" }}>{car.quantity || 1}</span>
                    <button onClick={() => increaseQty(car.id)} style={qtyBtn}>+</button>
                  </div>

                  <button
                    onClick={() => removeCart(car.id)}
                    aria-label={`Remove ${car.model} from cart`}
                    style={{ background: 'none', border: 'none', color: '#f44', fontSize: 17, cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Nearest branch */}
            {nearestBranch && (
              <div style={{
                padding: 11, background: 'rgba(192,160,96,0.08)',
                border: '1px solid rgba(192,160,96,0.3)',
                borderRadius: 9, marginTop: 16, fontSize: 12, color: 'var(--text-muted)',
              }}>
                📍 Nearest showroom: <strong style={{ color: 'var(--gold)' }}>{nearestBranch.name}</strong>
              </div>
            )}

            {/* Total + CTA */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>
                <span style={{ color: 'var(--text)' }}>Total</span>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
                  {formatPrice(total)}
                </span>
              </div>
              <button
                className="shine"
                onClick={onCheckout}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
                  border: 'none', color: '#000',
                  padding: '13px', borderRadius: 9,
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}
              >
                Place Order →
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

const qtyBtn = {
  border: '1px solid var(--border)',
  background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
  borderRadius: 4,
  width: 24,
  height: 24,
  cursor: 'pointer',
  fontWeight: 700,
};
