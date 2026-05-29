interface StarDisplayProps {
  rating: number;
  size?: "md" | "lg";
  className?: string;
}

export function StarDisplay({
  rating,
  size = "md",
  className = "",
}: StarDisplayProps) {
  const sizeClass =
    size === "lg"
      ? "text-3xl leading-none tracking-wide md:text-4xl"
      : "text-xl leading-none tracking-wide";

  const stars = [1, 2, 3, 4, 5].map((star) => {
    if (rating >= star) return "full";
    if (rating >= star - 0.5) return "half";
    return "empty";
  });

  return (
    <div
      className={`flex items-center gap-0.5 text-clay ${sizeClass} ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars.map((type, i) => (
        <span key={i} className={type === "empty" ? "text-charcoal/20" : ""}>
          {type === "half" ? "★" : type === "full" ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
