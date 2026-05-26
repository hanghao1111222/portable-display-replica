export function TrustStars({ rating, size = 24 }: { rating: number; size?: number }) {
  // Trustpilot-style: green squares with white star, last square partially filled if fractional.
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i));
    return fill;
  });
  return (
    <div className="flex gap-1">
      {stars.map((fill, i) => (
        <div
          key={i}
          className="relative shrink-0 overflow-hidden"
          style={{ width: size, height: size }}
        >
          <div className="absolute inset-0 bg-[#dcdce6]" />
          <div
            className="absolute inset-y-0 left-0 bg-[#00b67a]"
            style={{ width: `${fill * 100}%` }}
          />
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 w-full h-full p-[3px] text-white"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="12,2.5 14.9,9 22,9.7 16.5,14.4 18.2,21.5 12,17.8 5.8,21.5 7.5,14.4 2,9.7 9.1,9" />
          </svg>
        </div>
      ))}
    </div>
  );
}
