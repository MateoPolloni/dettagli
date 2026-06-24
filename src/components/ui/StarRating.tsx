export default function StarRating({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < rating ? '#c9a24c' : 'none'}
          stroke={i < rating ? '#c9a24c' : '#3a3a40'}
          strokeWidth="1.25"
        >
          <path d="M12 2.5l2.95 6.46 7.05.7-5.3 4.78 1.55 6.96L12 17.97l-6.25 3.43 1.55-6.96-5.3-4.78 7.05-.7L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}
