import { describe, expect, it } from "vitest";

import { assetUrl } from "@/lib/assets";
import {
  getTrustedDownloadHref,
  getTrustedExternalHref,
} from "@/lib/security";

describe("trusted links", () => {
  it("accepts known external hosts over HTTPS", () => {
    expect(getTrustedExternalHref("https://docs.google.com/example")).toBe(
      "https://docs.google.com/example",
    );
  });

  it("rejects unknown hosts and unsafe protocols", () => {
    expect(getTrustedExternalHref("https://example.com/file")).toBeNull();
    expect(getTrustedExternalHref("javascript:alert(1)")).toBeNull();
  });

  it("accepts local downloads and resources from the configured R2 bucket", () => {
    const r2Resource = assetUrl("recursos/example.zip");

    expect(getTrustedDownloadHref("/recursos/example.zip")).toBe(
      "/recursos/example.zip",
    );
    expect(getTrustedDownloadHref(r2Resource)).toBe(r2Resource);
  });

  it("rejects non-resource R2 objects and lookalike hosts", () => {
    expect(getTrustedDownloadHref(assetUrl("brand/logo.svg"))).toBeNull();
    expect(
      getTrustedDownloadHref(
        "https://pub-3a2140ba1f1249508a6901e3079a48ac.r2.dev.example.com/recursos/file.zip",
      ),
    ).toBeNull();
  });
});
