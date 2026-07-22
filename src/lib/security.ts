import { ASSET_BASE_URL } from "@/lib/assets";

const TRUSTED_EXTERNAL_HOSTS = new Set([
  "calendar.google.com",
  "docs.google.com",
  "drive.google.com",
  "github.com",
  "meet.google.com",
  "www.github.com",
]);

const SAFE_CSS_IDENTIFIER = /[^a-zA-Z0-9_-]/g;
const SAFE_CSS_VALUE = /^[a-zA-Z0-9#(),.%\s/_-]+$/;

export function getTrustedExternalHref(url: string | undefined) {
  if (!url) {
    return null;
  }

  if (url === "#") {
    return url;
  }

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") {
      return null;
    }

    if (!TRUSTED_EXTERNAL_HOSTS.has(parsed.hostname)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export function getTrustedDownloadHref(url: string | undefined) {
  if (!url) {
    return null;
  }

  const isLocalPath = /^\/[^/\\]/.test(url) && !url.includes("\\");

  if (isLocalPath) {
    return url;
  }

  try {
    const assetBase = new URL(ASSET_BASE_URL);
    const parsed = new URL(url);
    const isR2Asset =
      parsed.protocol === "https:" &&
      parsed.origin === assetBase.origin &&
      parsed.pathname.startsWith("/recursos/");

    return isR2Asset ? parsed.toString() : null;
  } catch {
    return null;
  }
}

export function sanitizeCssIdentifier(value: string) {
  return value.replace(SAFE_CSS_IDENTIFIER, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export function sanitizeCssValue(value: string) {
  const normalized = value.trim();

  if (!normalized || !SAFE_CSS_VALUE.test(normalized)) {
    return null;
  }

  if (/[<>{};]/.test(normalized)) {
    return null;
  }

  return normalized;
}
