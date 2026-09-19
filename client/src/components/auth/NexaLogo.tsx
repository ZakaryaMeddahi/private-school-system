import type { CSSProperties } from 'react';

// TODO: swap this wordmark for the official NEXA logo asset once it is provided,
// e.g. `<img src="/nexa-logo.svg" alt={alt} className={className} />`.
// Keeping every logo placement wired through this single component means that
// swap only needs to happen here.
const NexaLogo = ({
  className = '',
  alt = 'NEXA',
  style,
}: {
  className?: string;
  alt?: string;
  style?: CSSProperties;
}) => {
  return (
    <span
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      style={style}
      className={`font-bold tracking-tight text-[#4338CA] select-none ${className}`}
    >
      NEXA
    </span>
  );
};

export default NexaLogo;
