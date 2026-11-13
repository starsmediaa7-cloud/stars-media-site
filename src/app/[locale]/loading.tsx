export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center" role="status" aria-label="Loading">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <circle cx="28" cy="28" r="24" stroke="rgb(255 255 255 / 0.14)" strokeWidth="1.5" />
        <path
          className="loader-ring"
          d="M28 4a24 24 0 0 1 24 24"
          stroke="#f4f6f8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="28" cy="28" r="1.75" fill="#f4f6f8" />
      </svg>
    </div>
  );
}
