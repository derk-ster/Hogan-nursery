const items = [
  "Friendly Staff",
  "Patient Help",
  "Healthy Plants",
  "Special Orders",
  "Good Prices",
];

export function TrustBar() {
  return (
    <div className="border-y border-brown/15 bg-sand py-4">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm font-medium text-charcoal/85 md:gap-x-10">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
