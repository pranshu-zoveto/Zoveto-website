import { cn } from "@/lib/utils";

type ZovetoIconSvgProps = {
  className?: string;
  title?: string;
};

/**
 * Vector Zoveto mark — scales crisply at any size (no raster).
 * Default: dark tile + light glyph (navbar, hero, footer on light).
 */
export function ZovetoIconSvg({ className, title = "Zoveto" }: ZovetoIconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      role="img"
      aria-label={title}
      className={cn("size-full shrink-0 [shape-rendering:geometricPrecision]", className)}
    >
      <title>{title}</title>
      <rect width="512" height="512" rx="112" className="fill-[#FFFFFF]" />
      <g className="fill-[#1D1D1F]">
        <path d="M88 160h290l-48 48H88z" />
        <path d="M343 160h86l-121 121-43-43z" />
        <path d="M120 280h130l-43 43z" />
        <path d="M106 389l99-109 43 43-56 66z" />
        <path d="M283 280h141l-44 44h-97l-39 39-43-43z" />
        <path d="M318 374c-14 0-25-11-25-25s11-25 25-25 25 11 25 25-11 25-25 25z" className="fill-[#FFFFFF]" />
        <path d="M318 367c-10 0-18-8-18-18s8-18 18-18 18 8 18 18-8 18-18 18z" />
      </g>
    </svg>
  );
}
