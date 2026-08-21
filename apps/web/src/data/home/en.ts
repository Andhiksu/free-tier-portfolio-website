import type { HomePageData } from "../../types/home";
import {
  getLocalizedHomepagePath,
  getProjectsArchivePath,
} from "../../lib/routes.ts";
import { getProjectPreviews } from "../projects.ts";

export const enHomeData: HomePageData = {
  lang: "en",
  title: "Portfolio Owner — Data & Applied AI Portfolio",
  description:
    "Explore Portfolio Owner’s portfolio direction across data, business intelligence, data science, and applied AI.",
  indexable: true,
  siteLabel: "Portfolio Owner",
  homeHref: getLocalizedHomepagePath("en"),
  primaryNavigation: {
    label: "Primary navigation",
    homeLabel: "Home",
    contactLabel: "Contact",
    contactHref: "#contact",
  },
  workspaceNavigation: [
    { id: "home", label: "Home", enabled: true, order: 0 },
    { id: "about", label: "About", enabled: true, order: 10 },
    { id: "experience", label: "Experience", enabled: true, order: 20 },
    { id: "projects", label: "Projects", enabled: true, order: 30 },
    { id: "credentials", label: "Credentials", enabled: true, order: 40 },
    { id: "contact", label: "Contact", enabled: true, order: 50 },
  ],
  sectionControls: [
    { id: "about", enabled: true, order: 10 },
    { id: "experience", enabled: true, order: 20 },
    { id: "projects", enabled: true, order: 30 },
    { id: "credentials", enabled: true, order: 40 },
    { id: "contact", enabled: true, order: 50 },
  ],
  mobileMenu: {
    openLabel: "Open menu",
    closeLabel: "Close menu",
  },
  themeControl: {
    label: "Dark theme",
  },
  languageNavigation: {
    label: "Language",
  },
  hero: {
    eyebrow: "Data · Strategy · Applied AI",
    heading:
      "Developing practical data solutions and applied AI for better decisions",
    headingLines: [
      "Developing practical data solutions",
      "and applied AI for better decisions",
    ],
    supportingCopy:
      "From engineering and real-time operations to business strategy, data, and applied AI.",
    targetRoles: {
      label: "Interest Roles",
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
    heading: "Focus areas",
    description:
      "These entries will be replaced with source-backed outcomes after evidence and privacy review.",
    statusLabel: "Evidence status",
    items: [
      {
        category: "Decision support",
        status: "Pending verification",
        context: "Evidence and outcome context will be added after review.",
      },
      {
        category: "Operational insight",
        status: "Pending verification",
        context: "A source-backed example will replace this temporary entry.",
      },
      {
        category: "Business context",
        status: "Pending verification",
        context: "Approved evidence will clarify the outcome represented here.",
      },
      {
        category: "Applied data and AI",
        status: "Pending verification",
        context: "Verified project evidence will replace this temporary entry.",
      },
    ],
  },
  projects: {
    id: "projects",
    heading: "Featured projects",
    description:
      "Selected work across decision support, language intelligence, and computer vision.",
    evidenceLabel: "Case study status",
    archiveHref: getProjectsArchivePath("en"),
    archiveLabel: "View all projects",
    items: getProjectPreviews("en"),
  },
  about: {
    id: "about",
    heading: "About",
    copy: "My perspective connects engineering thinking and real-time operational context with business-aware problem framing. I approach data and applied AI with close attention to decisions, constraints, and practical use.",
  },
  journey: {
    id: "journey",
    heading: "Experience",
    description:
      "A connected progression from engineering context toward data and applied AI.",
    chapters: [
      {
        label: "Data and applied AI",
        summary:
          "The current direction brings these perspectives together through data, analytics, and applied AI.",
      },
      {
        label: "Business and strategy",
        summary:
          "Business and strategy broadened the lens from technical questions to priorities, trade-offs, and decision context.",
      },
      {
        label: "Real-time operations",
        summary:
          "Operational contexts added attention to changing conditions, timely information, and practical decisions.",
      },
      {
        label: "Engineering foundation",
        summary:
          "Engineering shaped a structured way to frame problems, constraints, and evidence.",
      },
    ],
  },
  capabilities: {
    id: "capabilities",
    heading: "Capability areas",
    description:
      "Four working areas connect analytical thinking, decision context, applied AI, and clear communication.",
    groups: [
      {
        label: "Analytics & data workflows",
        summary:
          "Organizing structured information into clear, reviewable steps for analysis and interpretation.",
      },
      {
        label: "Decision support",
        summary:
          "Framing data questions around decisions, constraints, trade-offs, and practical context.",
      },
      {
        label: "Applied AI problem framing",
        summary:
          "Exploring practical uses of structured, text, and visual information with human review and evidence checks.",
      },
      {
        label: "Technical & business communication",
        summary:
          "Connecting technical reasoning with concise explanations for operational and business context.",
      },
    ],
  },
  credentials: {
    id: "credentials",
    heading: "Credentials",
    description:
      "Education and certification details will be published only after source and privacy review.",
    statusLabel: "Public detail status",
    items: [
      {
        category: "Education",
        statusValue: "No public details approved",
      },
      {
        category: "Certifications",
        statusValue: "No public details approved",
      },
    ],
  },
  contact: {
    id: "contact",
    heading: "Start a conversation",
    copy: "Connect through LinkedIn or explore my public GitHub profile.",
    links: [
      {
        platform: "linkedin",
        label: "View LinkedIn profile",
        disclosure: "External site",
        href: "https://www.linkedin.com/in/example-profile/",
        emphasis: "primary",
      },
      {
        platform: "github",
        label: "View GitHub profile",
        disclosure: "External site",
        href: "https://github.com/example-user",
        emphasis: "secondary",
      },
    ],
  },
  footer: {
    copy: "Portfolio Owner — Data, analytics, and applied AI.",
  },
};
