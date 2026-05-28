import { useState, useMemo } from 'react';
import CarCard from '../components/CarCard';
import { ALL_CARS, BRANDS } from '../data';

/**
 * CarsPage — full catalogue with search, brand filter, and load-more.
 */
export default function CarsPage({ onCarClick, addCart, toggleFav, isFav }) {
  const [search,      setSearch]      = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [page,        setPage]        = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const PER_PAGE = 12;

  const filtered = useMemo(() =>
    ALL_CARS.filter((c) =>
      (filterBrand === 'all' || c.brand === filterBrand) &&
      (!search || `${c.brandName} ${c.model}`.toLowerCase().includes(search.toLowerCase()))
    ),
    [filterBrand, search]
  );

  const paged = filtered.slice(0, page * PER_PAGE);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    if (value.length > 1) {
      setSuggestions(
        ALL_CARS.filter((c) =>
          `${c.brandName} ${c.model}`.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5)
      );
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="section">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>FULL CATALOGUE</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--text)', fontWeight: 600 }}>
          All Cars
        </h1>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 26, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search model…"
            aria-label="Search cars"
            style={{
              width: '100%',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 9,
              padding: '10px 13px',
              color: 'var(--text)',
              fontSize: 13,
            }}
          />
          {suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 9, zIndex: 100, marginTop: 3, overflow: 'hidden',
            }}>
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSearch(`${s.brandName} ${s.model}`); setSuggestions([]); }}
                  style={{
                    display: 'block', width: '100%', background: 'none',
                    border: 'none', padding: '8px 13px', textAlign: 'left',
                    color: 'var(--text)', fontSize: 12, cursor: 'pointer',
                    borderBottom: '1px solid var(--border)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <span style={{ color: 'var(--gold)' }}>{s.brandName}</span> {s.model}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand filter */}
        <select
          value={filterBrand}
          onChange={(e) => { setFilterBrand(e.target.value); setPage(1); }}
          aria-label="Filter by brand"
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 9, padding: '10px 13px',
            color: 'var(--text)', fontSize: 13, minWidth: 155, cursor: 'pointer',
          }}
        >
          <option value="all">All Brands</option>
          {BRANDS.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Result count */}
      <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 18 }}>
        {filtered.length} car{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {paged.length > 0 ? (
        <div className="grid-cards">
          {paged.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onCarClick={onCarClick}
              addCart={addCart}
              toggleFav={toggleFav}
              isFav={isFav}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px 0', fontSize: 14 }}>
          No cars match your search.
        </div>
      )}

      {/* Load more */}
      {paged.length < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button
            className="shine"
            onClick={() => setPage((p) => p + 1)}
            style={{
              background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
              border: 'none', color: '#000',
              padding: '12px 36px', borderRadius: 26,
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Load More ({filtered.length - paged.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
