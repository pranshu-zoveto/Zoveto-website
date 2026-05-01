import { join } from "path";

/** Resolve a web path like `/brand/logo-icon.svg` to an absolute filesystem path under `public/`. */
export function publicAssetFsPath(webPath: string): string {
  const segments = webPath.split("/").filter(Boolean);
  return join(process.cwd(), "public", ...segments);
}
