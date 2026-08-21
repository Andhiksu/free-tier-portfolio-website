import assert from "node:assert/strict";
import test from "node:test";

import { projectCatalog } from "../src/data/projects.ts";
import {
  adaptCmsRecords,
  adaptValidatedProjects,
} from "../src/lib/sanity/adapters.ts";
import { DEFAULT_SANITY_API_VERSION } from "../src/lib/sanity/environment.ts";
import {
  loadSiteContent,
  STATIC_CMS_FALLBACK,
} from "../src/lib/sanity/loader.ts";
import {
  validateExperiences,
  validateProfile,
  validateProjects,
} from "../src/lib/sanity/validation.ts";

const publication = {
  source: "Existing public repository content",
  ownership: "owned",
  credit: "Portfolio Owner",
  privacyStatus: "public",
  redactionStatus: "notRequired",
  publicationApproved: true,
};

const localized = (en, id) => ({ en, id });

const MEDIA_STABLE_IDS = [
  "MEDIA-PROFILE-AND-RESUME",
  "MEDIA-CREDENTIAL-CERTIFICATIONS",
  "MEDIA-CREDENTIAL-EDUCATION",
  "MEDIA-CREDENTIAL-HONORS",
  "MEDIA-EXPERIENCE-BUSINESS",
  "MEDIA-EXPERIENCE-ENGINEERING",
  "MEDIA-EXPERIENCE-PRODUCTION",
  "MEDIA-PROJECT-DIGITAL-TRAINING",
  "MEDIA-PROJECT-DATA-AI",
  "MEDIA-ARCHIVE-PROVENANCE",
];

const sourceRange = (...ranges) =>
  ranges.flatMap(([start, end]) =>
    Array.from(
      { length: end - start + 1 },
      (_, index) => `AST-${String(start + index).padStart(4, "0")}`,
    ),
  );

const MEDIA_SOURCE_IDS = {
  "MEDIA-PROFILE-AND-RESUME": sourceRange([414, 419]),
  "MEDIA-CREDENTIAL-CERTIFICATIONS": sourceRange([3, 58]),
  "MEDIA-CREDENTIAL-EDUCATION": sourceRange([60, 78]),
  "MEDIA-CREDENTIAL-HONORS": sourceRange([79, 104]),
  "MEDIA-EXPERIENCE-BUSINESS": sourceRange([262, 272]),
  "MEDIA-EXPERIENCE-ENGINEERING": sourceRange([274, 282]),
  "MEDIA-EXPERIENCE-PRODUCTION": sourceRange([380, 411]),
  "MEDIA-PROJECT-DIGITAL-TRAINING": sourceRange([421, 444]),
  "MEDIA-PROJECT-DATA-AI": sourceRange([420, 420], [445, 479]),
  "MEDIA-ARCHIVE-PROVENANCE": sourceRange(
    [1, 2],
    [59, 59],
    [105, 261],
    [273, 273],
    [283, 379],
    [412, 413],
    [480, 482],
  ),
};

function createManagedImage(id, label) {
  return {
    _key: id,
    alt: localized(label, label),
    caption: localized(label, label),
    asset: {
      _id: `image-${id}`,
      url: `https://cdn.sanity.io/images/example/production/${id}.webp`,
      mimeType: "image/webp",
      size: 256 * 1024,
      width: 1200,
      height: 800,
    },
    ...publication,
  };
}

function createMediaRecords() {
  return MEDIA_STABLE_IDS.map((stableId, index) => ({
    _id: stableId.toLowerCase(),
    stableId,
    category:
      index === 0
        ? "profile"
        : index < 4
          ? "credential"
          : index < 7
            ? "experience"
            : index < 9
              ? "project"
              : "archive",
    title: localized(`Media group ${index + 1}`, `Grup media ${index + 1}`),
    description: localized(
      "A publication-safe source provenance fixture.",
      "Fixture provenance sumber yang aman dipublikasikan.",
    ),
    gallery: [],
    documents: [],
    sourceInventoryIds: [...MEDIA_SOURCE_IDS[stableId]],
    relatedContentIds: [],
    safeDerivativeOf: [],
    fileTypes: ["webp"],
    totalSourceBytes: 1024,
    order: (index + 1) * 10,
    visibility: "public",
    publication,
  }));
}

function createProjectRecords() {
  return projectCatalog.map((project, index) => ({
    _id: `safe-project-${project.slug}`,
    title: {
      en:
        index === 0 ? "Analytics & Decision Support" : project.content.en.title,
      id:
        index === 0
          ? "Analitik & Dukungan Keputusan"
          : project.content.id.title,
    },
    slug: { en: project.slug, id: project.slug },
    summary: localized(project.content.en.summary, project.content.id.summary),
    direction: localized(
      project.content.en.direction,
      project.content.id.direction,
    ),
    focusPoints: project.content.en.focusPoints.map((point, pointIndex) =>
      localized(point, project.content.id.focusPoints[pointIndex]),
    ),
    limitations: project.content.en.limitations.map((limitation, limitIndex) =>
      localized(limitation, project.content.id.limitations[limitIndex]),
    ),
    evidenceDisclosure: localized(
      project.content.en.evidenceDisclosure,
      project.content.id.evidenceDisclosure,
    ),
    gallery: [
      createManagedImage(`project-${index + 1}`, `Project cover ${index + 1}`),
    ],
    activities:
      project.slug === "digital-media-analytics-training-initiative"
        ? project.activities.map((activity, activityIndex) => ({
            stableId: activity.id,
            organization: activity.organization,
            theme: activity.theme,
            role: activity.role,
            description: activity.description,
            sourceInventoryIds: [
              `AST-${String(activityIndex + 1).padStart(4, "0")}`,
            ],
            order: (activityIndex + 1) * 10,
            gallery: Array.from(
              { length: [3, 3, 3, 2, 3][activityIndex] },
              (_, imageIndex) =>
                createManagedImage(
                  `activity-${activityIndex + 1}-${imageIndex + 1}`,
                  `Activity ${activityIndex + 1} image ${imageIndex + 1}`,
                ),
            ),
            publication,
          }))
        : [],
    featured: index === 0,
    order: index * 10,
    visibility: "public",
    publication,
  }));
}

function createRecords() {
  return {
    siteSettings: {
      _id: "siteSettings",
      siteTitle: localized(
        "Portfolio Owner: Data & Applied AI Portfolio",
        "Portfolio Owner: Portofolio Data & AI Terapan",
      ),
      siteDescription: localized(
        STATIC_CMS_FALLBACK.homeData.en.description,
        STATIC_CMS_FALLBACK.homeData.id.description,
      ),
      navigation: [
        ["home", "Home", "Beranda"],
        ["about", "About", "Tentang"],
        ["experience", "Experience", "Pengalaman"],
        ["projects", "Projects", "Proyek"],
        ["credentials", "Credentials", "Kredensial"],
        ["contact", "Contact", "Kontak"],
      ].map(([key, en, id], index) => ({
        key,
        label: localized(en, id),
        enabled: true,
        order: index * 10,
      })),
      sections: [
        "about",
        "experience",
        "projects",
        "credentials",
        "contact",
      ].map((key, index) => ({ key, enabled: true, order: index * 10 })),
      footer: localized(
        STATIC_CMS_FALLBACK.homeData.en.footer.copy,
        STATIC_CMS_FALLBACK.homeData.id.footer.copy,
      ),
      seo: {
        title: localized(
          STATIC_CMS_FALLBACK.homeData.en.title,
          STATIC_CMS_FALLBACK.homeData.id.title,
        ),
        description: localized(
          STATIC_CMS_FALLBACK.homeData.en.description,
          STATIC_CMS_FALLBACK.homeData.id.description,
        ),
        noIndex: false,
      },
      publication,
    },
    profile: {
      _id: "profile",
      name: "Portfolio Owner",
      headline: localized(
        STATIC_CMS_FALLBACK.homeData.en.hero.heading,
        STATIC_CMS_FALLBACK.homeData.id.hero.heading,
      ),
      summary: localized(
        STATIC_CMS_FALLBACK.homeData.en.about.copy,
        STATIC_CMS_FALLBACK.homeData.id.about.copy,
      ),
      allowEnglishFallback: false,
      visibility: "public",
      publication,
    },
    experiences: [
      {
        _id: "safe-experience-unavailable",
        role: localized(
          "Experience details unavailable",
          "Rincian pengalaman belum tersedia",
        ),
        organization: "Mock Org",
        employmentType: "Full-time",
        location: localized("Jakarta", "Jakarta"),
        summary: localized(
          "Professional experience details are not published while source and privacy review remains pending.",
          "Rincian pengalaman profesional belum dipublikasikan selama peninjauan sumber dan privasi berlangsung.",
        ),
        responsibilities: [localized("Resp 1 EN", "Resp 1 ID")],
        achievements: [localized("Achieve 1 EN", "Achieve 1 ID")],
        skills: ["Skill 1"],
        featured: false,
        order: 0,
        visibility: "unavailable",
        publication,
      },
    ],
    projects: createProjectRecords(),
    credentials: [
      {
        _id: "safe-credential-unavailable",
        name: localized(
          "Credential details unavailable",
          "Rincian kredensial belum tersedia",
        ),
        summary: localized(
          "Credential details are not published while source and privacy review remains pending.",
          "Rincian kredensial belum dipublikasikan selama peninjauan sumber dan privasi berlangsung.",
        ),
        featured: false,
        order: 0,
        visibility: "unavailable",
        publication,
      },
    ],
    mediaItems: createMediaRecords(),
  };
}

test("complete paired CMS records adapt into rendering-safe application models", () => {
  const content = adaptCmsRecords(createRecords(), STATIC_CMS_FALLBACK);

  assert.equal(content.source, "cms");
  assert.equal(content.projects.length, 4);
  assert.equal(
    content.projects[0].content.en.title,
    "Analytics & Decision Support",
  );
  assert.equal(content.experience.status, "unavailable");
  assert.equal(content.credentials.status, "unavailable");
  assert.equal(
    content.homeData.en.projects.items[0].title,
    "Analytics & Decision Support",
  );
  assert.equal(
    content.homeData.en.projects.items[0].cover?.id,
    content.projects[0].gallery.en[0].id,
  );
  assert.deepEqual(content.homeData.en.hero.headingLines, [
    "Developing practical data solutions",
    "and applied AI for better decisions",
  ]);
  assert.deepEqual(content.homeData.id.hero.headingLines, [
    "Mengembangkan solusi data praktis dan AI terapan",
    "untuk pengambilan keputusan yang lebih baik.",
  ]);
  assert.deepEqual(content.homeData.en.hero.actions, []);
  assert.deepEqual(content.homeData.id.hero.actions, []);
  assert.equal(content.homeData.en.hero.targetRoles.label, "Interest Roles");
  assert.equal(
    content.homeData.id.hero.targetRoles.label,
    "Peran yang Diminati",
  );
  assert.deepEqual(content.homeData.en.hero.targetRoles.items, [
    "Data Analyst",
    "Business Intelligence Analyst",
    "Data Scientist",
    "AI/ML Engineer",
  ]);
});

test("project previews derive covers only from existing approved gallery references", () => {
  const content = adaptCmsRecords(createRecords(), STATIC_CMS_FALLBACK);

  for (const locale of ["en", "id"]) {
    content.projects.forEach((project, index) => {
      assert.equal(
        content.homeData[locale].projects.items[index].cover?.id,
        project.gallery[locale][0].id,
      );
    });
  }
});

test("project ordering honors featured state and explicit numeric order", () => {
  const records = createProjectRecords();
  records[0].featured = false;
  records[0].order = 30;
  records[1].featured = true;

  const result = validateProjects(records);
  assert.equal(result.ok, true);
  assert.equal(result.value[0].slug, "language-text-intelligence");
  assert.equal(
    adaptValidatedProjects(result.value)[0].slug,
    result.value[0].slug,
  );
});

test("runtime validation rejects managed assets above publication size limits", () => {
  const projectRecords = createProjectRecords();
  projectRecords[0].gallery[0].asset.size = 5 * 1024 * 1024 + 1;
  assert.equal(validateProjects(projectRecords).ok, false);

  const profile = createRecords().profile;
  profile.resumeFiles = [
    {
      _key: "resume-oversized",
      caption: localized("Resume", "Resume"),
      asset: {
        _id: "file-resume-oversized",
        url: "https://cdn.sanity.io/files/example/production/resume.pdf",
        mimeType: "application/pdf",
        size: 10 * 1024 * 1024 + 1,
      },
      ...publication,
    },
  ];
  assert.equal(validateProfile(profile).ok, false);
});

test("PRJ-004 rejects an incomplete activity or image set", () => {
  const records = createProjectRecords();
  const projectFour = records.find(
    (project) =>
      project.slug.en === "digital-media-analytics-training-initiative",
  );
  assert.ok(projectFour);

  projectFour.activities = projectFour.activities.slice(0, 4);
  assert.equal(validateProjects(records).ok, false);

  const imageRecords = createProjectRecords();
  const projectFourWithMissingImage = imageRecords.find(
    (project) =>
      project.slug.en === "digital-media-analytics-training-initiative",
  );
  assert.ok(projectFourWithMissingImage);
  projectFourWithMissingImage.activities[0].gallery =
    projectFourWithMissingImage.activities[0].gallery.slice(0, 2);
  assert.equal(validateProjects(imageRecords).ok, false);
});

test("deferred experience-to-project relationships are not rendered", () => {
  const result = validateExperiences([
    {
      _id: "experience-exp-003",
      role: localized("Data Scientist", "Data Scientist"),
      organization: "Independent",
      summary: localized("Approved summary", "Ringkasan disetujui"),
      featured: true,
      order: 0,
      visibility: "public",
      publication,
    },
  ]);

  assert.equal(result.ok, true);
  assert.deepEqual(result.value[0].related, { en: [], id: [] });
});

test("adapter preserves responsibilities, achievements, employment type and localized location", () => {
  const records = createRecords();
  const rawExperience = records.experiences[0];
  rawExperience.visibility = "public";
  rawExperience.responsibilities = [localized("Resp 1 EN", "Resp 1 ID")];
  rawExperience.achievements = [localized("Achieve 1 EN", "Achieve 1 ID")];
  rawExperience.employmentType = "Contract";
  rawExperience.location = localized("Remote", "Jarak Jauh");

  const content = adaptCmsRecords(records, STATIC_CMS_FALLBACK);
  const experience = content.experience.items[0];
  const chapterEn = content.homeData.en.journey.chapters[0];
  const chapterId = content.homeData.id.journey.chapters[0];

  assert.equal(chapterEn.employmentType, "Contract");
  assert.equal(chapterEn.location, "Remote");
  assert.equal(chapterEn.responsibilities, undefined);
  assert.equal(chapterEn.achievements, undefined);
  assert.deepEqual(
    experience.responsibilities[0],
    localized("Resp 1 EN", "Resp 1 ID"),
  );
  assert.deepEqual(
    experience.achievements[0],
    localized("Achieve 1 EN", "Achieve 1 ID"),
  );

  assert.equal(chapterId.employmentType, "Contract");
  assert.equal(chapterId.location, "Jarak Jauh");
  assert.equal(chapterId.responsibilities, undefined);
  assert.equal(chapterId.achievements, undefined);
});

test("an incomplete locale pair rejects the entire CMS project set", () => {
  const records = createRecords();
  records.projects[0].title.id = "";

  const content = adaptCmsRecords(records, STATIC_CMS_FALLBACK);

  assert.equal(content.source, "cms-with-fallback");
  assert.equal(
    content.projects[0].content.en.title,
    "Analytics & decision support",
  );
  assert.ok(
    content.issues.some(
      (issue) => issue.path === "project" && issue.kind === "invalid",
    ),
  );
});

test("missing records preserve the complete static migration fallback", () => {
  const content = adaptCmsRecords(
    {
      siteSettings: null,
      profile: null,
      experiences: [],
      projects: [],
      credentials: [],
    },
    STATIC_CMS_FALLBACK,
  );

  assert.equal(content.source, "static-fallback");
  assert.deepEqual(content.projects, STATIC_CMS_FALLBACK.projects);
  assert.equal(content.issues.length, 6);
});

test("records without explicit public approval never replace fallback", () => {
  const records = createRecords();
  records.profile.publication = {
    ...publication,
    publicationApproved: false,
  };

  const content = adaptCmsRecords(records, STATIC_CMS_FALLBACK);

  assert.equal(content.homeData.en.siteLabel, "Portfolio Owner");
  assert.ok(
    content.issues.some(
      (issue) => issue.path === "profile" && issue.kind === "invalid",
    ),
  );
});

test("dedicated credentials retain unavailable state while homepage shows highlights only", () => {
  const records = createRecords();
  const publicCredential = {
    ...records.credentials[0],
    _id: "credential-cert-001",
    name: localized("Published credential", "Kredensial terpublikasi"),
    summary: localized("Published summary.", "Ringkasan terpublikasi."),
    issuer: "Example issuer",
    skills: ["Certification"],
    visibility: "public",
  };
  const recordsWithUnavailable = {
    ...records,
    credentials: [
      publicCredential,
      {
        ...records.credentials[0],
        _id: "credential-publications-unavailable",
        name: localized("Publications", "Publikasi"),
        summary: localized(
          "No verified publication record is currently available.",
          "Belum ada record publikasi terverifikasi yang tersedia.",
        ),
        skills: ["Publication"],
        visibility: "unavailable",
      },
    ],
  };

  const result = adaptCmsRecords(recordsWithUnavailable, STATIC_CMS_FALLBACK);

  assert.equal(result.source, "cms");
  assert.equal(
    result.credentials.items.some(
      (item) =>
        item.id === "credential-publications-unavailable" &&
        item.visibility === "unavailable",
    ),
    true,
  );
  assert.equal(
    result.homeData.en.credentials.items.some(
      (item) => item.id === "credential-publications-unavailable",
    ),
    false,
  );
});

test("homepage limits experience to three summaries while dedicated data retains five records", () => {
  const records = createRecords();
  records.experiences = Array.from({ length: 5 }, (_, index) => ({
    ...records.experiences[0],
    _id: `experience-${index + 1}`,
    role: localized(`Role ${index + 1}`, `Peran ${index + 1}`),
    summary: localized(`Summary ${index + 1}`, `Ringkasan ${index + 1}`),
    featured: index === 0,
    order: index,
    visibility: "public",
  }));

  const content = adaptCmsRecords(records, STATIC_CMS_FALLBACK);

  assert.equal(content.experience.items.length, 5);
  assert.equal(content.homeData.en.journey.chapters.length, 3);
  assert.equal(content.homeData.id.journey.chapters.length, 3);
  assert.equal(
    content.homeData.en.journey.chapters.every(
      (chapter) =>
        !chapter.gallery && !chapter.resources && !chapter.responsibilities,
    ),
    true,
  );
});

test("missing configuration returns fallback without making a request", async () => {
  let fetchCount = 0;
  const content = await loadSiteContent({
    environment: { status: "missing", reason: "Expected test state." },
    client: {
      async fetch() {
        fetchCount += 1;
        throw new Error("This request must not run.");
      },
    },
  });

  assert.equal(fetchCount, 0);
  assert.equal(content.source, "static-fallback");
  assert.equal(content.issues[0].path, "configuration");
});

test("a CMS fetch failure returns fallback without exposing the error", async () => {
  const content = await loadSiteContent({
    environment: {
      status: "configured",
      value: {
        projectId: "example0",
        dataset: "production",
        apiVersion: DEFAULT_SANITY_API_VERSION,
      },
    },
    client: {
      async fetch() {
        throw new Error("sensitive upstream detail");
      },
    },
  });

  assert.equal(content.source, "static-fallback");
  assert.equal(content.issues[0].kind, "fetch-error");
  assert.doesNotMatch(content.issues[0].message, /sensitive upstream detail/);
});
