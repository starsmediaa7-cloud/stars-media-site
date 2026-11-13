import Image from "next/image";

/** Official Stars Media mark (white on transparent), never redrawn. */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/brand/stars-media-mark.png"
      alt=""
      width={630}
      height={640}
      sizes={`${size}px`}
      style={{ width: size, height: "auto" }}
    />
  );
}
