/**
 * Professional, calm color palette for Agetech Connect
 * Healthcare-adjacent, trustworthy, accessible design
 */

import { Platform } from 'react-native';

// Primary accent color - calm, professional blue
const primaryColor = '#2563EB'; // Trustworthy blue
const primaryColorDark = '#3B82F6';

export const Colors = {
  light: {
    text: '#1F2937', // Dark gray for readability
    textSecondary: '#6B7280', // Medium gray for secondary text
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB', // Subtle gray background
    tint: primaryColor,
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: primaryColor,
    border: '#E5E7EB', // Subtle borders
    cardBackground: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.1)',
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    // Stage badges
    pilot: '#8B5CF6', // Purple
    earlyCommercial: '#3B82F6', // Blue
    mature: '#10B981', // Green
  },
  dark: {
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    background: '#111827',
    backgroundSecondary: '#1F2937',
    tint: primaryColorDark,
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: primaryColorDark,
    border: '#374151',
    cardBackground: '#1F2937',
    shadow: 'rgba(0, 0, 0, 0.3)',
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    // Stage badges
    pilot: '#A78BFA',
    earlyCommercial: '#60A5FA',
    mature: '#34D399',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
