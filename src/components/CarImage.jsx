import React, { useState, useEffect, useRef } from 'react';
import { getCarImageFallbacks, getPlaceholderUrl } from "../utils";

/**
 * CarImage — lazy-loads a car image from imagin.studio CDN.
 *
 * MULTI-TIER FALLBACK — handles HTTP 500 from imagin.studio gracefully:
 *   Tier 0: full request (make + model + year + paint + angle)
 *   Tier 1: no paintDescription
 *   Tier 2: no year + no paint
 *   Tier 3: no year + no paint + angle forced to "23"
 *   Final:  placeholder
 *
 * Props:
 *   brand     {string}
 *   model     {string}
 *   year      {number}
 *   color     {string}
 *   angle     {string}
 *   style     {object}
 *   alt       {string}
 *   className {string}
 *   mode      {"default" | "lightbox"}  // NEW prop
 */
function CarImage({
  brand,
  model,
  year      = 2024,
  color     = 'Obsidian Black',
  angle     = '23',
  style     = {},
  alt       = '',
  className = '',
  mode      = 'default',   // الافتراضي
}) {
  const [tier,   setTier]   = useState(0);
  const [loaded, setLoaded] = useState(false);
  const tierRef = useRef(0);

  const fallbacks   = getCarImageFallbacks(brand, model, year, color, angle);
  const placeholder = getPlaceholderUrl(model, brand);

  useEffect(() => {
    tierRef.current = 0;
    setTier(0);
    setLoaded(false);
  }, [brand, model, year, color, angle]);

  const currentSrc = tier < fallbacks.length ? fallbacks[tier] : placeholder;

  const handleLoad = () => setLoaded(true);
  const handleError = () => {
    const next = tierRef.current + 1;
    tierRef.current = next;
    if (next <= fallbacks.length) {
      setTier(next);
    } else {
      setLoaded(true);
    }
  };

  // Styles
  const baseStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto',
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
    borderRadius: '12px',
    backgroundColor: '#0d0d1a',
  };

  const lightboxStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  return (
    <div
      className={`car-image-wrapper${className ? ` ${className}` : ''}`}
      style={{
        position:   'relative',
        background: '#0d0d1a',
        overflow:   'hidden',
        ...style,
      }}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            8,
          }}
        >
          <div
            style={{
              width:       32,
              height:      32,
              border:      '2px solid rgba(192,160,96,0.15)',
              borderTop:   '2px solid #C0A060',
              borderRadius:'50%',
              animation:   'spin 0.9s linear infinite',
              flexShrink:  0,
            }}
          />
          <span
            style={{
              color:        'rgba(192,160,96,0.35)',
              fontSize:     10,
              whiteSpace:   'nowrap',
              overflow:     'hidden',
              textOverflow: 'ellipsis',
              maxWidth:     '80%',
            }}
          >
            {model || brand}
          </span>
        </div>
      )}

      <img
        src={currentSrc}
        alt={alt || `${brand} ${model}`}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={mode === 'lightbox' ? { ...lightboxStyle, ...style } : { ...baseStyle, ...style }}
      />
    </div>
  );
}


export default React.memo(CarImage);
