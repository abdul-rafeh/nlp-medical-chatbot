import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const MEDICAL_PROMPTS = [
  {
    icon: '🤒',
    title: 'Symptom Check',
    prompt: 'I have a headache and mild fever. What could be causing this?',
  },
  {
    icon: '💊',
    title: 'Medication Info',
    prompt: 'What are the common side effects of ibuprofen?',
  },
  {
    icon: '🏃',
    title: 'Wellness Tips',
    prompt: 'How can I improve my sleep quality naturally?',
  },
  {
    icon: '🥗',
    title: 'Nutrition Advice',
    prompt: 'What foods should I eat to boost my immune system?',
  },
];

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        How can I help you today?
      </Text>
      <View style={styles.promptsGrid}>
        {MEDICAL_PROMPTS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.promptCard, {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            }]}
            onPress={() => onSelectPrompt(item.prompt)}
            activeOpacity={0.7}
          >
            <Text style={styles.promptIcon}>{item.icon}</Text>
            <Text style={[styles.promptTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text 
              style={[styles.promptText, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {item.prompt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  promptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'center',
  },
  promptCard: {
    width: '47%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minHeight: 130,
  },
  promptIcon: {
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  promptTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  promptText: {
    fontSize: 12,
    lineHeight: 16,
  },
});


