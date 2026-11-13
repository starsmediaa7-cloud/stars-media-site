import type { CSSProperties, ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";

/**
 * A studio photograph treated as a light source: black and white, cool
 * tone, multiplied over a floodlight gradient. With `color`, the original
 * colour returns on hover or focus.
 */
export function LitPhoto({
  src,
  alt,
  sizes,
  className = "",
  frame = "inset-0",
  imageClassName = "",
  color = false,
  preload = false,
  focus = "50% 20%",
  lightFrom,
  children,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  /** where the photograph sits inside the lit surface */
  frame?: string;
  imageClassName?: string;
  color?: boolean;
  preload?: boolean;
  focus?: string;
  /** horizontal position of the light, e.g. "18%" (default: upper right) */
  lightFrom?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`lit ${color ? "lit-color" : ""} ${className}`}
      style={lightFrom ? ({ "--lit-x": lightFrom } as CSSProperties) : undefined}
    >
      <div className={`absolute ${frame}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className={`object-cover ${imageClassName}`}
          style={{ objectPosition: focus }}
        />
      </div>
      {children}
    </div>
  );
}
