const DEFAULT_ASSET_BASE_URL =
  "https://pub-3a2140ba1f1249508a6901e3079a48ac.r2.dev";

export const ASSET_BASE_URL = (
  import.meta.env.VITE_ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL
).replace(/\/$/, "");

export function assetUrl(path: string) {
  return `${ASSET_BASE_URL}/${path.replace(/^\//, "")}`;
}
