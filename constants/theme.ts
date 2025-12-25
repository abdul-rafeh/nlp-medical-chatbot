/**
 * Medical Chatbot Theme
 * A professional healthcare-inspired color palette with calming teal and mint tones
 */

import { Platform } from "react-native";

// Medical-themed colors - calming teal/mint palette
const primaryTeal = "#0D9488";
const primaryTealLight = "#14B8A6";
const primaryTealDark = "#0F766E";
const accentMint = "#5EEAD4";
const accentCoral = "#F97316";

export const Colors = {
  light: {
    text: "#1E293B",
    textSecondary: "#64748B",
    background: "#F8FAFC",
    backgroundSecondary: "#FFFFFF",
    tint: primaryTeal,
    icon: "#64748B",
    tabIconDefault: "#94A3B8",
    tabIconSelected: primaryTeal,
    // Chat specific
    userBubble: primaryTeal,
    userBubbleText: "#FFFFFF",
    aiBubble: "#FFFFFF",
    aiBubbleText: "#1E293B",
    inputBackground: "#FFFFFF",
    inputBorder: "#E2E8F0",
    sendButton: primaryTeal,
    sendButtonDisabled: "#CBD5E1",
    // Medical accent colors
    accent: accentMint,
    accentSecondary: accentCoral,
    cardBackground: "#FFFFFF",
    cardBorder: "#E2E8F0",
    divider: "#E2E8F0",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    // Header
    headerBackground: primaryTeal,
    headerText: "#FFFFFF",
  },
  dark: {
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    background: "#0F172A",
    backgroundSecondary: "#1E293B",
    tint: accentMint,
    icon: "#94A3B8",
    tabIconDefault: "#64748B",
    tabIconSelected: accentMint,
    // Chat specific
    userBubble: primaryTealDark,
    userBubbleText: "#FFFFFF",
    aiBubble: "#1E293B",
    aiBubbleText: "#F1F5F9",
    inputBackground: "#1E293B",
    inputBorder: "#334155",
    sendButton: primaryTealLight,
    sendButtonDisabled: "#475569",
    // Medical accent colors
    accent: accentMint,
    accentSecondary: accentCoral,
    cardBackground: "#1E293B",
    cardBorder: "#334155",
    divider: "#334155",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    // Header
    headerBackground: "#1E293B",
    headerText: "#F1F5F9",
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
    sans: "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', sans-serif",
    mono: "'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

// Spacing scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius scale
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
