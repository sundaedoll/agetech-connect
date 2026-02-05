/**
 * Professional, calm color palette for Agetech Connect
 * Healthcare-adjacent, trustworthy, accessible design
 */

import { Platform } from "react-native";

// Auth / branding colors (from design spec)
export const TrustTeal = "#008080"; // Primary buttons, progress bars, active states
export const TechBlue = "#2C3E50"; // Primary headings, navigation icons

// Shared text/background constants (for static styles)
export const TEXT_PRIMARY = "#000000";
export const TEXT_SECONDARY = "#454545";
export const AUTH_BG = "#FFFFFF";

// Light theme color scheme
export const LightThemeColors = {
  black: "#000000",
  darkTeal: "#196795",
  mediumBlue: "#3F92C3",
  darkGray: "#454545",
  lightTeal: "#9DD2D7",
  lightGray: "#EAEAEA",
  gold: "#F1B000",
  lightBlue: "#F4FAFF",
  offWhite: "#F8F8F8",
  yellow: "#FFCC41",
  cream: "#FFFCF2",
  white: "#FFFFFF",
} as const;

// Primary accent color - calm, professional blue
const primaryColor = "#2563EB"; // Trustworthy blue
const primaryColorDark = "#3B82F6";

export const Colors = {
  light: {
    text: LightThemeColors.black,
    textSecondary: LightThemeColors.darkGray,
    background: LightThemeColors.white,
    backgroundSecondary: LightThemeColors.offWhite,
    tint: LightThemeColors.darkTeal,
    icon: LightThemeColors.darkGray,
    tabIconDefault: LightThemeColors.darkGray,
    tabIconSelected: LightThemeColors.darkTeal,
    border: LightThemeColors.lightGray,
    cardBackground: LightThemeColors.white,
    shadow: "rgba(0, 0, 0, 0.1)",
    // Status colors
    success: LightThemeColors.darkTeal,
    warning: LightThemeColors.gold,
    error: "#EF4444",
    // Stage badges
    pilot: LightThemeColors.lightTeal,
    earlyCommercial: LightThemeColors.mediumBlue,
    mature: LightThemeColors.darkTeal,
    // Extended light theme palette (for custom use)
    ...LightThemeColors,
  },
  dark: {
    text: "#F9FAFB",
    textSecondary: "#D1D5DB",
    background: "#111827",
    backgroundSecondary: "#1F2937",
    tint: primaryColorDark,
    icon: "#9CA3AF",
    tabIconDefault: "#6B7280",
    tabIconSelected: primaryColorDark,
    border: "#374151",
    cardBackground: "#1F2937",
    shadow: "rgba(0, 0, 0, 0.3)",
    // Status colors
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    // Stage badges
    pilot: "#A78BFA",
    earlyCommercial: "#60A5FA",
    mature: "#34D399",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
