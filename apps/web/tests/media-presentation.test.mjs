import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";

import {
  isApprovedExternalDestination,
  buildResponsiveSrcSet,
  isPublicationReady,
  isPresentableExternalResource,
  isRenderableManagedImage,
  isSafePublicPath,
  normalizeFocalPoint,
  selectInitialGalleryItems,
} from "../src/lib/media/presentation.ts";

const image = {
  id: "safe-image",
  availability: "available",
  publicationApproved: true,
  source: {
    kind: "managed",
    src: "/media/safe.webp",
    width: 800,
    height: 1000,
    mimeType: "image/webp",
  },
  alt: "Reviewed evidence",
  responsiveVariants: [
    { src: "/media/safe-400.webp", width: 400, height: 500 },
    { src: "/media/safe-800.webp", width: 800, height: 1000 },
  ],
};

test("managed images require a public source, dimensions, MIME type, and alt text", () => {
  assert.equal(isRenderableManagedImage(image), true);
  assert.equal(
    isRenderableManagedImage({
      ...image,
      source: { ...image.source, src: "Asset/Profile/private.jpg" },
    }),
    false,
  );
  assert.equal(isRenderableManagedImage({ ...image, alt: "" }), false);
  assert.equal(
    isRenderableManagedImage({ ...image, decorative: true, alt: "" }),
    true,
  );
  assert.equal(
    isRenderableManagedImage({ ...image, publicationApproved: false }),
    false,
  );
  assert.equal(
    isRenderableManagedImage({
      ...image,
      responsiveVariants: [
        { src: "Asset/private.webp", width: 400, height: 500 },
      ],
    }),
    false,
  );
  assert.equal(
    isRenderableManagedImage({
      ...image,
      responsiveVariants: [
        { src: "/media/safe-400.webp", width: 400, height: 400 },
      ],
    }),
    false,
  );
  assert.equal(
    buildResponsiveSrcSet({
      ...image,
      responsiveVariants: [...image.responsiveVariants].reverse(),
    }),
    "/media/safe-400.webp 400w, /media/safe-800.webp 800w",
  );
});

test("video actions require a publication-ready poster", () => {
  const resource = {
    availability: "available",
    publicationApproved: true,
    kind: "video",
    href: "https://youtu.be/example",
  };
  assert.equal(isPresentableExternalResource(resource), false);
  assert.equal(
    isPresentableExternalResource({ ...resource, poster: image }),
    true,
  );
  assert.equal(
    isPresentableExternalResource({
      ...resource,
      poster: { ...image, publicationApproved: false },
    }),
    false,
  );
});

test("media copy has complete English and Indonesian presentation labels", async () => {
  const { getMediaCopy } = await import("../src/lib/media/copy.ts");
  const en = getMediaCopy("en");
  const id = getMediaCopy("id");
  assert.equal(en.openPdf, "Open PDF");
  assert.equal(id.openPdf, "Buka PDF");
  assert.equal(en.pages(2), "2 pages");
  assert.equal(id.pages(2), "2 halaman");
  assert.notEqual(en.imageUnavailableMessage, id.imageUnavailableMessage);
});

test("public URL guards reject local private and unsafe protocols", () => {
  assert.equal(isSafePublicPath("/media/safe.webp"), true);
  assert.equal(isSafePublicPath("https://cdn.example.com/safe.webp"), true);
  assert.equal(isSafePublicPath("file:///private/Asset/photo.jpg"), false);
  assert.equal(isSafePublicPath("javascript:alert(1)"), false);
  assert.equal(isSafePublicPath("//example.com/safe.webp"), false);
  assert.equal(isSafePublicPath("/%41sset/private.webp"), false);
  assert.equal(isSafePublicPath("/%2541sset/private.webp"), false);
  assert.equal(isSafePublicPath("/%2e%2e/%41sset/private.webp"), false);
  assert.equal(isSafePublicPath("/media/%E0%A4%A.webp"), false);
});

test("availability never substitutes for explicit publication approval", () => {
  assert.equal(
    isPublicationReady({
      availability: "available",
      publicationApproved: false,
    }),
    false,
  );
  assert.equal(
    isPublicationReady({
      availability: "available",
      publicationApproved: true,
    }),
    true,
  );
  assert.equal(
    isPublicationReady({
      availability: "unavailable",
      publicationApproved: true,
    }),
    false,
  );
});

test("external actions are limited to the declared destination kind", () => {
  assert.equal(
    isApprovedExternalDestination(
      "https://github.com/example-user",
      "repository",
    ),
    true,
  );
  assert.equal(
    isApprovedExternalDestination("https://youtu.be/example", "video"),
    true,
  );
  assert.equal(
    isApprovedExternalDestination(
      "https://example.com/repository",
      "repository",
    ),
    false,
  );
  assert.equal(
    isApprovedExternalDestination(
      "https://example.com/credential",
      "verification",
    ),
    false,
  );
});

test("gallery disclosure respects one through six and fails safely", () => {
  const items = Array.from({ length: 9 }, (_, index) => index + 1);
  assert.deepEqual(selectInitialGalleryItems(items, 2), {
    initial: [1, 2],
    remainder: [3, 4, 5, 6, 7, 8, 9],
  });
  assert.deepEqual(selectInitialGalleryItems(items, 1).initial, [1]);
  assert.deepEqual(selectInitialGalleryItems(items, 4).initial, [1, 2, 3, 4]);
  assert.deepEqual(selectInitialGalleryItems(items, 10), {
    initial: [1, 2, 3, 4, 5, 6],
    remainder: [7, 8, 9],
  });
  assert.deepEqual(selectInitialGalleryItems(items, 0).initial, [1, 2, 3, 4]);
  assert.deepEqual(selectInitialGalleryItems(items, -1).initial, [1, 2, 3, 4]);
  assert.deepEqual(
    selectInitialGalleryItems(items, Number.NaN).initial,
    [1, 2, 3, 4],
  );
});

test("portrait focal points clamp to safe CSS percentages", () => {
  assert.deepEqual(normalizeFocalPoint({ x: -2, y: 112 }), { x: 0, y: 100 });
  assert.deepEqual(normalizeFocalPoint(undefined), { x: 50, y: 50 });
});

test("the presentation fixture never references the private source directory", async () => {
  const fixture = await readFile(
    new URL(
      "../src/components/media/AssetPresentationFixture.astro",
      import.meta.url,
    ),
    "utf8",
  );
  assert.doesNotMatch(fixture, /(?:^|[\\/])Asset[\\/]/i);
  assert.doesNotMatch(fixture, /file:\/\//i);
  assert.doesNotMatch(fixture, /__qa-portrait/);
  assert.match(fixture, /Local-only presentation fixture/);
});

test("managed images provide a quiet runtime failure fallback", async () => {
  const component = await readFile(
    new URL("../src/components/media/ManagedImage.astro", import.meta.url),
    "utf8",
  );
  assert.match(component, /addEventListener\("error"/);
  assert.match(component, /image\?\.complete && image\.naturalWidth === 0/);
  assert.match(component, /data-managed-image-fallback/);
  assert.doesNotMatch(component, /live=\{true\}/);
});

test("collage mode keeps alt text and suppresses visible captions", async () => {
  const [gallery, imageComponent, journey] = await Promise.all([
    readFile(
      new URL("../src/components/media/EvidenceGallery.astro", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/components/media/ManagedImage.astro", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/components/sections/CareerJourney.astro",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(gallery, /variant === "collage"/);
  assert.match(gallery, /showCaption = variant !== "collage"/);
  assert.match(gallery, /showCaption=\{showCaption\}/);
  assert.match(journey, /initialCount=\{2\}/);
  assert.match(imageComponent, /alt=\{image\.decorative \? "" : image\.alt\}/);
  assert.match(imageComponent, /displayMode = "standard"/);
});

test("generic external and credential preview copy is absent from public components", async () => {
  const urls = [
    new URL(
      "../src/components/media/ExternalResourceAction.astro",
      import.meta.url,
    ),
    new URL(
      "../src/components/media/CredentialPreviewCard.astro",
      import.meta.url,
    ),
    new URL("../src/lib/media/copy.ts", import.meta.url),
  ];
  const source = (
    await Promise.all(urls.map((url) => readFile(url, "utf8")))
  ).join("\n");

  assert.doesNotMatch(source, /Reviewed public external destination/);
  assert.doesNotMatch(source, /Tujuan eksternal publik yang telah ditinjau/);
  assert.doesNotMatch(source, /Credential preview["<]/);
  assert.doesNotMatch(source, /Pratinjau kredensial/);
});
