/**
 * Environment-aware navigation configuration for Techmiyaedtech-tutorials
 * Automatically switches between local dev ports (3000 / 8081) and production domains.
 */

export const getMainSiteBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:3000";
    }
  }
  return import.meta.env?.VITE_MAIN_SITE_URL || "https://www.techmiyaedtech.com";
};

export const getTutorialsBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:8080";
    }
  }
  return import.meta.env?.VITE_TUTORIALS_URL || "https://tutorials.techmiyaedtech.com";
};
