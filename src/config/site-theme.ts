export const siteTheme = "light" as const;

export type SiteTheme = typeof siteTheme;

export const siteThemeClassName = `theme-${siteTheme}`;
