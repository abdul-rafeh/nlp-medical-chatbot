import { IconSymbol } from "@/components/ui/icon-symbol";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DebugInfo } from "@/types/api";
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

interface DebugModalProps {
  visible: boolean;
  onClose: () => void;
  debugInfo: DebugInfo | null;
}

export function DebugModal({ visible, onClose, debugInfo }: DebugModalProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  if (!debugInfo) {
    return null;
  }

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
              Debug Information
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
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Predicted Intent
              </Text>
              <View
                style={[
                  styles.valueContainer,
                  { backgroundColor: colors.background },
                ]}
              >
                <Text style={[styles.valueText, { color: colors.accent }]}>
                  {debugInfo.predicted_intent}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Knowledge Base Used
              </Text>
              <View
                style={[
                  styles.valueContainer,
                  { backgroundColor: colors.background },
                ]}
              >
                <Text style={[styles.valueText, { color: colors.text }]}>
                  {debugInfo.kb_used}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Number of Retrieved Documents
              </Text>
              <View
                style={[
                  styles.valueContainer,
                  { backgroundColor: colors.background },
                ]}
              >
                <Text style={[styles.valueText, { color: colors.text }]}>
                  {debugInfo.num_retrieved_docs}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Retrieved Answers (Raw)
              </Text>
              {debugInfo.retrieved_answers_raw.map((answer, index) => (
                <View
                  key={index}
                  style={[
                    styles.valueContainer,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <Text
                    style={[styles.valueText, { color: colors.text }]}
                    selectable
                  >
                    [{index + 1}] {answer}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                LLM Prompt
              </Text>
              <View
                style={[
                  styles.valueContainer,
                  styles.promptContainer,
                  { backgroundColor: colors.background },
                ]}
              >
                <Text
                  style={[
                    styles.valueText,
                    styles.promptText,
                    { color: colors.text },
                  ]}
                  selectable
                >
                  {debugInfo.llm_prompt}
                </Text>
              </View>
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
    height: "80%",
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
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  valueContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  valueText: {
    fontSize: 13,
    lineHeight: 20,
  },
  promptContainer: {
    maxHeight: 200,
  },
  promptText: {
    fontFamily: "monospace",
    fontSize: 12,
  },
});
