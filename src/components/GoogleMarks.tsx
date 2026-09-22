// Google brand marks used by the review widgets: full-colour G, wordmark and star row.
const STAR_PATH = 'M12 2.6l2.83 5.9 6.42.9-4.66 4.62 1.13 6.55L12 17.5l-5.72 3.07 1.13-6.55L2.75 9.4l6.42-.9L12 2.6Z'
const GOLD = '#fbbc04'
const EMPTY = '#dadce0'

export function GoogleG({ size = 20 }: { size?: number }) {
  return <svg className="google-g" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path fill="#4285f4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z" />
    <path fill="#34a853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46Z" />
    <path fill="#fbbc05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7Z" />
    <path fill="#ea4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07Z" />
  </svg>
}

export function GoogleWordmark() {
  return <span className="google-wordmark" role="img" aria-label="Google">
    <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
  </span>
}

export function GoogleStars({ value = 5, size = 17 }: { value?: number; size?: number }) {
  const whole = Math.floor(value)
  const partial = value - whole
  const gradientId = `star-fill-${String(value).replace('.', '-')}`
  return <span className="g-stars" role="img" aria-label={`Rated ${value} out of 5`}>
    {partial > 0 && <svg width="0" height="0" aria-hidden="true" focusable="false"><defs><linearGradient id={gradientId}><stop offset={`${partial * 100}%`} stopColor={GOLD} /><stop offset={`${partial * 100}%`} stopColor={EMPTY} /></linearGradient></defs></svg>}
    {[0, 1, 2, 3, 4].map(index => <svg key={index} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={STAR_PATH} fill={index < whole ? GOLD : index === whole && partial > 0 ? `url(#${gradientId})` : EMPTY} />
    </svg>)}
  </span>
}
