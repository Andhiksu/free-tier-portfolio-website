import type { HomeLocale } from "../../types/home";

const MEDIA_COPY = {
  en: {
    opensNewTab: "opens in a new tab",
    pages: (count: number) => `${count} pages`,
    openPdf: "Open PDF",
    documentUnavailableTitle: "Document unavailable",
    documentUnavailableMessage: "This document is not publicly available.",
    credentialId: "Credential ID",
    verifyCredential: "Verify credential",
    relatedCredentialContent: "Related credential content",
    credentialUnavailableTitle: "Credential unavailable",
    credentialUnavailableMessage:
      "Credential details are not publicly available.",
    externalDestination: "External destination",
    externalKind: {
      repository: "GitHub repository",
      video: "YouTube video",
      verification: "Verification page",
    },
    openResource: "Open resource",
    externalUnavailableTitle: "External resource unavailable",
    externalUnavailableMessage: "This destination is not publicly available.",
    galleryUnavailableTitle: "Gallery unavailable",
    galleryUnavailableMessage: "No gallery images are available.",
    showRemainingEvidence: "Show remaining evidence",
    imageUnavailableTitle: "Image unavailable",
    imageUnavailableMessage: "This image is not publicly available.",
    relatedProject: "Related project",
    relatedEvidence: "Related evidence",
    credit: "Credit",
  },
  id: {
    opensNewTab: "dibuka di tab baru",
    pages: (count: number) => `${count} halaman`,
    openPdf: "Buka PDF",
    documentUnavailableTitle: "Dokumen tidak tersedia",
    documentUnavailableMessage: "Dokumen ini tidak tersedia untuk publik.",
    credentialId: "ID kredensial",
    verifyCredential: "Verifikasi kredensial",
    relatedCredentialContent: "Konten kredensial terkait",
    credentialUnavailableTitle: "Kredensial tidak tersedia",
    credentialUnavailableMessage:
      "Detail kredensial tidak tersedia untuk publik.",
    externalDestination: "Tujuan eksternal",
    externalKind: {
      repository: "Repositori GitHub",
      video: "Video YouTube",
      verification: "Halaman verifikasi",
    },
    openResource: "Buka sumber",
    externalUnavailableTitle: "Sumber eksternal tidak tersedia",
    externalUnavailableMessage: "Tujuan ini tidak tersedia untuk publik.",
    galleryUnavailableTitle: "Galeri tidak tersedia",
    galleryUnavailableMessage: "Belum ada gambar galeri yang tersedia.",
    showRemainingEvidence: "Tampilkan bukti lainnya",
    imageUnavailableTitle: "Gambar tidak tersedia",
    imageUnavailableMessage: "Gambar ini tidak tersedia untuk publik.",
    relatedProject: "Proyek terkait",
    relatedEvidence: "Bukti terkait",
    credit: "Kredit",
  },
} as const;

export function getMediaCopy(locale: HomeLocale = "en") {
  return MEDIA_COPY[locale];
}
