import type { HomeLocale } from "../types/home";
import { getProjectDetailPath } from "../lib/routes.ts";
import type {
  LocalizedProjectContent,
  ProjectActivityPresentation,
  ProjectCatalogEntry,
  ProjectPageCopy,
  ProjectPreview,
  ProjectSlug,
} from "../types/projects";

const emptyActivityGallery = { en: [], id: [] } as const;

const digitalMediaActivities = [
  {
    id: "PRJ-004-ACT-001",
    organization: {
      en: "Example Learning Lab",
      id: "Laboratorium Belajar Contoh",
    },
    theme: {
      en: "Data-Driven Content Strategy & Social Media Analytics",
      id: "Strategi Konten Berbasis Data & Analisis Media Sosial",
    },
    role: { en: "Speaker", id: "Pembicara" },
    description: {
      en: "Fictional example: translated aggregate engagement patterns into a small set of content experiments for a learning team. Replace this description with reviewed evidence from your own work.",
      id: "Contoh fiktif: menerjemahkan pola interaksi agregat menjadi beberapa eksperimen konten untuk sebuah tim pembelajaran. Ganti deskripsi ini dengan bukti pekerjaan Anda yang telah ditinjau.",
    },
    gallery: emptyActivityGallery,
    order: 10,
  },
  {
    id: "PRJ-004-ACT-002",
    organization: {
      en: "Example Community School",
      id: "Sekolah Komunitas Contoh",
    },
    theme: {
      en: "Digital Content Creation Training at Scale",
      id: "Pelatihan Pembuatan Konten Digital dalam Skala Besar",
    },
    role: {
      en: "Trainer and Speaker",
      id: "Pelatih dan Pembicara",
    },
    description: {
      en: "Fictional example: designed a hands-on workshop that adapted one content-creation exercise for two audience groups. Replace the scenario and outcomes before publishing.",
      id: "Contoh fiktif: merancang lokakarya praktis yang menyesuaikan satu latihan pembuatan konten untuk dua kelompok audiens. Ganti skenario dan hasilnya sebelum dipublikasikan.",
    },
    gallery: emptyActivityGallery,
    order: 20,
  },
  {
    id: "PRJ-004-ACT-003",
    organization: {
      en: "Example Youth Community",
      id: "Komunitas Pemuda Contoh",
    },
    theme: {
      en: "Digital Literacy & Youth Empowerment",
      id: "Literasi Digital & Pemberdayaan Pemuda",
    },
    role: { en: "Speaker", id: "Pembicara" },
    description: {
      en: "Fictional example: facilitated a community session that used a simple publishing exercise to explore communication, confidence, and responsible participation online.",
      id: "Contoh fiktif: memfasilitasi sesi komunitas yang menggunakan latihan publikasi sederhana untuk mengeksplorasi komunikasi, kepercayaan diri, dan partisipasi daring yang bertanggung jawab.",
    },
    gallery: emptyActivityGallery,
    order: 30,
  },
  {
    id: "PRJ-004-ACT-004",
    organization: {
      en: "Example Digital Academy",
      id: "Akademi Digital Contoh",
    },
    theme: {
      en: "Building Digital Adaptability and Strategy",
      id: "Membangun Adaptabilitas dan Strategi Digital",
    },
    role: {
      en: "Trainer and Speaker",
      id: "Pelatih dan Pembicara",
    },
    description: {
      en: "Fictional example: combined a short discussion about changing digital tools with a guided practice activity and a reusable reflection checklist.",
      id: "Contoh fiktif: menggabungkan diskusi singkat mengenai perubahan alat digital dengan aktivitas praktik terpandu dan daftar refleksi yang dapat digunakan ulang.",
    },
    gallery: emptyActivityGallery,
    order: 40,
  },
  {
    id: "PRJ-004-ACT-005",
    organization: {
      en: "Example Education Network",
      id: "Jaringan Pendidikan Contoh",
    },
    theme: {
      en: "Digital Platform Strategy for Educational Content",
      id: "Strategi Platform Digital untuk Konten Pendidikan",
    },
    role: { en: "Speaker", id: "Pembicara" },
    description: {
      en: "Fictional example: compared several platform categories using accessibility, maintainability, and cost criteria, then documented a reversible recommendation.",
      id: "Contoh fiktif: membandingkan beberapa kategori platform menggunakan kriteria aksesibilitas, kemudahan pemeliharaan, dan biaya, lalu mendokumentasikan rekomendasi yang dapat dibatalkan.",
    },
    gallery: emptyActivityGallery,
    order: 50,
  },
] as const satisfies readonly ProjectActivityPresentation[];

export const projectCatalog = [
  {
    slug: "analytics-decision-support",
    content: {
      en: {
        title: "Analytics & decision support",
        summary:
          "Explore how structured data can be organized and interpreted to support clearer operational and business decisions.",
        direction:
          "This public direction considers how a decision question, its constraints, and the available structured information can be framed before any project-specific claim is made.",
        focusPoints: [
          "Clarify the decision and the people who need to review it.",
          "Organize relevant information into a traceable analytical structure.",
          "Communicate assumptions and uncertainty without overstating conclusions.",
        ],
        limitations: [
          "This page is a public direction, not a verified project case study.",
          "Project-specific evidence, results, and implementation details remain unpublished pending review.",
        ],
        evidenceDisclosure:
          "No project-specific evidence is published on this page. Evidence and privacy review are still pending.",
      },
      id: {
        title: "Analitik & dukungan keputusan",
        summary:
          "Mengeksplorasi bagaimana data terstruktur dapat diatur dan ditafsirkan untuk mendukung keputusan operasional dan bisnis yang lebih jelas.",
        direction:
          "Arah publik ini mempertimbangkan bagaimana pertanyaan keputusan, keterbatasannya, dan informasi terstruktur yang tersedia dapat dirumuskan sebelum klaim spesifik proyek dibuat.",
        focusPoints: [
          "Memperjelas keputusan dan pihak yang perlu meninjaunya.",
          "Menyusun informasi relevan dalam struktur analitis yang dapat ditelusuri.",
          "Mengomunikasikan asumsi dan ketidakpastian tanpa melebih-lebihkan kesimpulan.",
        ],
        limitations: [
          "Halaman ini adalah arah publik, bukan studi kasus proyek terverifikasi.",
          "Bukti, hasil, dan rincian implementasi spesifik proyek belum dipublikasikan selama peninjauan berlangsung.",
        ],
        evidenceDisclosure:
          "Tidak ada bukti spesifik proyek yang dipublikasikan di halaman ini. Peninjauan bukti dan privasi masih berlangsung.",
      },
    },
    relatedProjectSlugs: [],
  },
  {
    slug: "language-text-intelligence",
    content: {
      en: {
        title: "Language & text intelligence",
        summary:
          "Explore ways to structure and interpret text for practical information discovery and decision context.",
        direction:
          "This public direction considers how text can be prepared, reviewed, and interpreted while keeping context, ambiguity, and human judgment visible.",
        focusPoints: [
          "Define the information need before choosing an analytical path.",
          "Preserve context and ambiguity during text preparation and review.",
          "Keep human review central when interpretation can affect a decision.",
        ],
        limitations: [
          "This page does not describe a verified text-intelligence implementation.",
          "No project-specific source material, evaluation, or outcome is approved for publication.",
        ],
        evidenceDisclosure:
          "No project-specific evidence is published on this page. Evidence and privacy review are still pending.",
      },
      id: {
        title: "Kecerdasan bahasa & teks",
        summary:
          "Mengeksplorasi cara menyusun dan menafsirkan teks untuk penemuan informasi praktis dan konteks pengambilan keputusan.",
        direction:
          "Arah publik ini mempertimbangkan bagaimana teks dapat disiapkan, ditinjau, dan ditafsirkan dengan tetap memperlihatkan konteks, ambiguitas, dan pertimbangan manusia.",
        focusPoints: [
          "Menentukan kebutuhan informasi sebelum memilih jalur analisis.",
          "Menjaga konteks dan ambiguitas selama persiapan serta peninjauan teks.",
          "Menempatkan peninjauan manusia sebagai bagian utama ketika interpretasi dapat memengaruhi keputusan.",
        ],
        limitations: [
          "Halaman ini tidak menggambarkan implementasi kecerdasan teks yang terverifikasi.",
          "Belum ada materi sumber, evaluasi, atau hasil spesifik proyek yang disetujui untuk dipublikasikan.",
        ],
        evidenceDisclosure:
          "Tidak ada bukti spesifik proyek yang dipublikasikan di halaman ini. Peninjauan bukti dan privasi masih berlangsung.",
      },
    },
    relatedProjectSlugs: [],
  },
  {
    slug: "computer-vision-applied-ai",
    content: {
      en: {
        title: "Computer vision & applied AI",
        summary:
          "Explore how visual information can be prepared and interpreted for practical, human-reviewed AI workflows.",
        direction:
          "This public direction considers how visual information can move through a careful, reviewable workflow without treating automated interpretation as unquestionable evidence.",
        focusPoints: [
          "Define the visual question and the limits of the available material.",
          "Make preparation and review steps understandable to people.",
          "Treat automated interpretation as input for review, not as proof by itself.",
        ],
        limitations: [
          "This page does not describe a verified computer-vision implementation.",
          "No project-specific media, evaluation, or public-use claim is approved for publication.",
        ],
        evidenceDisclosure:
          "No project-specific evidence is published on this page. Evidence and privacy review are still pending.",
      },
      id: {
        title: "Visi komputer & AI terapan",
        summary:
          "Mengeksplorasi bagaimana informasi visual dapat disiapkan dan ditafsirkan untuk alur kerja AI praktis yang tetap ditinjau manusia.",
        direction:
          "Arah publik ini mempertimbangkan bagaimana informasi visual dapat diproses melalui alur kerja yang hati-hati dan dapat ditinjau tanpa menganggap interpretasi otomatis sebagai bukti yang tidak dapat dipertanyakan.",
        focusPoints: [
          "Menentukan pertanyaan visual dan batas materi yang tersedia.",
          "Membuat langkah persiapan dan peninjauan mudah dipahami manusia.",
          "Memperlakukan interpretasi otomatis sebagai masukan untuk ditinjau, bukan sebagai bukti dengan sendirinya.",
        ],
        limitations: [
          "Halaman ini tidak menggambarkan implementasi visi komputer yang terverifikasi.",
          "Belum ada media, evaluasi, atau klaim penggunaan publik spesifik proyek yang disetujui untuk dipublikasikan.",
        ],
        evidenceDisclosure:
          "Tidak ada bukti spesifik proyek yang dipublikasikan di halaman ini. Peninjauan bukti dan privasi masih berlangsung.",
      },
    },
    relatedProjectSlugs: [],
  },
  {
    slug: "digital-media-analytics-training-initiative",
    content: {
      en: {
        title: "Digital Media Analytics & Training Initiative",
        summary:
          "A five-activity portfolio collection connecting digital-media analysis, content strategy, training, and community learning.",
        direction:
          "This case study documents how platform analytics and practical digital-content training were translated into institution- and community-facing sessions across five organizations.",
        focusPoints: [
          "Translate engagement data into practical content recommendations.",
          "Adapt training structure to educators, students, staff, and community audiences.",
          "Connect platform choice, communication practice, and digital adaptability.",
        ],
        limitations: [
          "The public presentation describes only the five approved activity records and their selected visual evidence.",
          "Participant identities and unrelated private details are not used as public claims.",
        ],
        evidenceDisclosure:
          "Fourteen approved activity photographs are presented across five bilingual records.",
      },
      id: {
        title: "Inisiatif Pelatihan & Analitik Media Digital",
        summary:
          "Koleksi portofolio lima kegiatan yang menghubungkan analisis media digital, strategi konten, pelatihan, dan pembelajaran komunitas.",
        direction:
          "Studi kasus ini mendokumentasikan penerjemahan analitik platform dan pelatihan konten digital praktis menjadi sesi untuk institusi dan komunitas di lima organisasi.",
        focusPoints: [
          "Menerjemahkan data engagement menjadi rekomendasi konten yang praktis.",
          "Menyesuaikan struktur pelatihan bagi pendidik, siswa, staf, dan audiens komunitas.",
          "Menghubungkan pemilihan platform, praktik komunikasi, dan adaptabilitas digital.",
        ],
        limitations: [
          "Presentasi publik hanya menjelaskan lima catatan kegiatan yang disetujui beserta bukti visual pilihannya.",
          "Identitas peserta dan detail pribadi yang tidak relevan tidak digunakan sebagai klaim publik.",
        ],
        evidenceDisclosure:
          "Empat belas foto kegiatan yang disetujui disajikan dalam lima catatan bilingual.",
      },
    },
    category: {
      en: "Digital Media Analytics · Training · Community Impact",
      id: "Analitik Media Digital · Pelatihan · Dampak Komunitas",
    },
    status: "case-study",
    activities: digitalMediaActivities,
    relatedProjectSlugs: [],
  },
] as const satisfies readonly ProjectCatalogEntry[];

export const projectPageCopy: Readonly<Record<HomeLocale, ProjectPageCopy>> = {
  en: {
    archive: {
      title: "Projects",
      description:
        "Four project records connect data, AI, business intelligence, and digital-media training with source-backed public evidence.",
      eyebrow: "Public project directions",
      listHeading: "Explore the directions",
      evidenceLabel: "Case study status",
      openLabel: "Open direction",
      emptyTitle: "No project directions are available",
      emptyCopy:
        "Project directions will appear only when their required English and Indonesian content is complete.",
      incompleteTitle: "A project direction is not published",
      incompleteCopy:
        "Its mirrored English and Indonesian routes remain blocked until all required bilingual content is complete.",
    },
    detail: {
      eyebrow: "Public project direction",
      backLabel: "Back to Projects",
      statusLabel: "Publication status",
      directionHeading: "About this direction",
      focusHeading: "What this direction can examine",
      availabilityHeading: "Public information availability",
      evidenceTitle: "Evidence",
      metricsTitle: "Metrics and outcomes",
      metricsCopy:
        "No project-specific metrics or outcome claims are published while evidence review is pending.",
      linksTitle: "Repository and demo links",
      linksCopy:
        "No project-specific repository or demo destination is published for this direction.",
      limitationsHeading: "Limitations",
      relatedHeading: "Related projects",
      relatedEmptyTitle: "No related projects displayed",
      relatedEmptyCopy:
        "Project relationships are not rendered until they have been reviewed and approved manually.",
    },
    evidencePending: "Evidence review pending",
  },
  id: {
    archive: {
      title: "Proyek",
      description:
        "Empat catatan proyek menghubungkan data, AI, business intelligence, dan pelatihan media digital dengan bukti publik berbasis sumber.",
      eyebrow: "Arah proyek publik",
      listHeading: "Jelajahi arah proyek",
      evidenceLabel: "Status studi kasus",
      openLabel: "Buka arah proyek",
      emptyTitle: "Belum ada arah proyek yang tersedia",
      emptyCopy:
        "Arah proyek hanya akan ditampilkan ketika konten wajib bahasa Inggris dan Indonesia telah lengkap.",
      incompleteTitle: "Satu arah proyek tidak dipublikasikan",
      incompleteCopy:
        "Route bahasa Inggris dan Indonesia tetap diblokir sampai seluruh konten bilingual wajib lengkap.",
    },
    detail: {
      eyebrow: "Arah proyek publik",
      backLabel: "Kembali ke Proyek",
      statusLabel: "Status publikasi",
      directionHeading: "Tentang arah ini",
      focusHeading: "Hal yang dapat dikaji dalam arah ini",
      availabilityHeading: "Ketersediaan informasi publik",
      evidenceTitle: "Bukti",
      metricsTitle: "Metrik dan hasil",
      metricsCopy:
        "Tidak ada metrik atau klaim hasil spesifik proyek yang dipublikasikan selama peninjauan bukti berlangsung.",
      linksTitle: "Tautan repositori dan demo",
      linksCopy:
        "Tidak ada tujuan repositori atau demo spesifik proyek yang dipublikasikan untuk arah ini.",
      limitationsHeading: "Keterbatasan",
      relatedHeading: "Proyek terkait",
      relatedEmptyTitle: "Tidak ada proyek terkait yang ditampilkan",
      relatedEmptyCopy:
        "Relasi proyek tidak dirender sampai ditinjau dan disetujui secara manual.",
    },
    evidencePending: "Menunggu peninjauan bukti",
  },
};

function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function isLocalizedContentComplete(content: LocalizedProjectContent): boolean {
  return (
    isNonEmpty(content.title) &&
    isNonEmpty(content.summary) &&
    isNonEmpty(content.direction) &&
    content.focusPoints.every(isNonEmpty) &&
    content.limitations.every(isNonEmpty) &&
    isNonEmpty(content.evidenceDisclosure)
  );
}

export function isProjectBilingualComplete(
  entry: ProjectCatalogEntry,
): boolean {
  return (
    isLocalizedContentComplete(entry.content.en) &&
    isLocalizedContentComplete(entry.content.id)
  );
}

export function getPublishedProjects(): readonly ProjectCatalogEntry[] {
  return projectCatalog.filter(isProjectBilingualComplete);
}

export function getIncompleteProjectCount(): number {
  return projectCatalog.length - getPublishedProjects().length;
}

export function getProjectBySlug(
  slug: ProjectSlug,
): ProjectCatalogEntry | undefined {
  return getPublishedProjects().find((entry) => entry.slug === slug);
}

export function getProjectPreviews(locale: HomeLocale): ProjectPreview[] {
  const copy = projectPageCopy[locale];

  return getPublishedProjects().map((entry) => {
    const content = entry.content[locale];

    return {
      title: content.title,
      summary: content.summary,
      evidenceValue: copy.evidencePending,
      href: getProjectDetailPath(locale, entry.slug),
      linkLabel: `${copy.archive.openLabel}: ${content.title}`,
    };
  });
}
