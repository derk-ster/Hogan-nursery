interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-6 text-center">
      {id && <span className="sr-only" id={`${id}-label`} />}
      <h2
        id={id}
        className="font-display text-2xl font-semibold text-charcoal md:text-3xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-base text-charcoal/75">
          {subtitle}
        </p>
      )}
    </div>
  );
}
