import { useState } from 'react';
import CarCard from '../components/CarCard';
import CarImage from '../components/CarImage';
import Stars from '../components/Stars';
import { NEWS, FAQS, GOVERNORATES, ALL_CARS } from '../data';
import { ls, formatPrice } from '../utils';

// ─── NEWS PAGE ────────────────────────────────────────────────────────────────
export function NewsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="section">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>LATEST</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>News & Updates</h1>
      </div>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))' }}>
        {NEWS.map((item, i) => {
          const car = ALL_CARS.find((c) => c.brand === item.brand && c.model === item.model)
            || ALL_CARS.find((c) => c.brand === item.brand);
          return (
            <article
              key={item.id}
              className="card-hover shine anim-fade-up"
              onClick={() => setSelected(item)}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: 160, background: '#0d0d1a', position: 'relative', flexShrink: 0 }}>
                {car && <CarImage brand={car.brand} model={car.model} year={car.year} color={car.color} angle="29" style={{ width: '100%', height: 160 }} alt={item.title} />}
                <span style={{ position: 'absolute', top: 9, left: 9, background: 'var(--gold)', color: '#000', fontSize: 9, padding: '2px 8px', borderRadius: 16, fontWeight: 700 }}>
                  {item.category.toUpperCase()}
                </span>
              </div>
              <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>{item.date}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)', marginBottom: 8, lineHeight: 1.5, fontWeight: 500 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.7 }}>{item.desc.slice(0, 90)}…</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (() => {
        const car = ALL_CARS.find((c) => c.brand === selected.brand && c.model === selected.model)
          || ALL_CARS.find((c) => c.brand === selected.brand);
        return (
          <div className="anim-fade-up" onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: 16, maxWidth: 660, width: '100%', overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
              {car && <CarImage brand={car.brand} model={car.model} year={car.year} color={car.color} angle="29" style={{ width: '100%', height: 240 }} alt={selected.title} />}
              <div style={{ padding: 26 }}>
                <p style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: 3, marginBottom: 7 }}>{selected.category.toUpperCase()} · {selected.date}</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4, fontWeight: 600 }}>{selected.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.9 }}>{selected.desc}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', fontSize: 16, cursor: 'pointer' }}>✕</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────────────────────
export function FaqPage() {
  const [open, setOpen]     = useState(null);
  const [search, setSearch] = useState('');
  const filtered = FAQS.filter((f) =>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section" style={{ maxWidth: 760 }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>SUPPORT</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>Help Center</h1>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search FAQs…"
        style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', color: 'var(--text)', fontSize: 13, marginBottom: 28 }}
      />

      {filtered.map((faq, i) => (
        <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${open === i ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 12, marginBottom: 9, overflow: 'hidden', transition: 'border-color 0.2s' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', background: 'none', border: 'none', padding: '15px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ color: open === i ? 'var(--gold)' : 'var(--text)', fontWeight: open === i ? 600 : 400, fontSize: 14 }}>{faq.q}</span>
            <span style={{ color: 'var(--gold)', fontSize: 18, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
          </button>
          {open === i && (
            <div className="anim-fade-up" style={{ padding: '0 18px 16px', color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8 }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── FAVORITES PAGE ───────────────────────────────────────────────────────────
export function FavoritesPage({ favs, toggleFav, addCart, onCarClick }) {
  return (
    <div className="section">
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="label-xs text-gold" style={{ marginBottom: 6 }}>MY LIST</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--text)', fontWeight: 600 }}>Wishlist</h1>
      </div>
      {favs.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '65px 0', fontSize: 14 }}>
          <div style={{ fontSize: 50, marginBottom: 14 }}>♡</div>
          No cars saved yet — browse and tap ♡ to save.
        </div>
      ) : (
        <div className="grid-cards">
          {favs.map((car) => (
            <CarCard key={car.id} car={car} onCarClick={onCarClick} addCart={addCart} toggleFav={toggleFav} isFav={() => true} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
export function ProfilePage({ user, setUser, cart, favs, comments, go }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name, email: user?.email, gov: user?.gov || '' });

  const myCmts = Object.values(comments).flat().filter((c) => c.user === user?.name);

  const saveProfile = () => {
    const updated = { ...user, ...form };
    setUser(updated);
    ls.set('eu', updated);
    setEditMode(false);
  };

  return (
    <div className="section" style={{ maxWidth: 820 }}>
      {/* Avatar + name */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ width: 68, height: 68, background: 'linear-gradient(135deg, var(--gold), var(--gold-l))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 14px' }}>
          👤
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text)', fontWeight: 600 }}>{user?.name}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>{user?.email}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { n: favs.length,   l: 'Wishlist', icon: '♥', nav: 'favorites' },
          { n: cart.length,   l: 'In Cart',  icon: '🛒' },
          { n: myCmts.length, l: 'Reviews',  icon: '💬' },
        ].map((s) => (
          <div
            key={s.l}
            onClick={() => s.nav && go(s.nav)}
            className={s.nav ? 'card-hover' : ''}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 13, padding: 20, textAlign: 'center', cursor: s.nav ? 'pointer' : 'default' }}
          >
            <div style={{ fontSize: 24, marginBottom: 5 }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold)' }}>{s.n}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text)' }}>Account Details</h2>
          <button
            onClick={() => editMode ? saveProfile() : setEditMode(true)}
            style={{ background: editMode ? 'linear-gradient(135deg,var(--gold),var(--gold-l))' : 'none', border: '1px solid var(--gold)', color: editMode ? '#000' : 'var(--gold)', padding: '6px 16px', borderRadius: 16, fontSize: 12, cursor: 'pointer' }}
          >
            {editMode ? 'Save' : 'Edit'}
          </button>
        </div>

        {[{ l: 'Full Name', k: 'name', t: 'text' }, { l: 'Email', k: 'email', t: 'email' }].map((f) => (
          <div key={f.k} style={{ marginBottom: 14 }}>
            <p className="label-xs text-muted" style={{ marginBottom: 5 }}>{f.l.toUpperCase()}</p>
            {editMode
              ? <input type={f.t} value={form[f.k]} onChange={(e) => setForm((p) => ({ ...p, [f.k]: e.target.value }))} style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 7, padding: '9px 11px', color: 'var(--text)', fontSize: 13 }} />
              : <p style={{ fontSize: 13, color: 'var(--text)' }}>{user[f.k]}</p>
            }
          </div>
        ))}

        <div>
          <p className="label-xs text-muted" style={{ marginBottom: 5 }}>GOVERNORATE</p>
          {editMode
            ? <select value={form.gov} onChange={(e) => setForm((p) => ({ ...p, gov: e.target.value }))} style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 7, padding: '9px 11px', color: 'var(--text)', fontSize: 13, cursor: 'pointer' }}>
                {GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            : <p style={{ fontSize: 13, color: 'var(--text)' }}>{user.gov || '—'}</p>
          }
        </div>
      </div>
    </div>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
export function AuthPage({ mode, setMode, onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', gov: '' });
  const [error, setError] = useState('');

  const submit = () => {
    setError('');
    if (mode === 'register') {
      if (!form.name || !form.email || !form.password || !form.gov) return setError('All fields are required.');
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');
      const users = ls.get('eu_list', []);
      if (users.find((u) => u.email === form.email)) return setError('Email already registered.');
      const user = { name: form.name, email: form.email, password: form.password, gov: form.gov };
      ls.set('eu_list', [...users, user]);
      onLogin(user);
    } else {
      const users = ls.get('eu_list', []);
      const user = users.find((u) => u.email === form.email && u.password === form.password);
      if (!user) return setError('Incorrect email or password.');
      onLogin(user);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 16px' }}>
      <div className="anim-scale-in" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 'clamp(24px, 5vw, 40px)', width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold)', letterSpacing: 2, marginBottom: 4 }}>ELSONNY</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text)', fontWeight: 500 }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
        </div>

        {/* Fields */}
        {mode === 'register' && (
          <Field label="FULL NAME" type="text" placeholder="John Smith" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} />
        )}
        <Field label="EMAIL" type="email" placeholder="you@email.com" value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} />
        <Field label="PASSWORD" type="password" placeholder="••••••••" value={form.password} onChange={(v) => setForm((p) => ({ ...p, password: v }))} onEnter={submit} />
        {mode === 'register' && (
          <div style={{ marginBottom: 14 }}>
            <p className="label-xs text-muted" style={{ marginBottom: 5 }}>GOVERNORATE <span style={{ color: 'var(--gold)' }}>*</span></p>
            <select value={form.gov} onChange={(e) => setForm((p) => ({ ...p, gov: e.target.value }))} style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 9, padding: '11px 13px', color: form.gov ? 'var(--text)' : 'var(--text-muted)', fontSize: 13, cursor: 'pointer' }}>
              <option value="">Select your governorate</option>
              {GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: '#2B0D0D', border: '1px solid #f44', color: '#f88', padding: '9px 13px', borderRadius: 8, fontSize: 12, marginBottom: 14 }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          className="shine"
          onClick={submit}
          style={{ width: '100%', background: 'linear-gradient(135deg, var(--gold), var(--gold-l))', border: 'none', color: '#000', padding: '13px', borderRadius: 11, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 14 }}
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}

// Small reusable text field for AuthPage
function Field({ label, type, placeholder, value, onChange, onEnter }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p className="label-xs text-muted" style={{ marginBottom: 5 }}>{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}
        style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 9, padding: '11px 13px', color: 'var(--text)', fontSize: 13 }}
      />
    </div>
  );
}
