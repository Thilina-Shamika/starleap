type ServicesHeadingProps = {
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

export function ServicesHeading({ 
  heading, 
  subheading, 
  description, 
  buttonText, 
  buttonLink 
}: ServicesHeadingProps) {
  return (
    <section className="py-20 px-4" style={{ fontFamily: "SF Pro Display, var(--font-geist-sans), sans-serif" }}>
      <div className="max-w-6xl mx-auto text-center">
        {subheading && (
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
            {subheading}
          </p>
        )}
        
        {heading && (
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[72px] lg:tracking-[-0.03em] mb-6">
            {heading}
          </h2>
        )}
        
        {description && (
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            {description}
          </p>
        )}
        
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium text-white bg-black hover:bg-black/80 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "SF Pro Display, var(--font-geist-sans), sans-serif" }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
