/**
 * Brand-styled SVG placeholders for the РАССВЕТ home animation blocks.
 *
 * These are TEMPORARY assets meant to demonstrate the imported animation
 * mechanics. Replace the returned data-URIs with real product / editorial
 * imagery (or remote URLs) once the visual content is ready — the animation
 * components only need a `src` string, so swapping is trivial.
 */

const BG = "#121312"
const GOLD = "#a67d43"
const RED = "#ad0013"
const TEXT = "#f3ead7"

const encode = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

/** Square gallery tile with a numbered, brand-tinted gradient. */
export const tilePlaceholder = (index: number, label = `0${index}`.slice(-2)) => {
  const hue = (index * 47) % 360
  const tintA = index % 2 === 0 ? GOLD : RED
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="g${index}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="hsl(${hue} 18% 10%)"/>
    </linearGradient>
    <radialGradient id="r${index}" cx="0.5" cy="0.35" r="0.8">
      <stop offset="0" stop-color="${tintA}" stop-opacity="0.30"/>
      <stop offset="1" stop-color="${tintA}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#g${index})"/>
  <rect width="600" height="600" fill="url(#r${index})"/>
  <g stroke="${GOLD}" stroke-opacity="0.18" stroke-width="1">
    <line x1="0" y1="150" x2="600" y2="150"/>
    <line x1="0" y1="300" x2="600" y2="300"/>
    <line x1="0" y1="450" x2="600" y2="450"/>
    <line x1="150" y1="0" x2="150" y2="600"/>
    <line x1="300" y1="0" x2="300" y2="600"/>
    <line x1="450" y1="0" x2="450" y2="600"/>
  </g>
  <rect x="20" y="20" width="560" height="560" fill="none" stroke="${GOLD}" stroke-opacity="0.4"/>
  <text x="50%" y="52%" text-anchor="middle" font-family="Inter, sans-serif"
        font-size="180" font-weight="800" fill="${TEXT}" fill-opacity="0.9">${label}</text>
  <text x="50%" y="86%" text-anchor="middle" font-family="Inter, sans-serif"
        font-size="26" letter-spacing="6" fill="${GOLD}">РАССВЕТ</text>
</svg>`
  return encode(svg)
}

/** Wide editorial placeholder used for full-bleed media. */
export const widePlaceholder = (label: string, accent: "gold" | "red" = "gold") => {
  const tint = accent === "gold" ? GOLD : RED
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d0e0d"/>
      <stop offset="0.55" stop-color="${BG}"/>
      <stop offset="1" stop-color="#0b0c0b"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.15" r="0.9">
      <stop offset="0" stop-color="${tint}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${tint}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <rect width="1600" height="900" fill="url(#glow)"/>
  <g stroke="${GOLD}" stroke-opacity="0.10" stroke-width="1">
    ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="900"/>`).join("")}
  </g>
  <text x="50%" y="52%" text-anchor="middle" font-family="Inter, sans-serif"
        font-size="120" font-weight="800" fill="${TEXT}" fill-opacity="0.92">${label}</text>
</svg>`
  return encode(svg)
}

/** Tall, soft-focus layer used by the parallax (Osmo) block. */
export const parallaxLayer = (depth: 1 | 2 | 3) => {
  const opacity = depth === 1 ? 0.55 : depth === 2 ? 0.75 : 1
  const ridge =
    depth === 1
      ? "M0,640 L160,560 L360,610 L560,520 L800,600 L1000,540 L1200,610 L1440,560 L1440,1024 L0,1024 Z"
      : depth === 2
      ? "M0,760 L200,700 L420,760 L640,680 L860,760 L1080,690 L1300,760 L1440,720 L1440,1024 L0,1024 Z"
      : "M0,880 L240,820 L520,900 L760,820 L1020,900 L1280,830 L1440,890 L1440,1024 L0,1024 Z"
  const fill = depth === 3 ? "#0a0b0a" : depth === 2 ? "#101110" : "#141513"
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1024" viewBox="0 0 1440 1024" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky${depth}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="1" stop-color="${depth === 1 ? GOLD : RED}" stop-opacity="${depth === 1 ? 0.12 : 0.08}"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="1024" fill="url(#sky${depth})"/>
  <path d="${ridge}" fill="${fill}" fill-opacity="${opacity}"/>
</svg>`
  return encode(svg)
}
