import CarImage from './CarImage';
import { useCountdown } from '../hooks';
import { ALL_CARS } from '../data';
import { getCarImageUrl, getCarImageFallbacks, getPlaceholderUrl, formatPrice } from "../utils";

/**
 * OfferCard — displays a limited-time offer with countdown timer.
 *
 * Props:
 *  offer   {object}  offer data
 *  addCart {fn}
 */
export default function OfferCard({ offer, addCart }) {
  const { d, h, m, s } = useCountdown(offer.endDate);

  // Find the matching car for the image
  const car =
    ALL_CARS.find((c) => c.brand === offer.brand && c.model === offer.model) ||
    ALL_CARS.find((c) => c.brand === offer.brand);

  const discounted = Math.round(offer.originalPrice * (1 - offer.discount / 100));

  const handleAddToCart = () => {
    if (!car) return;
    addCart({ ...car, price: discounted });
  };

  return (
    <article
      className="card-hover shine"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Car image */}
      {car && (
        <CarImage
          brand={car.brand}
          model={car.model}
          year={offer.year}
          color={car.color}
          angle="23"
          style={{ height: 145, width: '100%', flexShrink: 0 }}
          alt={offer.title}
        />
      )}

      <div style={{ padding: '14px 16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 2, fontWeight: 600, marginBottom: 5 }}>
          SPECIAL OFFER
        </span>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)', marginBottom: 8, lineHeight: 1.4, fontWeight: 500 }}>
          {offer.title}
        </h3>

        {/* Discount badge */}
        {offer.discount > 0 && (
          <span style={{
            display: 'inline-block', background: '#c0392b', color: '#fff',
            fontSize: 10, padding: '2px 9px', borderRadius: 16,
            fontWeight: 700, marginBottom: 10, alignSelf: 'flex-start',
          }}>
            {offer.discount}% OFF
          </span>
        )}

        {/* Price */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
          {offer.discount > 0 && (
            <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: 11 }}>
              {formatPrice(offer.originalPrice)}
            </span>
          )}
          <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)' }}>
            {formatPrice(discounted)}
          </span>
        </div>

        {/* Countdown */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          {[{ n: d, l: 'D' }, { n: h, l: 'H' }, { n: m, l: 'M' }, { n: s, l: 'S' }].map(({ n, l }) => (
            <div
              key={l}
              style={{
                flex: 1, background: 'var(--surface-2)',
                borderRadius: 7, padding: '7px 3px',
                textAlign: 'center', border: '1px solid var(--border)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--gold)', fontWeight: 700 }}>
                {String(n || 0).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 8, color: 'var(--text-muted)', letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="shine"
          onClick={handleAddToCart}
          disabled={!car}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
            border: 'none',
            color: '#000',
            padding: '10px',
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 'auto',
          }}
        >
          Grab This Deal
        </button>
      </div>
    </article>
  );
}
