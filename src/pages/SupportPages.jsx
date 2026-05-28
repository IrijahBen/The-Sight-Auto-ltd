import { useState, useEffect, useMemo } from 'react';
import OfferCard from '../components/OfferCard';
import CarImage from '../components/CarImage';
import { OFFERS, BRANCHES, GOVERNORATES, EVENTS, BRANDS, MODELS, PRICES, CAR_COLORS, COLOR_HEX, WHEEL_OPTIONS, INTERIOR_OPTIONS, ADDON_OPTIONS, ALL_CARS, ANGLES, ANGLE_LABELS } from '../data';
import { getCarImageUrl, getCarImageFallbacks, getPlaceholderUrl, formatPrice } from "../utils";

// ─── OFFERS PAGE ──────────────────────────────────────────────────────────────
export function OffersPage({ addCart }) {
  return (
    <div className="section">
      <div style={{ textAlign: 'center', marginBottom: 42 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>EXCLUSIVE</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>
          Deals & Promotions
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 9, fontSize: 13 }}>
          Limited-time offers — don't miss out
        </p>
      </div>
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))' }}>
        {OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} addCart={addCart} />
        ))}
      </div>
    </div>
  );
}

// ─── CONFIGURE PAGE ───────────────────────────────────────────────────────────
export function ConfigurePage({ addCart, notify }) {
  const [brand,    setBrand]    = useState('mercedes');
  const [model,    setModel]    = useState(MODELS.mercedes[0]);
  const [color,    setColor]    = useState(CAR_COLORS[0]);
  const [wheel,    setWheel]    = useState(WHEEL_OPTIONS[0]);
  const [interior, setInterior] = useState(INTERIOR_OPTIONS[0]);
  const [addons,   setAddons]   = useState([]);
  const [angle,    setAngle]    = useState('23');

  useEffect(() => { setModel(MODELS[brand]?.[0] || ''); }, [brand]);

  const [minP, maxP] = PRICES[brand] || [500000, 2000000];
  const base  = Math.round((minP + maxP) / 2);
  const total = base
    + addons.length * 25000
    + WHEEL_OPTIONS.indexOf(wheel) * 15000
    + INTERIOR_OPTIONS.indexOf(interior) * 20000;

  const toggleAddon = (a) =>
    setAddons((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

return (
  <div className="section">
    <div style={{ textAlign: 'center', marginBottom: 36 }}>
      <p className="label-xs text-gold" style={{ marginBottom: 6 }}>PERSONALIZE</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>
        Build Your Car
      </h1>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
      {/* Options panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Brand */}
        <div>
          <p className="label-xs text-muted" style={{ marginBottom: 6 }}>BRAND</p>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} style={selectStyle}>
            {BRANDS.map((b, index) => (
              <option key={`${b.id}-${index}`} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        {/* Model */}
        <div>
          <p className="label-xs text-muted" style={{ marginBottom: 6 }}>MODEL</p>
          <select value={model} onChange={(e) => setModel(e.target.value)} style={selectStyle}>
            {(MODELS[brand] || []).map((m, index) => (
              <option key={`${brand}-${m}-${index}`} value={m}>{m}</option>
            ))}
          </select>
        </div>
        {/* Color */}
        <div>
          <p className="label-xs text-muted" style={{ marginBottom: 8 }}>COLOR — IMAGE UPDATES LIVE</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CAR_COLORS.map((c, index) => (
              <button
                key={`${c}-${index}`}
                onClick={() => setColor(c)}
                title={c}
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: COLOR_HEX[c] || '#888',
                  border: `3px solid ${color === c ? 'var(--gold)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'border-color 0.2s', padding: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 5 }}>{color}</p>
        </div>
        {/* Wheels */}
        <div>
          <p className="label-xs text-muted" style={{ marginBottom: 6 }}>WHEELS</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {WHEEL_OPTIONS.map((o, index) => (
              <button
                key={`${o}-${index}`}
                onClick={() => setWheel(o)}
                style={{
                  ...optionBtnStyle,
                  background: wheel === o ? 'rgba(192,160,96,0.18)' : 'var(--surface-2)',
                  border: `1px solid ${wheel === o ? 'var(--gold)' : 'var(--border)'}`,
                  color: wheel === o ? 'var(--gold)' : 'var(--text)',
                }}
              >
                {wheel === o ? '✓  ' : ''}{o}
              </button>
            ))}
          </div>
        </div>
        {/* Interior */}
        <div>
          <p className="label-xs text-muted" style={{ marginBottom: 6 }}>INTERIOR</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {INTERIOR_OPTIONS.map((o, index) => (
              <button
                key={`${o}-${index}`}
                onClick={() => setInterior(o)}
                style={{
                  ...optionBtnStyle,
                  background: interior === o ? 'rgba(192,160,96,0.18)' : 'var(--surface-2)',
                  border: `1px solid ${interior === o ? 'var(--gold)' : 'var(--border)'}`,
                  color: interior === o ? 'var(--gold)' : 'var(--text)',
                }}
              >
                {interior === o ? '✓  ' : ''}{o}
              </button>
            ))}
          </div>
        </div>
        {/* Add-ons */}
        <div>
          <p className="label-xs text-muted" style={{ marginBottom: 6 }}>ADD-ONS (+25,000 EGP each)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {ADDON_OPTIONS.map((a, index) => (
              <button
                key={`${a}-${index}`}
                onClick={() => toggleAddon(a)}
                style={{
                  ...optionBtnStyle,
                  background: addons.includes(a) ? 'rgba(192,160,96,0.18)' : 'var(--surface-2)',
                  border: `1px solid ${addons.includes(a) ? 'var(--gold)' : 'var(--border)'}`,
                  color: addons.includes(a) ? 'var(--gold)' : 'var(--text)',
                }}
              >
                {addons.includes(a) ? '✓  ' : '○  '}{a}
              </button>
            ))}
          </div>
        </div>
      </div>
    
  
{/* Live preview */}
<div style={{ position: 'sticky', top: 76 }}>
  {/* Angle selector */}
  <div style={{ display: 'flex', gap: 5, marginBottom: 9, justifyContent: 'center' }}>
    {[{ a: '23', l: 'Front' }, { a: '01', l: 'Side' }, { a: '29', l: '3/4' }, { a: '13', l: 'Rear' }].map(({ a, l }, index) => (
      <button
        key={`${a}-${index}`}
        onClick={() => setAngle(a)}
        style={{
          background: angle === a ? 'rgba(192,160,96,0.18)' : 'var(--surface-2)',
          border: `1px solid ${angle === a ? 'var(--gold)' : 'var(--border)'}`,
          color: angle === a ? 'var(--gold)' : 'var(--text-muted)',
          padding: '4px 10px', borderRadius: 14, fontSize: 11, cursor: 'pointer',
        }}
      >
        {l}
      </button>
    ))}
  </div>

  {/* Car preview */}
  <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 16, background: '#0d0d1a' }}>
    <CarImage
      brand={brand}
      model={model}
      year={2024}
      color={color}
      angle={angle}
      style={{ width: '100%', height: 250 }}
      alt={`${brand} ${model}`}
    />
  </div>

  {/* Summary card */}
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
    <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--text)', marginBottom: 3 }}>
      {BRANDS.find((b) => b.id === brand)?.name} {model}
    </p>
    <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 16 }}>
      {color} · {wheel} · {interior}
    </p>

    {/* Price breakdown */}
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginBottom: 12 }}>
      {[['Base Price', base],
        ['Wheels', WHEEL_OPTIONS.indexOf(wheel) * 15000],
        ['Interior', INTERIOR_OPTIONS.indexOf(interior) * 20000],
        ['Add-ons', addons.length * 25000]].map(([k, v], index) =>
        v > 0 && (
          <div
            key={`${k}-${index}`}
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: 'var(--text-muted)' }}
          >
            <span>{k}</span>
            <span>{v.toLocaleString()} EGP</span>
          </div>
        )
      )}
    </div>

    {/* Total */}
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
      <span style={{ color: 'var(--text)' }}>Total</span>
      <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
        {formatPrice(total)}
      </span>
    </div>

    {/* Add to cart button */}
    <button
      className="shine"
      onClick={() => {
        addCart({
          id: `cfg_${Date.now()}`,
          brand,
          brandName: BRANDS.find((b) => b.id === brand)?.name,
          model,
          price: total,
          color,
          available: true,
          year: 2024,
        });
        notify('Configuration added to cart ✓', 'success');
      }}
      style={{
        width: '100%',
        background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
        border: 'none',
        color: '#000',
        padding: '12px',
        borderRadius: 9,
        fontSize: 14,
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      Add to Cart
    </button>
  </div>
</div>

      </div>
    </div>
  );
}

// ─── BRANCHES PAGE ────────────────────────────────────────────────────────────
export function BranchesPage({ user }) {
  const [selected, setSelected] = useState(null);
  const nearest = user ? (BRANCHES.find((b) => b.gov === user.gov) || BRANCHES[0]) : null;

  return (
    <div className="section">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>FIND US</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>Our Showrooms</h1>
      </div>
      {nearest && (
        <div style={{ background: 'rgba(192, 96, 96, 0.08)', border: '1px solid rgba(192,160,96,0.3)', borderRadius: 11, padding: 12, marginBottom: 22, fontSize: 12, color: 'var(--text-muted)' }}>
          📍 Nearest showroom ({user?.gov}): <strong style={{ color: 'var(--gold)' }}>{nearest.name}</strong> — {nearest.address}
        </div>
      )}
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
        {BRANCHES.map((branch) => (
<div
  key={branch.id}
  className="card-hover"
  onClick={() => setSelected(branch.id === selected ? null : branch.id)}
  style={{
    backgroundImage: `url(${branch.carImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: `2px solid ${
      selected === branch.id || nearest?.id === branch.id
        ? "var(--gold)"
        : "var(--border)"
    }`,
    borderRadius: 14,
    padding: 18,
    cursor: "pointer",
    transition: "border-color 0.2s",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10,
    }}
  >
    <div>
      <h3 style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>
        {branch.name}
      </h3>
      <p
        style={{
          color: "#fbc456",
          fontSize: 11,
          marginTop: 2,
        }}
      >
        {branch.address}
      </p>
    </div>
    {nearest?.id === branch.id && (
      <span
        style={{
          background: "var(--gold)",
          color: "#000",
          fontSize: 9,
          padding: "2px 8px",
          borderRadius: 16,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        NEAREST
      </span>
    )}
  </div>
  <p style={{ color: "var(--gold)", fontSize: 12 }}>📞 {branch.phone}</p>
  <p
    style={{
      color: "var(--text-muted)",
      fontSize: 11,
      marginTop: 4,
    }}
  >
    🕐 9:00 AM – 10:00 PM daily
  </p>
  {selected === branch.id && (
    <div
      className="anim-fade-up"
      style={{
        marginTop: 10,
        padding: 9,
        background: "var(--surface-2)",
        borderRadius: 7,
        fontSize: 11,
        color: "var(--text-muted)",
      }}
    >
      📌 Governorate: {branch.gov}
    </div>
  )}
</div>

        ))}
      </div>
    </div>
  );
}

// ─── EVENTS PAGE ──────────────────────────────────────────────────────────────
export function EventsPage({ user, notify }) {
  const [booked, setBooked] = useState([]);
  const TYPE_COLOR = { Exhibition: 'var(--gold)', Launch: '#BB0A21', 'Test Drive': '#0066CC', Workshop: '#4CAF50' };

  return (
    <div className="section">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>UPCOMING</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>Events & Shows</h1>
      </div>
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))' }}>
        {EVENTS.map((ev, i) => (
          <div key={ev.id} className="card-hover anim-fade-up" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, animationDelay: `${i * 0.1}s` }}>
            <span style={{ display: 'inline-block', background: `${TYPE_COLOR[ev.type] || 'var(--gold)'}20`, border: `1px solid ${TYPE_COLOR[ev.type] || 'var(--gold)'}40`, color: TYPE_COLOR[ev.type] || 'var(--gold)', fontSize: 10, padding: '3px 10px', borderRadius: 16, marginBottom: 12, fontWeight: 600 }}>
              {ev.type.toUpperCase()}
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--text)', marginBottom: 10, fontWeight: 500 }}>{ev.title}</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span>📅 {ev.date}</span>
              <span>🕐 {ev.time}</span>
              <span>📍 {ev.location}</span>
              <span>👥 {ev.seats} seats available</span>
            </div>
            <button
              className="shine"
              onClick={() => {
                if (!user) { notify('Please sign in to book', 'error'); return; }
                if (booked.includes(ev.id)) return;
                setBooked((p) => [...p, ev.id]);
                notify(`Booked: "${ev.title}" ✓`, 'success');
              }}
              style={{ marginTop: 16, width: '100%', background: booked.includes(ev.id) ? 'rgba(192,160,96,0.2)' : 'linear-gradient(135deg, var(--gold), var(--gold-l))', border: `1px solid ${booked.includes(ev.id) ? 'var(--gold)' : 'transparent'}`, color: booked.includes(ev.id) ? 'var(--gold)' : '#000', padding: '10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              {booked.includes(ev.id) ? '✓ Booked' : 'Reserve a Seat'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
export function GalleryPage() {
  const [lightbox,  setLightbox]  = useState(null);
  const [carColors, setCarColors] = useState({});
  const [carAngles, setCarAngles] = useState({});

  const items = useMemo(() => {
    const picks = [];
    BRANDS.forEach((b) => {
      const cars = ALL_CARS.filter((c) => c.brand === b.id);
      [0, 1, 2].forEach((i) => { if (cars[i]) picks.push(cars[i]); });
    });
    return picks;
  }, []);

  return (
    <div className="section">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>OFFICIAL IMAGERY</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>Photo Gallery</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 7 }}>Live images from IMAGIN.studio — customize color & angle per card</p>
      </div>

      {/* Masonry */}
      <div style={{ columns: 'clamp(200px, 30%, 300px)', gap: 12 }}>
        {items.map((car, i) => {
          const c = carColors[car.id] || car.color;
          const a = carAngles[car.id] || ANGLES[i % ANGLES.length];
          return (
            <div key={`${car.id}-${i}`} className="card-hover" style={{ marginBottom: 12, borderRadius: 10, overflow: 'hidden', breakInside: 'avoid', background: '#0d0d1a' }}>
              <div onClick={() => setLightbox({ car, color: c, angle: a })} style={{ cursor: 'pointer' }}>
                <CarImage brand={car.brand} model={car.model} year={car.year} color={c} angle={a} style={{ width: '100%', height: 150 + (i % 3) * 40 }} alt={car.model} />
              </div>
              <div style={{ padding: '7px 10px', background: 'var(--surface-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ color: 'var(--gold)', fontSize: 10, fontWeight: 600 }}>{car.brandName}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{car.model}</span>
                </div>
                {/* Inline color swatches */}
                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {['Obsidian Black','Polar White','Iridium Silver','Cardinal Red','Cavansite Blue'].map((col) => (
                    <button key={col} onClick={() => setCarColors((p) => ({ ...p, [car.id]: col }))} style={{ width: 12, height: 12, borderRadius: '50%', background: COLOR_HEX[col], border: `2px solid ${c === col ? 'var(--gold)' : 'transparent'}`, cursor: 'pointer', padding: 0, transition: 'border-color 0.15s' }} title={col} />
                  ))}
                  <span style={{ color: 'var(--text-muted)', fontSize: 9, marginLeft: 4, alignSelf: 'center' }}>|</span>
                  {ANGLES.map((ag) => (
                    <button key={ag} onClick={() => setCarAngles((p) => ({ ...p, [car.id]: ag }))} style={{ background: a === ag ? 'rgba(192,160,96,0.2)' : 'transparent', border: `1px solid ${a === ag ? 'var(--gold)' : 'var(--border)'}`, color: a === ag ? 'var(--gold)' : 'var(--text-muted)', borderRadius: 4, fontSize: 8, padding: '1px 4px', cursor: 'pointer' }}>
                      {ANGLE_LABELS[ag]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="anim-fade-up" onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 840, width: '100%' }}>
            <CarImage brand={lightbox.car.brand} model={lightbox.car.model} year={lightbox.car.year} color={lightbox.color} angle={lightbox.angle} style={{ width: '100%', height: '100%', borderRadius: 14 }} alt={lightbox.car.model} />
            <p style={{ color: '#fff', textAlign: 'center', marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 18 }}>
              {lightbox.car.brandName} {lightbox.car.model} {lightbox.car.year} · {lightbox.color} · {ANGLE_LABELS[lightbox.angle]}
            </p>
          </div>
          <button onClick={() => setLightbox(null)} style={{ position: 'fixed', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </div>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const selectStyle = {
  width: '100%', background: 'var(--surface)',
  border: '1px solid var(--border)', borderRadius: 8,
  padding: '10px 12px', color: 'var(--text)',
  fontSize: 13, cursor: 'pointer',
};
const optionBtnStyle = {
  padding: '8px 12px', borderRadius: 8,
  textAlign: 'left', fontSize: 12,
  cursor: 'pointer', transition: 'all 0.2s',
};