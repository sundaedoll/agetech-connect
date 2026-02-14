/**
 * AgeTech Connect – blue + light background, yellow for accents
 *
 * Role map:
 * - Main CTA: #196795
 * - Secondary (links, icons): #3F92C3
 * - Selected outline: #F1B000 (box borders)
 * - Selected fill: (muted golden – for selected box background)
 * - Accent: #F1B000 (progress, badges)
 * - Background: #F4FAFF, Card: #FFFCF2
 */

import { Platform } from "react-native";

export const Palette = {
  darkBlue: "#196795", // Main CTA, headings
  mediumBlue: "#3F92C3", // Links, secondary actions, input focus
  lightBlue: "#9DD2D7", // Borders, inactive, progress track
  outline: "#F1B000", // Selected box outline, progress, badges
  fill: "#FFE100", // Selected box fill (light mode)
  fillDark: "#8B6914", // Selected box fill – dark yellow (dark mode)
  warmBg: "#FFFCF2", // Card / form background
  coolBg: "#F4FAFF", // Main app background
} as const;

export const TrustTeal = Palette.darkBlue;
export const TechBlue = Palette.darkBlue;
export const AUTH_BG = Palette.coolBg;
export const TEXT_PRIMARY = "#000000";
export const TEXT_SECONDARY = "#454545";

export const LightThemeColors = {
  black: "#000000",
  white: "#FFFFFF",
  darkGray: "#454545",
  lightGray: "#E5E5E5",
  ...Palette,
} as const;

export const Colors = {
  light: {
    text: "#000000",
    textSecondary: "#454545",
    background: Palette.coolBg,
    backgroundSecondary: Palette.warmBg,
    tint: Palette.darkBlue,
    secondary: Palette.mediumBlue,
    selectedOutline: Palette.outline,
    selectedFill: Palette.fill,
    accent: Palette.outline,
    icon: "#454545",
    tabIconDefault: "#454545",
    tabIconSelected: Palette.darkBlue,
    border: Palette.lightBlue,
    cardBackground: Palette.warmBg,
    inputBackground: "#FFFFFF",
    inputFocusBorder: Palette.mediumBlue,
    shadow: "rgba(0, 0, 0, 0.08)",
    success: Palette.mediumBlue,
    warning: Palette.outline,
    error: "#EF4444",
    pilot: Palette.outline,
    earlyCommercial: Palette.mediumBlue,
    mature: Palette.darkBlue,
    ...LightThemeColors,
  },
  dark: {
    text: "#F9FAFB",
    textSecondary: "#E5E7EB",
    background: "#0A0A0A",
    backgroundSecondary: "#171717",
    tint: Palette.darkBlue,
    secondary: Palette.mediumBlue,
    selectedOutline: Palette.outline,
    selectedFill: Palette.fillDark,
    accent: Palette.outline,
    icon: "#9CA3AF",
    tabIconDefault: "#6B7280",
    tabIconSelected: Palette.mediumBlue,
    border: "#2A2A2A",
    cardBackground: "#171717",
    inputBackground: "#1F1F1F",
    inputFocusBorder: Palette.mediumBlue,
    shadow: "rgba(0, 0, 0, 0.4)",
    success: Palette.mediumBlue,
    warning: Palette.outline,
    error: "#EF4444",
    pilot: Palette.outline,
    earlyCommercial: Palette.mediumBlue,
    mature: Palette.lightBlue,
    ...LightThemeColors,
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
