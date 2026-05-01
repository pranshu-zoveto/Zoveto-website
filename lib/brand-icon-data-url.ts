import { readFile } from "fs/promises";
import { BRAND_LOGO_ICON } from "@/lib/branding";
import { publicAssetFsPath } from "@/lib/brand-asset-path";

/** Base64 data URL for embedding the logo SVG in `ImageResponse` (favicon / apple touch). */
export async function getBrandLogoIconSvgDataUrl(): Promise<string> {
  const svg = await readFile(publicAssetFsPath(BRAND_LOGO_ICON), "utf8");
  return `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;
}
