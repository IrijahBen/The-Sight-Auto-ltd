import { useState } from 'react';

const NAV_LINKS = [
  { id: 'home',      label: 'Home'         },
  { id: 'cars',      label: 'Cars'         },
  { id: 'offers',    label: 'Offers'       },
  { id: 'configure', label: 'Build Your Car'},
  { id: 'branches',  label: 'Showrooms'    },
  { id: 'events',    label: 'Events'       },
  { id: 'gallery',   label: 'Gallery'      },
  { id: 'news',      label: 'News'         },
  { id: 'faq',       label: 'Help'         },
];

/**
 * Navbar — fixed top navigation bar.
 * Fully responsive: collapses to hamburger on mobile.
 *
 * Props:
 *  page       {string}   current page id
 *  user       {object}   logged-in user or null
 *  dark       {boolean}
 *  cartCount  {number}
 *  go         {fn}       (pageId) => void
 *  toggleTheme{fn}
 *  openCart   {fn}
 *  onSignOut  {fn}
 */
export default function Navbar({ page, user, dark, cartCount, go, toggleTheme, openCart, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const userLinks = user
    ? [{ id: 'favorites', label: 'Wishlist' }, { id: 'profile', label: 'My Account' }]
    : [{ id: 'auth', label: 'Sign In' }];

  const allLinks = [...NAV_LINKS, ...userLinks];

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.inner}>
          {/* Logo */}
          <button onClick={() => go('home')} style={styles.logo} aria-label="Go to homepage">
            <span style={styles.logoText}>THE SIGHT</span>
            <span  className='subsub' style={styles.logoSub}>AUTO</span>
          </button>

          {/* Desktop links */}
          <div style={styles.desktopLinks} className="no-scrollbar">
            {NAV_LINKS.slice(0, 7).map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                style={{
                  ...styles.navBtn,
                  background: page === link.id ? 'rgba(192,160,96,0.18)' : 'none',
                  color: page === link.id ? 'var(--gold)' : 'var(--text-muted)',
                  fontWeight: page === link.id ? 600 : 400,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={styles.controls}>
            {/* Theme toggle */}
            <button onClick={toggleTheme} title="Toggle theme" style={styles.iconBtn} aria-label="Toggle theme">
              {dark ? '☀' : '🌙'}
            </button>

            {/* Cart */}
            <button onClick={openCart} title="Open cart" style={{ ...styles.iconBtn, position: 'relative' }} aria-label={`Cart (${cartCount} items)`}>
              🛒
              {cartCount > 0 && (
                <span style={styles.badge}>{cartCount}</span>
              )}
            </button>

            {/* User */}
            {user ? (
              <button onClick={() => go('profile')} style={styles.userBtn}>
                {user.name.split(' ')[0]} ▾
              </button>
            ) : (
              <button className="shine" onClick={() => go('auth')} style={styles.signInBtn}>
                Sign In
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={styles.iconBtn}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile/Full slide menu ── */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          style={styles.menuOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            className="anim-slide-in"
            style={styles.menuPanel}
          >
            <div style={styles.menuHeader}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--gold)' }}>
                Navigation
              </span>
              <button onClick={closeMenu} style={styles.menuClose} aria-label="Close menu">✕</button>
            </div>

            {allLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { go(link.id); closeMenu(); }}
                style={{
                  ...styles.menuLink,
                  background: page === link.id ? 'rgba(192,160,96,0.18)' : 'none',
                  color: page === link.id ? 'var(--gold)' : 'var(--text)',
                  fontWeight: page === link.id ? 600 : 400,
                }}
              >
                {link.label}
              </button>
            ))}

            {user && (
              <button
                onClick={() => { onSignOut(); closeMenu(); }}
                style={{ ...styles.menuLink, color: '#f44', marginTop: 12 }}
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
}


const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(var(--nav-bg, 8,8,15), 0.93)',
    backdropFilter: 'blur(22px)',
    borderBottom: '1px solid var(--border)',
    height: 60,
  },
  inner: {
    maxWidth: 1400, margin: '0 auto', padding: '0 16px',
    height: '100%', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 12,
  },
  logo: {
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(16px, 3vw, 22px)',
    fontWeight: 700, color: 'var(--gold)', letterSpacing: 2,
  },
  desktopLinks: {
    display: 'flex', gap: 2, alignItems: 'center',
    overflowX: 'auto', flex: 1,
  },
  navBtn: {
    flexShrink: 0, border: 'none', cursor: 'pointer',
    padding: '5px 11px', borderRadius: 6,
    fontSize: 12, transition: 'all 0.2s',
  },
  controls: {
    display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0,
  },
  iconBtn: {
    background: 'none', border: '1px solid var(--border)',
    color: 'var(--text)', width: 32, height: 32,
    borderRadius: '50%', fontSize: 14, display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
  badge: {
    position: 'absolute', top: -4, right: -4,
    background: 'var(--gold)', color: '#000',
    fontSize: 9, width: 16, height: 16, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700,
  },
  userBtn: {
    background: 'rgba(192,160,96,0.18)',
    border: '1px solid var(--gold)',
    color: 'var(--gold)', padding: '5px 13px',
    borderRadius: 18, fontSize: 12, fontWeight: 600, cursor: 'pointer',
  },
  signInBtn: {
    background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
    border: 'none', color: '#000', padding: '6px 16px',
    borderRadius: 18, fontSize: 12, fontWeight: 700, cursor: 'pointer',
  },
  menuOverlay: {
    position: 'fixed', inset: 0, zIndex: 2000,
    background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(12px)',
  },
  menuPanel: {
    position: 'absolute', right: 0, top: 0, bottom: 0,
    width: 268, background: 'var(--surface)',
    borderLeft: '1px solid var(--border)',
    padding: 22, overflowY: 'auto',
  },
  menuHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 26,
  },
  menuClose: {
    background: 'none', border: 'none',
    color: 'var(--text)', fontSize: 20, cursor: 'pointer',
  },
  menuLink: {
    display: 'block', width: '100%', border: 'none', cursor: 'pointer',
    padding: '12px 14px', borderRadius: 9, fontSize: 14,
    textAlign: 'left', marginBottom: 3, transition: 'background 0.2s',
  },
};
