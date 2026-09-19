import NexaLogo from './NexaLogo';

// Purely decorative brand mark behind the auth form — never interactive,
// never announced to assistive tech, and always beneath the form content.
const AuthWatermark = ({ className = '' }: { className?: string }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <NexaLogo
        alt=""
        className="animate-[watermark-in_900ms_ease-out_forwards] whitespace-nowrap opacity-0"
        style={{ fontSize: 'clamp(4.5rem, 18vw, 15rem)' }}
      />
    </div>
  );
};

export default AuthWatermark;
