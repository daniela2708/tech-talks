type BrandLockupProps = {
  theme?: "light" | "dark";
  className?: string;
  wizelineClassName?: string;
  aiClassName?: string;
};

export function BrandLockup({
  theme = "light",
  className = "",
  wizelineClassName = "h-9 w-auto",
  aiClassName = "h-9 w-auto",
}: BrandLockupProps) {
  const aiLogoSrc =
    theme === "dark"
      ? "/Logo_AI_at_Work-02.png"
      : "/Logo_AI_at_Work_color.svg";

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <img
        src="/wizelinered.svg"
        alt="Wizeline"
        className={wizelineClassName}
      />
      <img
        src={aiLogoSrc}
        alt="AI at Work"
        className={aiClassName}
      />
    </div>
  );
}
