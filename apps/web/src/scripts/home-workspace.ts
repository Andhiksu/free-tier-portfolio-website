import {
  buildHomepageWorkspaceHash,
  getWorkspaceDestinationFromHash,
  isLegacyWorkspaceHash,
  WORKSPACE_DESTINATIONS,
  type WorkspaceDestination,
} from "../lib/routes";

const workspace = document.querySelector("[data-home-workspace]");

if (workspace instanceof HTMLElement) {
  const panels = Array.from(
    workspace.querySelectorAll<HTMLElement>("[data-workspace-panel]"),
  );
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-workspace-link]"),
  );
  type WorkspaceId = WorkspaceDestination;
  const panelById = new Map(
    panels
      .filter((panel) => panel.dataset.workspacePanel)
      .map(
        (panel) =>
          [panel.dataset.workspacePanel as WorkspaceId, panel] as const,
      ),
  );

  if (panelById.has("home")) {
    const readHashId = (hash: string) => {
      try {
        return decodeURIComponent(hash.replace(/^#/, ""));
      } catch {
        return "";
      }
    };

    const canonicalizeWorkspaceHash = (hash: string): `#${WorkspaceId}` => {
      return buildHomepageWorkspaceHash(getWorkspaceDestinationFromHash(hash));
    };

    const credentialSubTabs = [
      "education",
      "certifications",
      "honors",
      "publications",
    ];

    const readNestedWorkspaceId = (hash: string): WorkspaceId | undefined => {
      const hashId = readHashId(hash);

      if (credentialSubTabs.includes(hashId)) {
        return "credentials";
      }

      const target = document.getElementById(hashId);
      const parentPanel = target?.closest<HTMLElement>(
        "[data-workspace-panel]",
      );
      const parentPanelId = parentPanel?.dataset.workspacePanel as
        WorkspaceId | undefined;

      if (
        hashId === "about" &&
        parentPanelId === "home" &&
        panelById.has("home")
      ) {
        return "about";
      }

      if (parentPanelId && panelById.has(parentPanelId)) {
        return parentPanelId;
      }

      return hashId.startsWith("credentials-") &&
        target?.closest("#credentials")
        ? "credentials"
        : undefined;
    };

    const readActiveWorkspaceHash = (): `#${WorkspaceId}` => {
      const activeView = workspace.dataset.activeView ?? "";
      const currentHashId = readHashId(window.location.hash);

      if (credentialSubTabs.includes(currentHashId)) {
        return `#${currentHashId}` as `#${WorkspaceId}`;
      }

      if (
        !window.location.hash &&
        WORKSPACE_DESTINATIONS.includes(activeView as WorkspaceId)
      ) {
        return `#${activeView as WorkspaceId}`;
      }

      const nestedWorkspaceId = readNestedWorkspaceId(window.location.hash);

      return nestedWorkspaceId
        ? `#${nestedWorkspaceId}`
        : canonicalizeWorkspaceHash(window.location.hash);
    };

    const syncLocaleLinksWithWorkspace = () => {
      const activeHash = readActiveWorkspaceHash();
      const currentHashId = readHashId(window.location.hash);
      const preservesCredentialCategory = Array.from(
        document.querySelectorAll<HTMLElement>("[data-credential-tab]"),
      ).some((tab) => tab.dataset.credentialTab === currentHashId);
      const preservesCredentialRecord = Array.from(
        document.querySelectorAll<HTMLElement>("[data-credential-detail]"),
      ).some((detail) => detail.dataset.credentialDetail === currentHashId);
      const localeHash =
        preservesCredentialCategory || preservesCredentialRecord
          ? `#${currentHashId}`
          : activeHash;

      document
        .querySelectorAll<HTMLAnchorElement>("[data-locale-link]")
        .forEach((link) => {
          const targetUrl = new URL(link.href, window.location.href);
          targetUrl.hash = localeHash;
          link.href = targetUrl.href;
        });
    };

    const normalizeWorkspaceHash = (canonicalHash: `#${WorkspaceId}`) => {
      const hashId = readHashId(window.location.hash);

      if (
        !isLegacyWorkspaceHash(`#${hashId}`) ||
        window.location.hash === canonicalHash
      ) {
        return;
      }

      const normalizedUrl = new URL(window.location.href);
      normalizedUrl.hash = canonicalHash;
      window.history.replaceState(null, "", normalizedUrl);
    };

    const focusPanelHeading = (panel: HTMLElement) => {
      const heading = panel.querySelector<HTMLElement>("h1, h2");

      if (!heading) {
        return;
      }

      panels.forEach((candidate) => {
        candidate
          .querySelector<HTMLElement>("h1[tabindex], h2[tabindex]")
          ?.removeAttribute("tabindex");
      });

      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      heading.addEventListener(
        "blur",
        () => heading.removeAttribute("tabindex"),
        { once: true },
      );
    };

    const activatePanel = (
      panelId: WorkspaceId,
      options: { focus: boolean; hash?: `#${WorkspaceId}` } = {
        focus: false,
      },
    ) => {
      const activePanel = panelById.get(panelId) ?? panelById.get("home");

      if (!activePanel) {
        return;
      }

      activePanel.hidden = false;
      const activePanelId = activePanel.dataset.workspacePanel as WorkspaceId;
      workspace.dataset.activeView = activePanelId;

      panels.forEach((panel) => {
        const isActive = panel === activePanel;
        panel.dataset.workspaceActive = String(isActive);
      });

      links.forEach((link) => {
        const isCurrent =
          canonicalizeWorkspaceHash(link.hash) === `#${activePanelId}`;

        if (isCurrent) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      if (options.focus) {
        focusPanelHeading(activePanel);
      }

      panels.forEach((panel) => {
        panel.hidden = panel !== activePanel;
      });

      if (options.hash && window.location.hash !== options.hash) {
        const nextUrl = new URL(window.location.href);
        nextUrl.hash = options.hash;
        window.history.pushState(null, "", nextUrl);
      }

      syncLocaleLinksWithWorkspace();
    };

    const activateLocationWorkspace = (focus: boolean) => {
      const nestedWorkspaceId = readNestedWorkspaceId(window.location.hash);

      if (nestedWorkspaceId) {
        activatePanel(nestedWorkspaceId, { focus });
        return;
      }

      const canonicalHash = canonicalizeWorkspaceHash(window.location.hash);
      normalizeWorkspaceHash(canonicalHash);
      activatePanel(readHashId(canonicalHash) as WorkspaceId, { focus });
    };

    workspace.dataset.workspaceReady = "";
    document.documentElement.dataset.homeWorkspaceReady = "";
    activateLocationWorkspace(false);

    document.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      if (event.target.closest("[data-credential-tab]")) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>(
        'a[data-workspace-link], a[href^="#"]',
      );

      if (!link) {
        return;
      }

      const targetUrl = new URL(link.href, window.location.href);

      if (targetUrl.pathname !== window.location.pathname) {
        return;
      }

      const hashId = readHashId(targetUrl.hash);
      const isWorkspaceHash =
        WORKSPACE_DESTINATIONS.includes(hashId as WorkspaceId) ||
        isLegacyWorkspaceHash(targetUrl.hash);

      if (!isWorkspaceHash) {
        return;
      }

      event.preventDefault();
      const canonicalHash = canonicalizeWorkspaceHash(targetUrl.hash);
      activatePanel(readHashId(canonicalHash) as WorkspaceId, {
        focus: true,
        hash: canonicalHash,
      });
    });

    window.addEventListener("popstate", () => activateLocationWorkspace(true));
    window.addEventListener("hashchange", () =>
      activateLocationWorkspace(true),
    );
  }
}
