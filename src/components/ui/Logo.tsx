import Link from "next/link";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  wordmarkClassName?: string;
  linkTo?: string;
}

export const Logo = ({
  className = "",
  iconOnly = false,
  wordmarkClassName = "text-xl font-bold text-blue-600 dark:text-blue-400",
  linkTo = "/",
}: LogoProps) => {
  return (
    <Link
      href={linkTo}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        <path
          d="M6 17h4l2.5-7 4 14 2.5-9h7"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {!iconOnly && <span className={wordmarkClassName}>UptimeHero</span>}
    </Link>
  );
};
