import { IconSymbol } from "@/components/ui/icon-symbol";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatHeaderProps {
  onNewChat?: () => void;
  onOpenHistory?: () => void;
}

export function ChatHeader({ onNewChat, onOpenHistory }: ChatHeaderProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.headerBackground,
          paddingTop: insets.top + Spacing.sm,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onOpenHistory}
        activeOpacity={0.7}
      >
        <IconSymbol name="list.bullet" size={22} color={colors.headerText} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <View
          style={[
            styles.logoContainer,
            { backgroundColor: "rgba(255,255,255,0.15)" },
          ]}
        >
          <Text style={styles.logoEmoji}>🏥</Text>
        </View>
        <View>
          <Text style={[styles.title, { color: colors.headerText }]}>
            MediAssist
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.headerText, opacity: 0.8 },
            ]}
          >
            Your Health Assistant
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={onNewChat}
        activeOpacity={0.7}
      >
        <IconSymbol
          name="square.and.pencil"
          size={22}
          color={colors.headerText}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  logoEmoji: {
    fontSize: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
  },
});
