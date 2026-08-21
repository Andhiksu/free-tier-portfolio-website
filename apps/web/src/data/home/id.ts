import type { HomePageData } from "../../types/home";
import {
  getLocalizedHomepagePath,
  getProjectsArchivePath,
} from "../../lib/routes.ts";
import { getProjectPreviews } from "../projects.ts";

export const idHomeData: HomePageData = {
  lang: "id",
  title: "Portfolio Owner: Portofolio Data & AI Terapan",
  description:
    "Jelajahi arah portofolio Portfolio Owner dalam data, business intelligence, data science, dan AI terapan.",
  indexable: true,
  siteLabel: "Portfolio Owner",
  homeHref: getLocalizedHomepagePath("id"),
  primaryNavigation: {
    label: "Navigasi utama",
    homeLabel: "Beranda",
    contactLabel: "Kontak",
    contactHref: "#contact",
  },
  workspaceNavigation: [
    { id: "home", label: "Beranda", enabled: true, order: 0 },
    { id: "about", label: "Tentang", enabled: true, order: 10 },
    { id: "experience", label: "Pengalaman", enabled: true, order: 20 },
    { id: "projects", label: "Proyek", enabled: true, order: 30 },
    { id: "credentials", label: "Kredensial", enabled: true, order: 40 },
    { id: "contact", label: "Kontak", enabled: true, order: 50 },
  ],
  sectionControls: [
    { id: "about", enabled: true, order: 10 },
    { id: "experience", enabled: true, order: 20 },
    { id: "projects", enabled: true, order: 30 },
    { id: "credentials", enabled: true, order: 40 },
    { id: "contact", enabled: true, order: 50 },
  ],
  mobileMenu: {
    openLabel: "Buka menu",
    closeLabel: "Tutup menu",
  },
  themeControl: {
    label: "Tema gelap",
  },
  languageNavigation: {
    label: "Bahasa",
  },
  hero: {
    eyebrow: "Data · Strategi · AI Terapan",
    heading:
      "Mengembangkan solusi data praktis dan AI terapan untuk pengambilan keputusan yang lebih baik.",
    headingLines: [
      "Mengembangkan solusi data praktis dan AI terapan",
      "untuk pengambilan keputusan yang lebih baik.",
    ],
    supportingCopy:
      "Dari rekayasa dan operasi real-time menuju strategi bisnis, data, dan AI terapan.",
    targetRoles: {
      label: "Peran yang Diminati",
      items: [
        "Data Analyst",
        "Business Intelligence Analyst",
        "Data Scientist",
        "AI/ML Engineer",
      ],
    },
    actions: [],
  },
  impact: {
    id: "impact",
    heading: "Area fokus",
    description:
      "Entri ini akan digantikan dengan hasil berbasis sumber setelah peninjauan bukti dan privasi.",
    statusLabel: "Status bukti",
    items: [
      {
        category: "Dukungan keputusan",
        status: "Menunggu verifikasi",
        context: "Bukti dan konteks hasil akan ditambahkan setelah ditinjau.",
      },
      {
        category: "Wawasan operasional",
        status: "Menunggu verifikasi",
        context:
          "Contoh berbasis sumber akan menggantikan entri sementara ini.",
      },
      {
        category: "Konteks bisnis",
        status: "Menunggu verifikasi",
        context:
          "Bukti yang disetujui akan memperjelas hasil yang ditampilkan di sini.",
      },
      {
        category: "Data dan AI terapan",
        status: "Menunggu verifikasi",
        context:
          "Bukti proyek terverifikasi akan menggantikan entri sementara ini.",
      },
    ],
  },
  projects: {
    id: "projects",
    heading: "Proyek unggulan",
    description:
      "Karya terpilih dalam dukungan keputusan, kecerdasan bahasa, dan computer vision.",
    evidenceLabel: "Status studi kasus",
    archiveHref: getProjectsArchivePath("id"),
    archiveLabel: "Lihat semua proyek",
    items: getProjectPreviews("id"),
  },
  about: {
    id: "about",
    heading: "Tentang",
    copy: "Perspektif saya menghubungkan cara berpikir rekayasa dan konteks operasional real-time dengan perumusan masalah yang mempertimbangkan bisnis. Saya mendekati data dan AI terapan dengan perhatian pada keputusan, keterbatasan, dan penggunaan praktis.",
  },
  journey: {
    id: "journey",
    heading: "Pengalaman",
    description:
      "Perkembangan yang saling terhubung dari konteks rekayasa menuju data dan AI terapan.",
    chapters: [
      {
        label: "Data dan AI terapan",
        summary:
          "Arah saat ini menyatukan perspektif tersebut melalui data, analitik, dan AI terapan.",
      },
      {
        label: "Bisnis dan strategi",
        summary:
          "Bisnis dan strategi memperluas sudut pandang dari pertanyaan teknis menuju prioritas, pertimbangan pilihan, dan konteks keputusan.",
      },
      {
        label: "Operasi real-time",
        summary:
          "Konteks operasional menambahkan perhatian pada kondisi yang berubah, informasi yang tepat waktu, dan keputusan praktis.",
      },
      {
        label: "Fondasi rekayasa",
        summary:
          "Rekayasa membentuk cara yang terstruktur untuk merumuskan masalah, keterbatasan, dan bukti.",
      },
    ],
  },
  capabilities: {
    id: "capabilities",
    heading: "Area kapabilitas",
    description:
      "Empat area kerja menghubungkan pemikiran analitis, konteks keputusan, AI terapan, dan komunikasi yang jelas.",
    groups: [
      {
        label: "Analitik & alur kerja data",
        summary:
          "Menyusun informasi terstruktur menjadi langkah yang jelas dan dapat ditinjau untuk analisis dan interpretasi.",
      },
      {
        label: "Dukungan keputusan",
        summary:
          "Merumuskan pertanyaan data berdasarkan keputusan, keterbatasan, pertimbangan pilihan, dan konteks praktis.",
      },
      {
        label: "Perumusan masalah AI terapan",
        summary:
          "Mengeksplorasi penggunaan praktis informasi terstruktur, teks, dan visual dengan peninjauan manusia serta pemeriksaan bukti.",
      },
      {
        label: "Komunikasi teknis & bisnis",
        summary:
          "Menghubungkan penalaran teknis dengan penjelasan ringkas untuk konteks operasional dan bisnis.",
      },
    ],
  },
  credentials: {
    id: "credentials",
    heading: "Kredensial",
    description:
      "Rincian pendidikan dan sertifikasi hanya akan dipublikasikan setelah peninjauan sumber dan privasi.",
    statusLabel: "Status rincian publik",
    items: [
      {
        category: "Pendidikan",
        statusValue: "Belum ada rincian publik yang disetujui",
      },
      {
        category: "Sertifikasi",
        statusValue: "Belum ada rincian publik yang disetujui",
      },
    ],
  },
  contact: {
    id: "contact",
    heading: "Mulai percakapan",
    copy: "Terhubung melalui LinkedIn atau jelajahi profil GitHub publik saya.",
    links: [
      {
        platform: "linkedin",
        label: "Lihat profil LinkedIn",
        disclosure: "Situs eksternal",
        href: "https://www.linkedin.com/in/example-profile/",
        emphasis: "primary",
      },
      {
        platform: "github",
        label: "Lihat profil GitHub",
        disclosure: "Situs eksternal",
        href: "https://github.com/example-user",
        emphasis: "secondary",
      },
    ],
  },
  footer: {
    copy: "Portfolio Owner: Data, analitik, dan AI terapan.",
  },
};
