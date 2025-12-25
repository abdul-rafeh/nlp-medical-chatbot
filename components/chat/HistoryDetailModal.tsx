import { IconSymbol } from "@/components/ui/icon-symbol";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { HistoryItem } from "@/types/api";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HistoryDetailModalProps {
  visible: boolean;
  onClose: () => void;
  historyItem: HistoryItem | null;
}

export function HistoryDetailModal({
  visible,
  onClose,
  historyItem,
}: HistoryDetailModalProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  if (!historyItem) {
    return null;
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIntentLabel = (intent: string) => {
    const intentLabels: Record<string, string> = {
      causes: "Causes",
      definition: "Definition",
      other: "Other",
      prevention: "Prevention",
      risks: "Risks",
      symptoms: "Symptoms",
      treatment: "Treatment",
    };
    return intentLabels[intent] || intent;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: colors.backgroundSecondary,
              borderTopColor: colors.divider,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.handleContainer}>
            <View
              style={[styles.handle, { backgroundColor: colors.divider }]}
            />
          </View>

          <View style={[styles.header, { borderBottomColor: colors.divider }]}>
            <Text style={[styles.title, { color: colors.text }]}>
              Conversation Details
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <IconSymbol name="xmark" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.contentContainer}
            nestedScrollEnabled={true}
          >
            <View style={styles.section}>
              <Text
                style={[styles.sectionTitle, { color: colors.textSecondary }]}
              >
                Question
              </Text>
              <View
                style={[
                  styles.messageBubble,
                  { backgroundColor: colors.userBubble },
                ]}
              >
                <Text
                  style={[styles.messageText, { color: colors.userBubbleText }]}
                  selectable
                >
                  {historyItem.question}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.metaRow}>
                <Text
                  style={[styles.sectionTitle, { color: colors.textSecondary }]}
                >
                  Answer
                </Text>
                <View
                  style={[
                    styles.intentBadge,
                    { backgroundColor: colors.accent + "20" },
                  ]}
                >
                  <Text style={[styles.intentText, { color: colors.accent }]}>
                    {getIntentLabel(historyItem.intent)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.messageBubble,
                  { backgroundColor: colors.aiBubble },
                ]}
              >
                <Text
                  style={[styles.messageText, { color: colors.aiBubbleText }]}
                  selectable
                >
                  {historyItem.answer}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text
                style={[styles.sectionTitle, { color: colors.textSecondary }]}
              >
                Timestamp
              </Text>
              <Text
                style={[styles.timestampText, { color: colors.textSecondary }]}
              >
                {formatDate(historyItem.timestamp)}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    maxHeight: "90%",
    height: "85%",
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    maxHeight: "100%",
  },
  contentContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  messageBubble: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  intentBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  intentText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  timestampText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
