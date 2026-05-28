import React from 'react';
import CarImage from './CarImage';
import Stars from './Stars';
import { formatPrice } from "../utils";

/**
 * CarCard — displays a car's image, name, specs, price, and actions.
 *
 * Props:
 *  car        {object}  car data object
 *  onCarClick {fn}      called with car when card/title is clicked
 *  addCart    {fn}      called with car to add to cart
 *  toggleFav  {fn}      called with car to toggle favorite
 *  isFav      {fn}      (id) => boolean
 */
function CarCard({ car, onCarClick, addCart, toggleFav, isFav }) {
  const fav = isFav(car.id);

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
      {/* Image area */}
      <div
        style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
        onClick={() => onCarClick(car)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onCarClick(car)}
        aria-label={`View ${car.brandName} ${car.model}`}
      >
        <CarImage
          id={car.id}
          brand={car.brand}
          model={car.model}
          year={car.year}
          color={car.color}
          angle="23"
          style={{ height: 180, width: '100%' }}
          alt={`${car.brandName} ${car.model}`}
        />

        {/* Badges */}
        {car.isNew && (
          <span style={styles.badgeNew}>NEW</span>
        )}
        {!car.available && (
          <span style={styles.badgeSoldOut}>SOLD OUT</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
          <div>
            <div style={styles.brandLabel}>{car.brandName.toUpperCase()}</div>
            <h3
              style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', lineHeight: 1.2 }}
              onClick={() => onCarClick(car)}
            >
              {car.model}
            </h3>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleFav(car); }}
            aria-label={fav ? 'Remove from wishlist' : 'Add to wishlist'}
            style={{
              background: 'none',
              border: 'none',
              color: fav ? '#E74C3C' : 'var(--text-muted)',
              fontSize: 22,
              transition: 'transform 0.2s, color 0.2s',
              transform: fav ? 'scale(1.15)' : 'scale(1)',
              lineHeight: 1,
              padding: 0,
            }}
          >
            {fav ? '♥' : '♡'}
          </button>
        </div>

        {/* Spec pills */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
          {[car.year, car.engine, car.fuel].map((s, index) => (
            <span key={`${car.id}-${s}-${index}`} style={styles.pill}>{s}</span>
          ))}
        </div>

        {/* Rating */}
        <Stars rating={car.rating} size={13} />

        {/* Price + CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 12 }}>
          <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)' }}>
            {formatPrice(car.price)}
          </span>
          <button
            className="shine"
            onClick={(e) => { e.stopPropagation(); addCart(car); }}
            disabled={!car.available}
            style={{
              background: car.available
                ? 'linear-gradient(135deg, var(--gold), var(--gold-l))'
                : 'var(--border)',
              border: 'none', color: car.available ? '#000' : 'var(--text-muted)',
              padding: '6px 14px', borderRadius: 18,
              fontSize: 12, fontWeight: 700, transition: 'opacity 0.2s',
              cursor: car.available ? 'pointer' : 'not-allowed',
              whiteSpace: 'nowrap',
            }}
          >
            {car.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}

const styles = {
  badgeNew: {
    position: 'absolute', top: 8, left: 8,
    background: '#C0A060', color: '#000',
    fontSize: 9, padding: '2px 8px',
    borderRadius: 18, fontWeight: 700, letterSpacing: 1,
  },
  badgeSoldOut: {
    position: 'absolute', top: 8, right: 8,
    background: '#c0392b', color: '#fff',
    fontSize: 9, padding: '2px 8px',
    borderRadius: 18, fontWeight: 700, letterSpacing: 1,
  },
  brandLabel: {
    fontSize: 10, color: 'var(--gold)',
    fontWeight: 600, letterSpacing: 1,
    marginBottom: 2,
  },
  pill: {
    background: 'var(--surface-2)',
    color: 'var(--text-muted)',
    fontSize: 10, padding: '2px 7px',
    borderRadius: 7,
    whiteSpace: 'nowrap',
  },
};

export default React.memo(CarCard);
