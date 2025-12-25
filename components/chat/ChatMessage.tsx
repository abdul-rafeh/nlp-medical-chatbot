import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DebugInfo, Intent, Source } from "@/types/api";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  intent?: Intent;
  sources?: Source[];
  debug?: DebugInfo | null;
}

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
  onSourcePress?: (debugInfo: DebugInfo | null) => void;
}

export function ChatMessage({
  message,
  isTyping = false,
  onSourcePress,
}: ChatMessageProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (isTyping) {
    return (
      <View style={[styles.container, styles.aiContainer]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>🏥</Text>
          </View>
        </View>
        <View
          style={[
            styles.bubble,
            styles.aiBubble,
            { backgroundColor: colors.aiBubble },
          ]}
        >
          <TypingIndicator color={colors.textSecondary} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        message.isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      {!message.isUser && (
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>🏥</Text>
          </View>
        </View>
      )}
      <View
        style={[
          styles.bubbleWrapper,
          message.isUser ? styles.userBubbleWrapper : styles.aiBubbleWrapper,
        ]}
      >
        <View
          style={[
            styles.bubble,
            message.isUser
              ? [styles.userBubble, { backgroundColor: colors.userBubble }]
              : [styles.aiBubble, { backgroundColor: colors.aiBubble }],
          ]}
        >
          <Text
            style={[
              styles.messageText,
              {
                color: message.isUser
                  ? colors.userBubbleText
                  : colors.aiBubbleText,
              },
            ]}
          >
            {message.text}
          </Text>
          {!message.isUser &&
            message.sources &&
            message.sources.length > 0 &&
            message.debug && (
              <View
                style={[
                  styles.sourcesContainer,
                  { borderTopColor: colors.divider },
                ]}
              >
                <Text
                  style={[styles.sourcesTitle, { color: colors.textSecondary }]}
                >
                  Sources:
                </Text>
                <TouchableOpacity
                  style={[
                    styles.sourcesClickableArea,
                    { backgroundColor: colors.backgroundSecondary },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => onSourcePress?.(message.debug || null)}
                >
                  {message.sources.map((source) => (
                    <View key={source.id} style={styles.sourceItem}>
                      <Text style={[styles.sourceId, { color: colors.accent }]}>
                        [{source.id}]
                      </Text>
                      <Text
                        style={[
                          styles.sourceText,
                          { color: colors.textSecondary },
                        ]}
                        numberOfLines={2}
                      >
                        {source.text}
                      </Text>
                    </View>
                  ))}
                  <Text style={[styles.debugHint, { color: colors.accent }]}>
                    Tap to view debug information →
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
        <Text
          style={[
            styles.timestamp,
            { color: colors.textSecondary },
            message.isUser ? styles.timestampRight : styles.timestampLeft,
          ]}
        >
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

function TypingIndicator({ color }: { color: string }) {
  const [dots] = React.useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  React.useEffect(() => {
    const animations = dots.map((dot, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.parallel(animations).start();

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, [dots]);

  return (
    <View style={styles.typingContainer}>
      {dots.map((dot, index) => (
        <Animated.View
          key={index}
          style={[
            styles.typingDot,
            { backgroundColor: color },
            {
              transform: [
                {
                  translateY: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -4],
                  }),
                },
              ],
              opacity: dot.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 1],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  aiContainer: {
    justifyContent: "flex-start",
  },
  avatarContainer: {
    marginRight: Spacing.sm,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
  },
  bubbleWrapper: {
    maxWidth: "75%",
  },
  userBubbleWrapper: {
    alignItems: "flex-end",
  },
  aiBubbleWrapper: {
    alignItems: "flex-start",
  },
  bubble: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    borderBottomRightRadius: BorderRadius.sm,
  },
  aiBubble: {
    borderBottomLeftRadius: BorderRadius.sm,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
  timestampLeft: {
    marginLeft: 4,
  },
  timestampRight: {
    marginRight: 4,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sourcesContainer: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  sourcesTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  sourcesClickableArea: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    marginTop: Spacing.xs,
  },
  sourceItem: {
    flexDirection: "row",
    marginBottom: Spacing.xs,
    gap: Spacing.xs,
  },
  debugHint: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: Spacing.xs,
    fontStyle: "italic",
  },
  sourceId: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 24,
  },
  sourceText: {
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },
});
