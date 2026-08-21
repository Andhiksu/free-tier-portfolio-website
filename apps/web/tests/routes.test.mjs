import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";

import {
  buildPageMetadata,
  serializeStructuredData,
} from "../src/lib/metadata.ts";
import {
  getWorkspaceDestinationFromHash,
  getCredentialsArchivePath,
  getExperienceArchivePath,
  getMediaArchivePath,
  getLocaleSwitchDestination,
  getPublicRouteRecords,
  getSitemapPathnames,
} from "../src/lib/routes.ts";

test("route registry includes paired Experience, Credentials, and Media archives", () => {
  const paths = new Set(getPublicRouteRecords().map((route) => route.pathname));
  for (const path of [
    "/en/experience/",
    "/id/experience/",
    "/en/credentials/",
    "/id/credentials/",
    "/en/media/",
    "/id/media/",
  ]) {
    assert.equal(paths.has(path), true, path);
    assert.equal(getSitemapPathnames().includes(path), true, path);
  }
});

test("new archives preserve canonical, hreflang, and locale counterparts", () => {
  const experience = buildPageMetadata({
    locale: "en",
    title: "Experience",
    description: "Experience archive",
    pathname: getExperienceArchivePath("en"),
    indexable: true,
  });
  const credentials = buildPageMetadata({
    locale: "id",
    title: "Kredensial",
    description: "Arsip kredensial",
    pathname: getCredentialsArchivePath("id"),
    indexable: true,
  });
  const media = buildPageMetadata({
    locale: "en",
    title: "Media & evidence library",
    description: "Public media provenance",
    pathname: getMediaArchivePath("en"),
    indexable: true,
  });

  assert.equal(
    experience.canonicalUrl,
    "https://portfolio.example.com/en/experience/",
  );
  assert.deepEqual(
    experience.alternates.map((item) => item.locale),
    ["en", "id"],
  );
  assert.equal(
    getLocaleSwitchDestination(getExperienceArchivePath("en"), "id"),
    "/id/experience/",
  );
  assert.equal(
    credentials.canonicalUrl,
    "https://portfolio.example.com/id/credentials/",
  );
  assert.equal(
    getLocaleSwitchDestination(getCredentialsArchivePath("id"), "en"),
    "/en/credentials/",
  );
  assert.equal(media.canonicalUrl, "https://portfolio.example.com/en/media/");
  assert.equal(
    getLocaleSwitchDestination(getMediaArchivePath("en"), "id"),
    "/id/media/",
  );
});

test("homepage preserves public anchors in a progressively enhanced focused workspace", async () => {
  const source = await readFile(
    new URL("../src/components/pages/HomePage.astro", import.meta.url),
    "utf8",
  );
  const headerSource = await readFile(
    new URL("../src/components/navigation/SiteHeader.astro", import.meta.url),
    "utf8",
  );
  const projectRailSource = await readFile(
    new URL("../src/components/sections/ProjectRail.astro", import.meta.url),
    "utf8",
  );
  const heroSource = await readFile(
    new URL("../src/components/sections/HeroSection.astro", import.meta.url),
    "utf8",
  );
  const aboutSource = await readFile(
    new URL("../src/components/sections/AboutWorkspace.astro", import.meta.url),
    "utf8",
  );
  const experienceSource = await readFile(
    new URL(
      "../src/components/sections/ExperienceHighlights.astro",
      import.meta.url,
    ),
    "utf8",
  );
  const credentialWorkspaceSource = await readFile(
    new URL(
      "../src/components/sections/CredentialWorkspace.astro",
      import.meta.url,
    ),
    "utf8",
  );
  const featuredProjectsSource = await readFile(
    new URL(
      "../src/components/sections/FeaturedProjects.astro",
      import.meta.url,
    ),
    "utf8",
  );
  const careerJourneySource = await readFile(
    new URL("../src/components/sections/CareerJourney.astro", import.meta.url),
    "utf8",
  );
  const credentialsPreviewSource = await readFile(
    new URL(
      "../src/components/sections/CredentialsPreview.astro",
      import.meta.url,
    ),
    "utf8",
  );

  for (const anchor of ["about", "experience", "projects", "credentials"]) {
    assert.match(source, new RegExp(anchor, "i"));
  }
  assert.match(source, /data-home-workspace/);
  assert.match(source, /data-workspace-panel="home"/);
  assert.match(source, /data-workspace-panel="about"/);
  assert.match(source, /AboutWorkspace/);
  assert.match(source, /ProjectRail/);
  assert.doesNotMatch(headerSource, /configuredWorkspaceDestinations/);
  assert.match(
    headerSource,
    /ownerWorkspaceDestinations\.map\(\(destination\)/,
  );
  const ownerNavigationSource = headerSource.slice(
    headerSource.indexOf("const ownerWorkspaceDestinations"),
    headerSource.indexOf("const workspaceDestinations"),
  );
  assert.ok(
    ownerNavigationSource.indexOf('id: "experience"') <
      ownerNavigationSource.indexOf('id: "projects"'),
  );
  assert.ok(
    ownerNavigationSource.indexOf('id: "projects"') <
      ownerNavigationSource.indexOf('id: "credentials"'),
  );
  assert.doesNotMatch(ownerNavigationSource, /id: "education"/);
  assert.doesNotMatch(ownerNavigationSource, /id: "certifications"/);
  assert.doesNotMatch(ownerNavigationSource, /id: "honors"/);
  assert.doesNotMatch(ownerNavigationSource, /id: "publications"/);
  assert.doesNotMatch(headerSource, /destination\.id !== "about"/);
  assert.doesNotMatch(headerSource, /syncCredentialDestination/);
  assert.doesNotMatch(headerSource, /credential-edu-/);
  assert.doesNotMatch(headerSource, /credential-ach-/);
  assert.doesNotMatch(headerSource, /language-nav__icon/);
  assert.doesNotMatch(headerSource, /site-brand/);
  assert.doesNotMatch(source, /variant="preview"/);
  assert.match(heroSource, /Business Intelligence & Strategy/);
  assert.match(heroSource, /data\.targetRoles\.label/);
  assert.match(heroSource, /preferredRoleOrder/);
  assert.match(heroSource, /hero-section__heading-line/);
  assert.equal(
    (heroSource.match(/hero-section__collage-tile/g) ?? []).length,
    4,
  );
  assert.doesNotMatch(heroSource, /hero-section__collage--populated/);
  assert.doesNotMatch(heroSource, /ManagedImage/);
  assert.doesNotMatch(source, /homeCollageMedia/);
  assert.doesNotMatch(heroSource, /hero-section__actions/);
  assert.doesNotMatch(heroSource, /hero-section__cta/);
  assert.doesNotMatch(heroSource, /PortraitMedia/);
  assert.doesNotMatch(heroSource, /View CV/);
  assert.match(aboutSource, /Resume \(English\)/);
  assert.match(aboutSource, /Resume \(Bahasa Indonesia\)/);
  assert.match(
    aboutSource,
    /https:\/\/www\.linkedin\.com\/in\/example-profile\//,
  );
  assert.match(aboutSource, /https:\/\/github\.com\/example-user/);
  assert.match(aboutSource, /mailto:hello@example\.com/);
  assert.doesNotMatch(aboutSource, /(?:tel:|whatsapp|wa\.me)/i);
  assert.match(aboutSource, /Hi! I'm Portfolio Owner/);
  assert.match(aboutSource, /Hai! Saya Portfolio Owner/);
  assert.match(
    aboutSource,
    /Data Analyst · Data Scientist · AI\/ML Engineer · Business Intelligence & Strategy/,
  );
  assert.match(aboutSource, /Interest Roles/);
  assert.equal((aboutSource.match(/\{identity\}/g) ?? []).length, 1);
  assert.doesNotMatch(aboutSource, /achievementsHeading/);
  assert.doesNotMatch(aboutSource, /20 percent/);
  assert.match(projectRailSource, /Computer Vision Project/);
  assert.match(projectRailSource, /NLP, LLM Project/);
  assert.match(projectRailSource, /Data Visualization, Power BI/);
  assert.match(projectRailSource, /title: project\.title/);
  assert.doesNotMatch(
    projectRailSource,
    /title: "Indonesian License Plate Recognition Using YOLOv11 & TrOCR"/,
  );
  assert.doesNotMatch(
    projectRailSource,
    /title: "Digital Media Analytics & Training Initiative"/,
  );
  assert.match(projectRailSource, /Trainer & Speaker/);
  assert.ok(
    projectRailSource.indexOf("computer-vision-applied-ai") <
      projectRailSource.indexOf("language-text-intelligence"),
  );
  assert.ok(
    projectRailSource.indexOf("language-text-intelligence") <
      projectRailSource.indexOf("analytics-decision-support"),
  );
  assert.match(source, /data-workspace-panel="experience"/);
  assert.match(source, /data-workspace-panel="projects"/);
  assert.match(source, /data-workspace-panel="credentials"/);
  assert.doesNotMatch(source, /data-workspace-panel="education"/);
  assert.doesNotMatch(source, /data-workspace-panel="certifications"/);
  assert.doesNotMatch(source, /data-workspace-panel="honors"/);
  assert.doesNotMatch(source, /data-workspace-panel="publications"/);
  assert.doesNotMatch(source, /data-workspace-panel="contact"/);
  assert.doesNotMatch(source, /CapabilitiesSection/);
  assert.match(experienceSource, /record\.gallery\[locale\]\.slice\(0, 3\)/);
  assert.match(experienceSource, /rightEnd\.localeCompare\(leftEnd\)/);
  assert.match(experienceSource, /experience-highlight__marker/);
  assert.match(experienceSource, /experience-highlight__frame--primary/);
  assert.match(experienceSource, /Professional journey/);
  assert.doesNotMatch(
    experienceSource,
    /A timeline of selected roles, working contexts, and contribution\./,
  );
  assert.doesNotMatch(experienceSource, /Selected experience/);
  assert.doesNotMatch(experienceSource, /View all experience/);
  assert.match(experienceSource, /#\$\{record\.id\}/);
  assert.match(credentialWorkspaceSource, /Licenses & Certifications/);
  assert.match(credentialWorkspaceSource, /Honors & Awards/);
  assert.match(credentialWorkspaceSource, /data-credential-tab/);
  assert.match(credentialWorkspaceSource, /data-credential-panel/);
  assert.match(credentialWorkspaceSource, /data-credential-category/);
  assert.doesNotMatch(credentialWorkspaceSource, /aria-current=\{/);
  assert.match(credentialWorkspaceSource, /credentials-hub__tab-index/);
  assert.match(credentialWorkspaceSource, /CredentialIssuerMark/);
  assert.doesNotMatch(credentialWorkspaceSource, /category\.short/);
  assert.doesNotMatch(credentialWorkspaceSource, /<small>/);
  assert.doesNotMatch(
    credentialWorkspaceSource,
    /Browse formal education, verified certifications, distinctions, and published work\./,
  );
  assert.match(credentialWorkspaceSource, /credentialsReady/);
  assert.match(
    credentialWorkspaceSource,
    /id !== "publications" \|\| record\.visibility === "public"/,
  );
  for (const category of [
    "education",
    "certifications",
    "honors",
    "publications",
  ]) {
    assert.match(credentialWorkspaceSource, new RegExp(category, "i"));
  }
  assert.doesNotMatch(
    credentialWorkspaceSource,
    /View complete credential record/,
  );
  assert.doesNotMatch(featuredProjectsSource, /projects-section__archive-link/);
  assert.doesNotMatch(projectRailSource, /project-rail__archive/);
  assert.match(careerJourneySource, /record-detail__back/);
  assert.match(careerJourneySource, /id=\{chapter\.id\}/);
  assert.match(credentialsPreviewSource, /credential-record-detail/);
  assert.match(credentialsPreviewSource, /record-detail__back/);
  assert.match(source, /scripts\/home-workspace/);
});

test("legacy removed workspace hashes resolve to their retained content", () => {
  assert.equal(getWorkspaceDestinationFromHash("#credentials"), "credentials");
  assert.equal(getWorkspaceDestinationFromHash("#contact"), "about");
});

test("workspace enhancement, lightbox, and project disclosures retain accessible fallbacks", async () => {
  const [
    layoutSource,
    homePageSource,
    experiencePageSource,
    projectArchiveSource,
    projectDetailSource,
    lightboxSource,
    workspaceSource,
    credentialWorkspaceSource,
  ] = await Promise.all([
    readFile(
      new URL("../src/layouts/BaseLayout.astro", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/components/pages/HomePage.astro", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/components/pages/ExperiencePage.astro", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/components/pages/ProjectArchivePage.astro",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/components/pages/ProjectDetailPage.astro",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL("../src/components/media/ImageLightbox.astro", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/scripts/home-workspace.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/components/sections/CredentialWorkspace.astro",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(layoutSource, /fixedWorkspace \? "" : undefined/);
  assert.doesNotMatch(homePageSource, /<BaseLayout\s+fixedWorkspace/);
  for (const source of [
    experiencePageSource,
    projectArchiveSource,
    projectDetailSource,
  ]) {
    assert.match(source, /<BaseLayout\s+fixedWorkspace/);
  }

  assert.match(projectArchiveSource, /getMediaArchivePath/);
  assert.match(projectDetailSource, /content\.limitations\.map/);
  assert.match(projectDetailSource, /project-detail__disclosure/);
  assert.match(lightboxSource, /aria-label=\{dialogLabel\}/);
  assert.match(lightboxSource, /data-lightbox-trigger/);
  assert.doesNotMatch(lightboxSource, /\[aria-hidden='true'\], \[hidden\]/);
  assert.match(lightboxSource, /event\.key !== "Enter"/);
  assert.match(lightboxSource, /event\.key === "Escape"/);
  assert.match(lightboxSource, /activeTrigger\?\.focus\(\)/);
  assert.match(workspaceSource, /preservesCredentialRecord/);
  assert.match(credentialWorkspaceSource, /decodeURIComponent/);
  assert.match(credentialWorkspaceSource, /catch \{/);
});

test("metadata avoids unapproved role claims and safely serializes JSON-LD", () => {
  const metadata = buildPageMetadata({
    locale: "en",
    title: "Missing page",
    description: "Missing page description",
    indexable: false,
  });

  assert.deepEqual(metadata.structuredData, []);
  const serialized = serializeStructuredData({
    value: "</script><script>alert('unsafe')</script>",
  });
  assert.doesNotMatch(serialized, /</);
  assert.match(serialized, /\\u003c\/script>/);
});
