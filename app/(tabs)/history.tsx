import { HistoryDetailModal } from "@/components/chat/HistoryDetailModal";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ApiError, getHistory } from "@/services/api";
import { HistoryItem } from "@/types/api";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] =
    useState<HistoryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      const response = await getHistory();
      setHistory(response.history || []);
    } catch (err) {
      console.error("Error fetching history:", err);
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : "Failed to load history. Please try again.";
      setError(errorMessage);
      setHistory([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHistory();
  }, [fetchHistory]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
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

  const handleHistoryItemPress = useCallback((item: HistoryItem) => {
    setSelectedHistoryItem(item);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedHistoryItem(null);
  }, []);

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity
      style={[
        styles.historyItem,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
        },
      ]}
      activeOpacity={0.7}
      onPress={() => handleHistoryItemPress(item)}
    >
      <View style={styles.historyContent}>
        <View style={styles.historyHeader}>
          <View style={styles.titleContainer}>
            <Text
              style={[styles.historyTitle, { color: colors.text }]}
              numberOfLines={1}
            >
              {item.question}
            </Text>
            <View
              style={[
                styles.intentBadge,
                { backgroundColor: colors.accent + "20" },
              ]}
            >
              <Text style={[styles.intentText, { color: colors.accent }]}>
                {getIntentLabel(item.intent)}
              </Text>
            </View>
          </View>
          <Text style={[styles.historyTime, { color: colors.textSecondary }]}>
            {formatDate(item.timestamp)}
          </Text>
        </View>
        <Text
          style={[styles.historyPreview, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {item.answer}
        </Text>
      </View>
      <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text
            style={[
              styles.emptySubtitle,
              { color: colors.textSecondary, marginTop: Spacing.md },
            ]}
          >
            Loading history...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyState}>
          <View
            style={[
              styles.emptyIcon,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={styles.emptyEmoji}>⚠️</Text>
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Error loading history
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {error}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <View
          style={[styles.emptyIcon, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={styles.emptyEmoji}>💬</Text>
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          No conversations yet
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Start chatting with MediAssist to see your conversation history here
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.headerBackground,
            paddingTop: insets.top + Spacing.sm,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.headerText }]}>
          Chat History
        </Text>
      </View>

      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => `${item.timestamp}-${index}`}
        contentContainerStyle={[
          styles.listContent,
          (history.length === 0 || loading) && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />

      <HistoryDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        historyItem={selectedHistoryItem}
      />
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
    fontWeight: "700",
    textAlign: "center",
  },
  listContent: {
    padding: Spacing.md,
  },
  emptyListContent: {
    flex: 1,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  historyContent: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginRight: Spacing.sm,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  intentBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  intentText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  historyTime: {
    fontSize: 12,
  },
  historyPreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  emptyEmoji: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
