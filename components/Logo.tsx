interface LogoProps {
  className?: string;
  variant?: "white" | "green";
}

export default function Logo({ className = "", variant = "white" }: LogoProps) {
  const fillColor = variant === "green" ? "#1F6F54" : "#F2F3F5";

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Geometric AP monogram - minimal and modern */}

      {/* Letter A - formed by geometric shapes */}
      <path
        d="M8 32 L8 28 L14 8 L18 8 L24 28 L24 32 L20 32 L20 26 L12 26 L12 32 L8 32 Z M13 22 L19 22 L16 12 L13 22 Z"
        fill={fillColor}
      />

      {/* Letter P - clean geometric design */}
      <path
        d="M26 32 L26 8 L34 8 C35.6569 8 37 9.34315 37 11 L37 15 C37 16.6569 35.6569 18 34 18 L30 18 L30 32 L26 32 Z M30 12 L30 14 L33 14 L33 12 L30 12 Z"
        fill={fillColor}
      />

      {/* Connecting element - subtle geometric accent */}
      <rect x="3" y="3" width="34" height="34" stroke={fillColor} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}
