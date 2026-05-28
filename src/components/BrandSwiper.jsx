import { useState, useEffect, useCallback, useRef } from 'react';
import CarCard from './CarCard';
import CarImage from './CarImage';
import { ALL_CARS, BRANDS } from '../data';

export default function BrandSwiper({ onCarClick, addCart, toggleFav, isFav, onViewAll }) {
  const [activeBrandIdx, setActiveBrandIdx] = useState(0);
  const [offsets, setOffsets] = useState({});
  const timerRef = useRef(null);

  const activeBrand = BRANDS[activeBrandIdx];
  const brandCars   = ALL_CARS.filter((c) => c.brand === activeBrand.id);

  const getVisible = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 480)  return 1;
    if (window.innerWidth < 768)  return 2;
    if (window.innerWidth < 1100) return 3;
    return 4;
  };
  const [visCount, setVisCount] = useState(getVisible);
  useEffect(() => {
    const handleResize = () => setVisCount(getVisible());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentOffset = offsets[activeBrand.id] || 0;
  const totalSlides   = brandCars.length;

  const visibleCars = Array.from({ length: visCount }, (_, i) =>
    brandCars[(currentOffset + i) % totalSlides]
  );

  const goNext = useCallback(() => {
    setOffsets((prev) => ({
      ...prev,
      [activeBrand.id]: ((prev[activeBrand.id] || 0) + 1) % totalSlides,
    }));
  }, [activeBrand.id, totalSlides]);

  const goPrev = useCallback(() => {  
    setOffsets((prev) => ({
      ...prev,
      [activeBrand.id]: ((prev[activeBrand.id] || 0) - 1 + totalSlides) % totalSlides,
    }));
  }, [activeBrand.id, totalSlides]);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 4500);
    return () => clearInterval(timerRef.current);
  }, [goNext, activeBrandIdx]);

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 14, marginBottom: 26 }}>
        {BRANDS.map((brand, idx) => (
          <button
            key={brand.id}
            onClick={() => setActiveBrandIdx(idx)}
            style={{
              flexShrink: 0,
              background: activeBrandIdx === idx
                ? 'linear-gradient(135deg, var(--gold), var(--gold-l))'
                : 'var(--surface-2)',
              border: `1px solid ${activeBrandIdx === idx ? 'transparent' : 'var(--border)'}`,
              color: activeBrandIdx === idx ? '#000' : 'var(--text)',
              padding: '8px 18px',
              borderRadius: 22,
              fontSize: 12,
              fontWeight: activeBrandIdx === idx ? 700 : 400,
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Hero Banner */}
      <div style={{ position: 'relative', height: 155, borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 22, background: `linear-gradient(135deg, ${activeBrand.color}16, var(--bg-2))` }}>
        {brandCars[0] && (
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%', opacity: 0.22 }}>
            <CarImage
              id={brandCars[0].id}
              brand={brandCars[0].brand}
              model={brandCars[0].model}
              year={brandCars[0].year}
              color={brandCars[0].color}
              angle="29"
              style={{ width: '100%', height: '100%' }}
              alt=""
            />
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 32px' }}>
          <div>
            <div style={{ color: activeBrand.color, fontSize: 10, letterSpacing: 4, marginBottom: 4, fontWeight: 600 }}>
              COLLECTION 2024–2025
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 4vw, 2.2rem)', color: 'var(--text)', fontWeight: 600 }}>
              {activeBrand.name}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>
              {brandCars.length} models available
            </div>
          </div>
        </div>
      </div>

      {/* Slide Area */}
      <div style={{ position: 'relative' }}>
        <button onClick={goPrev} aria-label="Previous" style={{ position: 'absolute', left: -14, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'var(--gold)', border: 'none', color: '#000', width: 32, height: 32, borderRadius: '50%', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
          ‹
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${visCount}, 1fr)`, gap: 16 }}>
          {visibleCars.map((car) => (
            <CarCard
              key={car.id} // ثابت على id فقط
              car={car}
              onCarClick={onCarClick}
              addCart={addCart}
              toggleFav={toggleFav}
              isFav={isFav}
            />
          ))}
        </div>

        <button onClick={goNext} aria-label="Next" style={{ position: 'absolute', right: -14, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'var(--gold)', border: 'none', color: '#000', width: 32, height: 32, borderRadius: '50%', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
          ›
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18 }}>
        {Array.from({ length: Math.min(totalSlides, 8) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setOffsets((prev) => ({ ...prev, [activeBrand.id]: i }))}
            style={{
              width: currentOffset === i ? 20 : 7,
              height: 7,
              borderRadius: 4,
              background: currentOffset === i ? 'var(--gold)' : 'var(--border)',
              border: 'none',
              padding: 0,
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* View all */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={() => onViewAll && onViewAll(activeBrand.id)}
          style={{
            background: 'none',
            border: '1px solid var(--gold)',
            color: 'var(--gold)',
            padding: '8px 24px',
            borderRadius: 22,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          View All {activeBrand.name} Models →
        </button>
      </div>
    </div>
  );
}
