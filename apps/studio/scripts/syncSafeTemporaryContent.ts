import {getCliClient} from 'sanity/cli'

const EXPECTED_PROJECT_ID = 'example0'
const EXPECTED_DATASET = 'production'
const API_VERSION = '2025-02-19'
const MANAGED_SOURCE = 'Existing public repository content'
const LEGACY_MANAGED_IDS = new Map([
  ['safe.experience.unavailable', {id: 'safe-experience-unavailable', type: 'experience'}],
  [
    'safe.project.analytics-decision-support',
    {id: 'safe-project-analytics-decision-support', type: 'project'},
  ],
  [
    'safe.project.language-text-intelligence',
    {id: 'safe-project-language-text-intelligence', type: 'project'},
  ],
  [
    'safe.project.computer-vision-applied-ai',
    {id: 'safe-project-computer-vision-applied-ai', type: 'project'},
  ],
  ['safe.credential.unavailable', {id: 'safe-credential-unavailable', type: 'credential'}],
])
const runtimeProcess = (
  globalThis as typeof globalThis & {
    process?: {argv?: readonly string[]; exitCode?: number}
  }
).process

type SafeTemporaryDocument = Record<string, unknown> & {
  _id: string
  _type: string
}

type ExistingProject = {
  id: string
  title?: unknown
  slug?: unknown
  summary?: unknown
  direction?: unknown
  focusPoints?: unknown
  limitations?: unknown
  evidenceDisclosure?: unknown
  attachedItemCount: number
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const hasPairedText = (value: unknown): value is {en: string; id: string} =>
  isRecord(value) &&
  typeof value.en === 'string' &&
  value.en.trim().length > 0 &&
  typeof value.id === 'string' &&
  value.id.trim().length > 0

const hasPairedList = (value: unknown, expectedLength: number) =>
  Array.isArray(value) && value.length === expectedLength && value.every(hasPairedText)

const matchesPairedText = (value: unknown, expected: {en: string; id: string}) =>
  hasPairedText(value) && value.en === expected.en && value.id === expected.id

const publication = {
  _type: 'publicationMetadata',
  source: MANAGED_SOURCE,
  ownership: 'owned',
  credit: 'Portfolio Owner',
  privacyStatus: 'public',
  redactionStatus: 'notRequired',
  publicationApproved: true,
}

const localizedShort = (en: string, id: string) => ({
  _type: 'localizedShortText',
  en,
  id,
})

const localizedLong = (en: string, id: string) => ({
  _type: 'localizedLongText',
  en,
  id,
})

const projectContent = [
  {
    slug: 'analytics-decision-support',
    title: {
      en: 'Analytics & Decision Support',
      id: 'Analitik & Dukungan Keputusan',
    },
    summary: {
      en: 'Explore how structured data can be organized and interpreted to support clearer operational and business decisions.',
      id: 'Mengeksplorasi bagaimana data terstruktur dapat diatur dan ditafsirkan untuk mendukung keputusan operasional dan bisnis yang lebih jelas.',
    },
    direction: {
      en: 'This public direction considers how a decision question, its constraints, and the available structured information can be framed before any project-specific claim is made.',
      id: 'Arah publik ini mempertimbangkan bagaimana pertanyaan keputusan, keterbatasannya, dan informasi terstruktur yang tersedia dapat dirumuskan sebelum klaim spesifik proyek dibuat.',
    },
    focusPoints: {
      en: [
        'Clarify the decision and the people who need to review it.',
        'Organize relevant information into a traceable analytical structure.',
        'Communicate assumptions and uncertainty without overstating conclusions.',
      ],
      id: [
        'Memperjelas keputusan dan pihak yang perlu meninjaunya.',
        'Menyusun informasi relevan dalam struktur analitis yang dapat ditelusuri.',
        'Mengomunikasikan asumsi dan ketidakpastian tanpa melebih-lebihkan kesimpulan.',
      ],
    },
    limitations: {
      en: [
        'This page is a public direction, not a verified project case study.',
        'Project-specific evidence, results, and implementation details remain unpublished pending review.',
      ],
      id: [
        'Halaman ini adalah arah publik, bukan studi kasus proyek terverifikasi.',
        'Bukti, hasil, dan rincian implementasi spesifik proyek belum dipublikasikan selama peninjauan berlangsung.',
      ],
    },
    evidenceDisclosure: {
      en: 'No project-specific evidence is published on this page. Evidence and privacy review are still pending.',
      id: 'Tidak ada bukti spesifik proyek yang dipublikasikan di halaman ini. Peninjauan bukti dan privasi masih berlangsung.',
    },
  },
  {
    slug: 'language-text-intelligence',
    title: {
      en: 'Language & text intelligence',
      id: 'Kecerdasan bahasa & teks',
    },
    summary: {
      en: 'Explore ways to structure and interpret text for practical information discovery and decision context.',
      id: 'Mengeksplorasi cara menyusun dan menafsirkan teks untuk penemuan informasi praktis dan konteks pengambilan keputusan.',
    },
    direction: {
      en: 'This public direction considers how text can be prepared, reviewed, and interpreted while keeping context, ambiguity, and human judgment visible.',
      id: 'Arah publik ini mempertimbangkan bagaimana teks dapat disiapkan, ditinjau, dan ditafsirkan dengan tetap memperlihatkan konteks, ambiguitas, dan pertimbangan manusia.',
    },
    focusPoints: {
      en: [
        'Define the information need before choosing an analytical path.',
        'Preserve context and ambiguity during text preparation and review.',
        'Keep human review central when interpretation can affect a decision.',
      ],
      id: [
        'Menentukan kebutuhan informasi sebelum memilih jalur analisis.',
        'Menjaga konteks dan ambiguitas selama persiapan serta peninjauan teks.',
        'Menempatkan peninjauan manusia sebagai bagian utama ketika interpretasi dapat memengaruhi keputusan.',
      ],
    },
    limitations: {
      en: [
        'This page does not describe a verified text-intelligence implementation.',
        'No project-specific source material, evaluation, or outcome is approved for publication.',
      ],
      id: [
        'Halaman ini tidak menggambarkan implementasi kecerdasan teks yang terverifikasi.',
        'Belum ada materi sumber, evaluasi, atau hasil spesifik proyek yang disetujui untuk dipublikasikan.',
      ],
    },
    evidenceDisclosure: {
      en: 'No project-specific evidence is published on this page. Evidence and privacy review are still pending.',
      id: 'Tidak ada bukti spesifik proyek yang dipublikasikan di halaman ini. Peninjauan bukti dan privasi masih berlangsung.',
    },
  },
  {
    slug: 'computer-vision-applied-ai',
    title: {
      en: 'Computer vision & applied AI',
      id: 'Visi komputer & AI terapan',
    },
    summary: {
      en: 'Explore how visual information can be prepared and interpreted for practical, human-reviewed AI workflows.',
      id: 'Mengeksplorasi bagaimana informasi visual dapat disiapkan dan ditafsirkan untuk alur kerja AI praktis yang tetap ditinjau manusia.',
    },
    direction: {
      en: 'This public direction considers how visual information can move through a careful, reviewable workflow without treating automated interpretation as unquestionable evidence.',
      id: 'Arah publik ini mempertimbangkan bagaimana informasi visual dapat diproses melalui alur kerja yang hati-hati dan dapat ditinjau tanpa menganggap interpretasi otomatis sebagai bukti yang tidak dapat dipertanyakan.',
    },
    focusPoints: {
      en: [
        'Define the visual question and the limits of the available material.',
        'Make preparation and review steps understandable to people.',
        'Treat automated interpretation as input for review, not as proof by itself.',
      ],
      id: [
        'Menentukan pertanyaan visual dan batas materi yang tersedia.',
        'Membuat langkah persiapan dan peninjauan mudah dipahami manusia.',
        'Memperlakukan interpretasi otomatis sebagai masukan untuk ditinjau, bukan sebagai bukti dengan sendirinya.',
      ],
    },
    limitations: {
      en: [
        'This page does not describe a verified computer-vision implementation.',
        'No project-specific media, evaluation, or public-use claim is approved for publication.',
      ],
      id: [
        'Halaman ini tidak menggambarkan implementasi visi komputer yang terverifikasi.',
        'Belum ada media, evaluasi, atau klaim penggunaan publik spesifik proyek yang disetujui untuk dipublikasikan.',
      ],
    },
    evidenceDisclosure: {
      en: 'No project-specific evidence is published on this page. Evidence and privacy review are still pending.',
      id: 'Tidak ada bukti spesifik proyek yang dipublikasikan di halaman ini. Peninjauan bukti dan privasi masih berlangsung.',
    },
  },
] as const

const documents: SafeTemporaryDocument[] = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: localizedShort(
      'Portfolio Owner: Data & Applied AI Portfolio',
      'Portfolio Owner: Portofolio Data & AI Terapan',
    ),
    siteDescription: localizedLong(
      'Explore Portfolio Owner’s portfolio direction across data, business intelligence, data science, and applied AI.',
      'Jelajahi arah portofolio Portfolio Owner dalam data, business intelligence, data science, dan AI terapan.',
    ),
    navigation: [
      ['home', 'Home', 'Beranda'],
      ['about', 'About', 'Tentang'],
      ['experience', 'Experience', 'Pengalaman'],
      ['projects', 'Projects', 'Proyek'],
      ['credentials', 'Credentials', 'Kredensial'],
      ['contact', 'Contact', 'Kontak'],
    ].map(([key, en, id], index) => ({
      _key: key,
      _type: 'navigationItem',
      key,
      label: localizedShort(en, id),
      enabled: true,
      order: index * 10,
    })),
    sections: ['about', 'experience', 'projects', 'credentials', 'contact'].map((key, index) => ({
      _key: key,
      _type: 'sectionControl',
      key,
      enabled: true,
      order: index * 10,
    })),
    footer: localizedLong(
      'Portfolio Owner: a data, analytics, and applied AI portfolio built with evidence and privacy in mind.',
      'Portfolio Owner: portofolio data, analitik, dan AI terapan yang dibangun dengan perhatian pada bukti dan privasi.',
    ),
    seo: {
      _type: 'seoSettings',
      title: localizedShort(
        'Portfolio Owner: Data & Applied AI Portfolio',
        'Portfolio Owner: Portofolio Data & AI Terapan',
      ),
      description: localizedLong(
        'Explore Portfolio Owner’s portfolio direction across data, business intelligence, data science, and applied AI.',
        'Jelajahi arah portofolio Portfolio Owner dalam data, business intelligence, data science, dan AI terapan.',
      ),
      noIndex: false,
    },
    publication,
  },
  {
    _id: 'profile',
    _type: 'profile',
    name: 'Portfolio Owner',
    headline: localizedShort(
      'Building toward clearer decisions with data and applied AI.',
      'Menuju keputusan yang lebih jelas dengan data dan AI terapan.',
    ),
    summary: localizedLong(
      'My perspective connects engineering thinking and real-time operational context with business-aware problem framing. I approach data and applied AI with close attention to decisions, constraints, and practical use.',
      'Perspektif saya menghubungkan cara berpikir rekayasa dan konteks operasional real-time dengan perumusan masalah yang mempertimbangkan bisnis. Saya mendekati data dan AI terapan dengan perhatian pada keputusan, keterbatasan, dan penggunaan praktis.',
    ),
    allowEnglishFallback: false,
    visibility: 'public',
    publication,
  },
  {
    _id: 'safe-experience-unavailable',
    _type: 'experience',
    role: localizedShort('Experience details unavailable', 'Rincian pengalaman belum tersedia'),
    summary: localizedLong(
      'Professional experience details are not published while source and privacy review remains pending.',
      'Rincian pengalaman profesional belum dipublikasikan selama peninjauan sumber dan privasi berlangsung.',
    ),
    featured: false,
    order: 0,
    visibility: 'unavailable',
    publication,
  },
  ...projectContent.map((project, index) => ({
    _id: `safe-project-${project.slug}`,
    _type: 'project',
    title: localizedShort(project.title.en, project.title.id),
    slug: {
      _type: 'localizedSlug',
      en: {_type: 'slug', current: project.slug},
      id: {_type: 'slug', current: project.slug},
    },
    summary: localizedLong(project.summary.en, project.summary.id),
    direction: localizedLong(project.direction.en, project.direction.id),
    focusPoints: project.focusPoints.en.map((point, pointIndex) => ({
      _key: `focus-${pointIndex + 1}`,
      ...localizedShort(point, project.focusPoints.id[pointIndex]),
    })),
    limitations: project.limitations.en.map((limitation, limitationIndex) => ({
      _key: `limitation-${limitationIndex + 1}`,
      ...localizedLong(limitation, project.limitations.id[limitationIndex]),
    })),
    evidenceDisclosure: localizedLong(project.evidenceDisclosure.en, project.evidenceDisclosure.id),
    externalLinks: [],
    gallery: [],
    documents: [],
    evidence: [],
    featured: index === 0,
    order: index * 10,
    visibility: 'public',
    publication,
  })),
  {
    _id: 'safe-credential-unavailable',
    _type: 'credential',
    name: localizedShort('Credential details unavailable', 'Rincian kredensial belum tersedia'),
    summary: localizedLong(
      'Credential details are not published while source and privacy review remains pending.',
      'Rincian kredensial belum dipublikasikan selama peninjauan sumber dan privasi berlangsung.',
    ),
    featured: false,
    order: 0,
    visibility: 'unavailable',
    publication,
  },
]

async function main() {
  const client = getCliClient({apiVersion: API_VERSION})
  const clientConfiguration = client.config()

  if (
    clientConfiguration.projectId !== EXPECTED_PROJECT_ID ||
    clientConfiguration.dataset !== EXPECTED_DATASET
  ) {
    throw new Error('Refusing CMS write because the configured Sanity target is not approved.')
  }

  const documentTypes = new Map(documents.map((document) => [document._id, document._type]))
  const existingDocuments = await client.fetch<
    {id: string; type: string; source?: string; isDraft: boolean}[]
  >(
    `*[!(_id in path("_.**"))]{
    "id": _id,
    "type": _type,
    "source": publication.source,
    "isDraft": _id in path("drafts.**")
  }`,
  )

  for (const existing of existingDocuments) {
    const publishedId = existing.id.replace(/^drafts\./, '')
    const legacyDocument = LEGACY_MANAGED_IDS.get(publishedId)
    if (!documentTypes.has(publishedId) && !legacyDocument) {
      throw new Error('Refusing CMS write because unexpected dataset records exist.')
    }

    if (
      existing.isDraft ||
      (documentTypes.get(publishedId) ?? legacyDocument?.type) !== existing.type ||
      existing.source !== MANAGED_SOURCE
    ) {
      throw new Error(`Refusing to overwrite unmanaged or draft document: ${publishedId}`)
    }
  }

  if (existingDocuments.length !== 0 && existingDocuments.length !== documents.length) {
    throw new Error('Refusing CMS write because the managed record set is incomplete.')
  }

  if (existingDocuments.length === documents.length) {
    const expectedProjects = new Map<string, (typeof projectContent)[number]>(
      projectContent.flatMap((project) => [
        [`safe-project-${project.slug}`, project] as const,
        [`safe.project.${project.slug}`, project] as const,
      ]),
    )
    const existingProjects = await client.fetch<ExistingProject[]>(`*[
      _type == "project" && !(_id in path("drafts.**"))
    ]{
      "id": _id,
      title,
      "slug": {"en": slug.en.current, "id": slug.id.current},
      summary,
      direction,
      focusPoints,
      limitations,
      evidenceDisclosure,
      "attachedItemCount": count(externalLinks) + count(gallery) + count(documents) + count(evidence)
    }`)

    if (
      existingProjects.length !== projectContent.length ||
      existingProjects.some((project) => {
        const expected = expectedProjects.get(project.id)
        return (
          !expected ||
          !matchesPairedText(project.title, expected.title) ||
          !matchesPairedText(project.slug, {en: expected.slug, id: expected.slug}) ||
          !hasPairedText(project.summary) ||
          !hasPairedText(project.direction) ||
          !hasPairedList(project.focusPoints, 3) ||
          !hasPairedList(project.limitations, 2) ||
          !hasPairedText(project.evidenceDisclosure) ||
          project.attachedItemCount !== 0
        )
      })
    ) {
      throw new Error('Refusing CMS write because paired project safety checks failed.')
    }
  }

  const runtimeArguments = runtimeProcess?.argv

  if (!runtimeArguments?.includes('--apply')) {
    console.info(
      `Safe CMS sync preflight passed for ${documents.length} records; ${existingDocuments.length} managed records already exist.`,
    )
  } else {
    let transaction = client.transaction()
    for (const legacyId of LEGACY_MANAGED_IDS.keys()) {
      if (existingDocuments.some((document) => document.id === legacyId)) {
        transaction = transaction.delete(legacyId)
      }
    }
    for (const document of documents) transaction = transaction.createOrReplace(document)
    await transaction.commit({visibility: 'sync'})
    console.info(`Synchronized ${documents.length} approved safe temporary CMS records.`)
  }
}

void main().catch(() => {
  console.error('Safe CMS sync failed before completion; no diagnostic detail was emitted.')
  if (runtimeProcess) runtimeProcess.exitCode = 1
})
