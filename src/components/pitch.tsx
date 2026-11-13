/** Pitch geometry used as the site's graphic motif. */

/**
 * The centre circle seen from the stands: a thin metal ring.
 * `part="front"` draws only the near half so it can pass in front of a photo.
 */
export function HeroRing({
  part = "back",
  className = "",
}: {
  part?: "back" | "front";
  className?: string;
}) {
  const id = `ring-${part}`;
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0c0d10" />
          <stop offset="0.45" stopColor="#3a3f47" />
          <stop offset="0.62" stopColor="#15171b" />
          <stop offset="1" stopColor="#050506" />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="0.8" stopColor="#d7e6f7" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-near`}>
          <rect x="0" y="500" width="1000" height="500" />
        </clipPath>
      </defs>
      <g transform="rotate(-21 500 500)">
        <g clipPath={part === "front" ? `url(#${id}-near)` : undefined}>
          <ellipse
            cx="500"
            cy="500"
            rx="440"
            ry="150"
            fill="none"
            stroke={`url(#${id}-metal)`}
            strokeWidth="15"
            pathLength={1}
            className="ring-draw"
          />
          <ellipse
            cx="500"
            cy="497"
            rx="440"
            ry="150"
            fill="none"
            stroke={`url(#${id}-light)`}
            strokeWidth="1.6"
            pathLength={1}
            className="ring-draw"
          />
        </g>
      </g>
    </svg>
  );
}

/** Corner arc, as painted at each corner flag. */
export function CornerArc({
  corner,
  className = "",
}: {
  corner: "bl" | "br" | "tl" | "tr";
  className?: string;
}) {
  const rotate = { bl: 0, br: -90, tr: 180, tl: 90 }[corner];
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 0 A100 100 0 0 1 100 100"
        fill="none"
        stroke="rgb(255 255 255 / 0.22)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
