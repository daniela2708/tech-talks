import { assetUrl } from "@/lib/assets";

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
      ? assetUrl("brand/logo-ai-at-work-dark.png")
      : assetUrl("brand/logo-ai-at-work-color.svg");

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <img
        src={assetUrl("brand/logo-wizeline.svg")}
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
