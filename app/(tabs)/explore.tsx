import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface HealthResource {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
}

interface HealthTip {
  id: string;
  icon: string;
  title: string;
  content: string;
}

const HEALTH_RESOURCES: HealthResource[] = [
  {
    id: '1',
    icon: '🏥',
    title: 'Find a Doctor',
    description: 'Locate healthcare providers near you',
    category: 'Care',
  },
  {
    id: '2',
    icon: '💊',
    title: 'Drug Information',
    description: 'Learn about medications and interactions',
    category: 'Medications',
  },
  {
    id: '3',
    icon: '🩺',
    title: 'Symptom Checker',
    description: 'Understand your symptoms better',
    category: 'Tools',
  },
  {
    id: '4',
    icon: '📋',
    title: 'Health Records',
    description: 'Access your medical history',
    category: 'Records',
  },
];

const HEALTH_TIPS: HealthTip[] = [
  {
    id: '1',
    icon: '💧',
    title: 'Stay Hydrated',
    content: 'Drink at least 8 glasses of water daily to maintain optimal body function.',
  },
  {
    id: '2',
    icon: '🛌',
    title: 'Quality Sleep',
    content: 'Aim for 7-9 hours of quality sleep each night for better health.',
  },
  {
    id: '3',
    icon: '🧘',
    title: 'Mental Wellness',
    content: 'Practice mindfulness or meditation to reduce stress and anxiety.',
  },
  {
    id: '4',
    icon: '🥗',
    title: 'Balanced Diet',
    content: 'Include fruits, vegetables, and whole grains in your daily meals.',
  },
];

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { 
        backgroundColor: colors.headerBackground,
        paddingTop: insets.top + Spacing.sm,
      }]}>
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>
          Health Resources
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.headerText, opacity: 0.8 }]}>
          Learn more about your health
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.resourcesGrid}>
            {HEALTH_RESOURCES.map((resource) => (
              <TouchableOpacity
                key={resource.id}
                style={[styles.resourceCard, {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder,
                }]}
                activeOpacity={0.7}
              >
                <Text style={styles.resourceIcon}>{resource.icon}</Text>
                <Text style={[styles.resourceTitle, { color: colors.text }]}>
                  {resource.title}
                </Text>
                <Text style={[styles.resourceDesc, { color: colors.textSecondary }]}>
                  {resource.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Daily Health Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Daily Health Tips
          </Text>
          {HEALTH_TIPS.map((tip) => (
            <View
              key={tip.id}
              style={[styles.tipCard, {
                backgroundColor: colors.cardBackground,
                borderColor: colors.cardBorder,
              }]}
            >
              <View style={[styles.tipIconContainer, { backgroundColor: colors.accent + '20' }]}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={[styles.tipTitle, { color: colors.text }]}>
                  {tip.title}
                </Text>
                <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                  {tip.content}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={[styles.disclaimer, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
          <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.warning} />
          <Text style={[styles.disclaimerText, { color: colors.textSecondary }]}>
            This app provides general health information only. Always consult with a qualified healthcare provider for medical advice.
          </Text>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  resourceCard: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  resourceIcon: {
    fontSize: 28,
    marginBottom: Spacing.sm,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  tipCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    alignItems: 'flex-start',
  },
  tipIconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  tipIcon: {
    fontSize: 22,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    lineHeight: 18,
  },
  disclaimer: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
});
