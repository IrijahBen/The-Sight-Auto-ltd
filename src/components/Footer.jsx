/**
 * Footer — site-wide footer with columns and credit line.
 */
export default function Footer({ go }) {
  const columns = [
    {
      title: 'Quick Links',
      items: [
        { label: 'Home',       id: 'home'      },
        { label: 'Cars',       id: 'cars'      },
        { label: 'Offers',     id: 'offers'    },
        { label: 'Showrooms',  id: 'branches'  },
      ],
    },
    {
      title: 'Services',
      items: [
        { label: 'Test Drive'   },
        { label: 'Financing'    },
        { label: 'Maintenance'  },
        { label: 'Insurance'    },
      ],
    },
    {
      title: 'Contact',
      items: [
        { label: '01000000000'       },
        { label: 'info@elsonny.com'  },
        { label: 'elsonny.com'       },
      ],
    },
  ];

  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '40px 20px 22px',
      
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 28, marginBottom: 28,
        }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)', marginBottom: 8 }}>
              ELSONNY
            </div>
            <p style={{ fontSize: 11, lineHeight: 1.9, color: 'var(--text-muted)' }}>
              Premium automotive showroom.<br />
              The world's finest cars<br />
              in Egypt since 2005.
            </p>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 style={{ color: 'var(--gold)', fontWeight: 600, marginBottom: 10, fontSize: 12, letterSpacing: 1 }}>
                {col.title.toUpperCase()}
              </h4>
              {col.items.map((item) => (
                <div key={item.label} style={{ marginBottom: 5 }}>
                  {item.id ? (
                    <button
                      onClick={() => go(item.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--text-muted)', fontSize: 12, padding: 0,
                        textAlign: 'left', transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 18,
          textAlign: 'center', fontSize: 10, color: 'var(--text-muted)',
        }}>
          © 2025 Elsonny Automotive — All rights reserved &nbsp;|&nbsp;
          Car imagery powered by <span style={{ color: 'var(--gold)' }}>IMAGIN.studio</span>
        </div>
      </div>
    </footer>
  );
}
