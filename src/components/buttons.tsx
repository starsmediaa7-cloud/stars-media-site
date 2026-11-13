import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type LinkProps = ComponentProps<typeof Link>;

/** Glass button: the main action on a screen. */
export function GlassLink({ className = "", children, ...props }: LinkProps) {
  return (
    <Link data-glass className={`btn btn-glass glass ${className}`} {...props}>
      <span className="relative">{children}</span>
    </Link>
  );
}

/** Interrupted-frame button: the secondary action. */
export function FrameLink({ className = "", children, ...props }: LinkProps) {
  return (
    <Link className={`btn btn-frame ${className}`} {...props}>
      {children}
    </Link>
  );
}
