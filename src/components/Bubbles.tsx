export function Bubbles() {
  const bubbles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((_, i) => {
        const size = 8 + Math.random() * 28;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = -Math.random() * 12;
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full border border-white/40 bg-white/10 backdrop-blur-[1px]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              animation: `bubble-rise ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function Wave({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden ${className}`}>
      <svg
        className="animate-wave h-full"
        style={{ width: "200%" }}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 C1680,120 1920,0 2160,60 C2400,120 2640,0 2880,60 L2880,120 L0,120 Z"
          fill="oklch(0.99 0.008 240)"
          opacity="0.9"
        />
        <path
          d="M0,80 C240,20 480,140 720,80 C960,20 1200,140 1440,80 C1680,20 1920,140 2160,80 C2400,20 2640,140 2880,80 L2880,120 L0,120 Z"
          fill="oklch(0.99 0.008 240)"
        />
      </svg>
    </div>
  );
}
