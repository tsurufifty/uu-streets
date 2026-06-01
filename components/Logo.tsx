import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
}

export function Logo({ className, size = 44, withText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/logo.png"
          alt="БГСХА"
          fill
          sizes={`${size}px`}
          className="object-contain"
          priority
        />
      </div>
      {withText && (
        <div className="leading-none">
          <div className="font-display text-lg uppercase tracking-wider">UU-Streets</div>
        </div>
      )}
    </div>
  );
}
