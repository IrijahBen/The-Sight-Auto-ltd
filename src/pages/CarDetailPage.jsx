import { useState } from 'react';
import CarImage from '../components/CarImage';
import Stars from '../components/Stars';
import { CAR_COLORS, COLOR_HEX, ANGLES, ANGLE_LABELS } from '../data';
import { getCarImageUrl, getCarImageFallbacks, getPlaceholderUrl, formatPrice } from "../utils";

/**
 * CarDetailPage — full car detail with gallery, color picker, reviews.
 */
export default function CarDetailPage({
  car, user, addCart, toggleFav, isFav,
  comments, setComments, ratings, setRatings,
  notify, onBack,
}) {
  const [angleIdx,  setAngleIdx]  = useState(0);
  const [selColor,  setSelColor]  = useState(car.color || CAR_COLORS[0]);
  const [cmtText,   setCmtText]   = useState('');
  const [userRat,   setUserRat]   = useState(ratings[car.id] || 0);
  const fav     = isFav(car.id);
  const carCmts = comments[car.id] || [];

  const handlePostComment = () => {
    if (!cmtText.trim()) return;
    if (!user) { notify('Please sign in to leave a review', 'error'); return; }
    setComments((prev) => ({
      ...prev,
      [car.id]: [
        ...(prev[car.id] || []),
        {
          id:     Date.now(),
          user:   user.name,
          text:   cmtText,
          date:   new Date().toLocaleDateString('en-GB'),
          rating: userRat,
        },
      ],
    }));
    setCmtText('');
    notify('Review posted ✓', 'success');
  };

  return (
    <div className="anim-fade-up" style={{ maxWidth: 1060, margin: '0 auto', padding: '26px 20px' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', color: 'var(--gold)',
          fontSize: 13, marginBottom: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500,
        }}
      >
        ← Back
      </button>

      {/* Main layout — stack on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 32,
        alignItems: 'start',
      }}>
        {/* ── Gallery ── */}
        <div>
          {/* Main image */}
          <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 9, background: '#0d0d1a' }}>
            <CarImage
              brand={car.brand}
              model={car.model}
              year={car.year}
              color={selColor}
              angle={ANGLES[angleIdx]}
              style={{ width: '100%', height: 'clamp(200px, 40vw, 310px)' }}
              alt={`${car.brandName} ${car.model}`}
            />
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: 'flex', gap: 6 }}>
            {ANGLES.map((a, i) => (
              <button
                key={a}
                onClick={() => setAngleIdx(i)}
                aria-label={`View ${ANGLE_LABELS[a]}`}
                style={{
                  flex: 1, borderRadius: 7, overflow: 'hidden', cursor: 'pointer',
                  border: `2px solid ${angleIdx === i ? 'var(--gold)' : 'transparent'}`,
                  opacity: angleIdx === i ? 1 : 0.5,
                  transition: 'all 0.2s', padding: 0, background: '#0d0d1a',
                }}
              >
                <CarImage
                  brand={car.brand} model={car.model}
                  year={car.year}   color={selColor}
                  angle={a}
                  style={{ height: 50, width: '100%' }}
                  alt={ANGLE_LABELS[a]}
                />
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 5 }}>
            {ANGLES.map((a, i) => (
              <span
                key={a}
                onClick={() => setAngleIdx(i)}
                style={{ fontSize: 9, color: angleIdx === i ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                {ANGLE_LABELS[a]}
              </span>
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div>
          <p style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>
            {car.brandName.toUpperCase()}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--text)', marginBottom: 8, fontWeight: 600 }}>
            {car.model}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
            <Stars rating={car.rating} size={16} />
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>({carCmts.length} reviews)</span>
          </div>

          {/* Price */}
          <div style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, color: 'var(--gold)', marginBottom: 20, fontFamily: 'var(--font-display)' }}>
            {formatPrice(car.price)}
          </div>

          {/* Specs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 22 }}>
            {[
              ['Engine',  car.engine],
              ['Year',    car.year],
              ['Fuel',    car.fuel],
              ['Power',   `${car.power} hp`],
              ['Seats',   car.seats],
              ['Mileage', `${(car.mileage || 0).toLocaleString()} km`],
            ].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--surface-2)', borderRadius: 8, padding: '8px 12px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: 1, marginBottom: 2 }}>{k.toUpperCase()}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Color picker */}
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1, marginBottom: 8 }}>
              COLOR — IMAGE UPDATES LIVE
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CAR_COLORS.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelColor(col)}
                  title={col}
                  aria-label={`Select color: ${col}`}
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: COLOR_HEX[col] || '#888',
                    border: `3px solid ${selColor === col ? 'var(--gold)' : 'transparent'}`,
                    cursor: 'pointer', transition: 'border-color 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)', padding: 0,
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 5 }}>{selColor}</p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="shine"
              onClick={() => addCart({ ...car, color: selColor })}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
                border: 'none', color: '#000',
                padding: '12px', borderRadius: 10,
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Add to Cart 🛒
            </button>
            <button
              onClick={() => toggleFav(car)}
              aria-label={fav ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{
                background: fav ? 'rgba(231,76,60,0.15)' : 'var(--surface-2)',
                border: `1px solid ${fav ? '#E74C3C' : 'var(--border)'}`,
                color: fav ? '#E74C3C' : 'var(--text-muted)',
                width: 48, borderRadius: 10, fontSize: 22, cursor: 'pointer',
              }}
            >
              {fav ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <div style={{ marginTop: 44 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginBottom: 22, fontWeight: 600 }}>
          Reviews & Comments
        </h2>

        {/* Write review */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 20, marginBottom: 22,
        }}>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1, marginBottom: 8 }}>YOUR RATING</p>
          <div style={{ marginBottom: 12 }}>
            <Stars
              rating={userRat}
              size={26}
              interactive
              onRate={(s) => { setUserRat(s); setRatings((p) => ({ ...p, [car.id]: s })); }}
            />
          </div>
          <textarea
            value={cmtText}
            onChange={(e) => setCmtText(e.target.value)}
            placeholder="Share your thoughts…"
            rows={3}
            style={{
              width: '100%', background: 'var(--surface-2)',
              border: '1px solid var(--border)', borderRadius: 8,
              padding: 10, color: 'var(--text)', fontSize: 13, resize: 'none',
            }}
          />
          <button
            className="shine"
            onClick={handlePostComment}
            style={{
              marginTop: 9, background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
              border: 'none', color: '#000',
              padding: '8px 24px', borderRadius: 20,
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Post Review
          </button>
        </div>

        {/* Review list */}
        {carCmts.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No reviews yet. Be the first!</p>
        )}
        {carCmts.map((cm) => (
          <div
            key={cm.id}
            className="anim-fade-up"
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 11, padding: 14, marginBottom: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <strong style={{ color: 'var(--text)', fontSize: 13 }}>{cm.user}</strong>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{cm.date}</span>
            </div>
            {cm.rating > 0 && <Stars rating={cm.rating} />}
            <p style={{ marginTop: 7, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>{cm.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
