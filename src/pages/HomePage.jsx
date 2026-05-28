import BrandSwiper from '../components/BrandSwiper';
import OfferCard from '../components/OfferCard';
import { OFFERS } from '../data';

/**
 * HomePage — hero section, brand swiper, offers strip.
 */
export default function HomePage({ go, onCarClick, addCart, toggleFav, isFav, dark }) {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          height: '88vh',
          minHeight: 520,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // zIndex: -2,
          }}
        >
          <source src="../../image/Mercedes AMG GT Black Series Cinematic _ 4K-1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: -1,
          }}
        />

        {/* Hero text */}
        <div
          className="anim-fade-up"
          style={{ position: 'relative', textAlign: 'center', padding: '0 16px' }}
        >
          <p style={{ color: '#ffaa00', fontSize: 11, letterSpacing: 6, marginBottom: 12, opacity: 0.7, fontWeight: 500 }}>
            WELCOME TO
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1,
            marginBottom: 10,
            textShadow: '0 0 100px rgba(192,160,96,0.4)',
          }}>
            THE SIGHT
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.9rem, 3vw, 1.5rem)',
            color: '#ffaa00',
            letterSpacing: 6,
            marginBottom: 22,
            fontWeight: 400,
          }}>
            AUTOMOTIVE
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.52)',
            fontSize: 'clamp(13px, 2vw, 15px)',
            maxWidth: 440,
            margin: '0 auto 36px',
            lineHeight: 1.9,
          }}>
            The world's finest automotive brands, all in one place.<br />
            Discover a driving experience unlike any other.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="shine"
              onClick={() => go('cars')}
              style={{
                background: 'linear-gradient(135deg, var(--gold), var(--gold-l))',
                border: 'none', color: '#000',
                padding: '12px 32px', borderRadius: 28,
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Explore Cars
            </button>
            <button
              onClick={() => go('offers')}
              style={{
                background: 'transparent',
                border: '2px solid rgba(192,160,96,0.5)',
                color: 'var(--gold)',
                padding: '12px 32px', borderRadius: 28,
                fontSize: 14, cursor: 'pointer',
              }}
            >
              Current Offers
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="anim-float"
          style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)' }}
        >
          <div style={{
            width: 1, height: 40,
            background: 'linear-gradient(to bottom, var(--gold), transparent)',
            margin: '0 auto',
          }} />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ background: dark ? '#0B0B14' : '#EDE9E0', padding: '26px 20px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 14, textAlign: 'center',
        }}>
          {[
            { n: '300+', l: 'Models'        },
            { n: '10',   l: 'Brands'        },
            { n: '5',    l: 'Showrooms'     },
            { n: '20+',  l: 'Years'         },
            { n: '50K+', l: 'Happy Clients' },
          ].map((s) => (
            <div key={s.l} className="anim-fade-up">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 5vw, 32px)', color: 'var(--gold)', fontWeight: 700 }}>
                {s.n}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BRAND SWIPERS ── */}
      <div className="section" style={{ paddingTop: 52, paddingBottom: 20 , }}>
        <div style={{ textAlign: 'center', marginBottom: 34 }}>
          <p className="label-xs text-gold" style={{ marginBottom: 6 }}>ALL BRANDS</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'var(--text)', fontWeight: 600 }}>
            Explore the Latest Models
          </h2>
        </div>

        <BrandSwiper
          onCarClick={onCarClick}
          addCart={addCart}
          toggleFav={toggleFav}
          isFav={isFav}
          onViewAll={(brandId) => go('cars')}
        />
      </div>

      {/* ── OFFERS STRIP ── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(192,160,96,0.06), transparent)',
        padding: '52px 20px',
        marginTop: 40,
        
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <p className="label-xs text-gold" style={{ marginBottom: 6 }}>LIMITED TIME</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
            color: 'var(--text)', fontWeight: 600, marginBottom: 28,
          }}>
            Special Offers
          </h2>
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}>
            {OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} addCart={addCart} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
