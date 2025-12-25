import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { DebugModal } from "@/components/chat/DebugModal";
import { SuggestedPrompts } from "@/components/chat/SuggestedPrompts";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ApiError, askQuestion } from "@/services/api";
import { DebugInfo } from "@/types/api";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [debugModalVisible, setDebugModalVisible] = useState(false);
  const [selectedDebugInfo, setSelectedDebugInfo] = useState<DebugInfo | null>(
    null
  );
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const fetchAIResponse = useCallback(
    async (userMessage: string) => {
      setIsTyping(true);

      try {
        const response = await askQuestion(userMessage, debugMode);

        const aiResponse: Message = {
          id: Date.now().toString(),
          text: response.answer,
          isUser: false,
          timestamp: new Date(),
          intent: response.intent as any,
          sources: response.sources,
          debug: response.debug || null,
        };

        setMessages((prev) => [...prev, aiResponse]);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching AI response:", error);

        // Show error message to user
        const errorMessage =
          error instanceof ApiError
            ? error.message
            : "Failed to get response. Please try again.";

        Alert.alert("Error", errorMessage, [{ text: "OK" }]);

        // Optionally add an error message to the chat
        const errorResponse: Message = {
          id: Date.now().toString(),
          text: "Sorry, I encountered an error while processing your question. Please try again or check your connection.",
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorResponse]);
        scrollToBottom();
      } finally {
        setIsTyping(false);
      }
    },
    [scrollToBottom, debugMode]
  );

  const handleSend = useCallback(
    (text: string) => {
      Keyboard.dismiss();

      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      scrollToBottom();

      // Fetch AI response from API
      fetchAIResponse(text);
    },
    [fetchAIResponse, scrollToBottom]
  );

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  const handleSelectPrompt = useCallback(
    (prompt: string) => {
      handleSend(prompt);
    },
    [handleSend]
  );

  const handleSourcePress = useCallback((debugInfo: DebugInfo | null) => {
    setSelectedDebugInfo(debugInfo);
    setDebugModalVisible(true);
  }, []);

  const handleCloseDebugModal = useCallback(() => {
    setDebugModalVisible(false);
    setSelectedDebugInfo(null);
  }, []);

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => (
      <ChatMessage message={item} onSourcePress={handleSourcePress} />
    ),
    [handleSourcePress]
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <SuggestedPrompts onSelectPrompt={handleSelectPrompt} />
    </View>
  );

  const renderFooter = () => {
    if (isTyping) {
      return (
        <ChatMessage
          message={{
            id: "typing",
            text: "",
            isUser: false,
            timestamp: new Date(),
          }}
          isTyping
        />
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ChatHeader onNewChat={handleNewChat} onOpenHistory={() => {}} />

      <View
        style={[
          styles.debugBar,
          {
            backgroundColor: colors.backgroundSecondary,
            borderBottomColor: colors.divider,
          },
        ]}
      >
        <View style={styles.debugContent}>
          <Text style={[styles.debugLabel, { color: colors.textSecondary }]}>
            Debug Mode
          </Text>
          <Switch
            value={debugMode}
            onValueChange={setDebugMode}
            trackColor={{ false: colors.divider, true: colors.accent }}
            thumbColor={
              debugMode ? colors.background : colors.backgroundSecondary
            }
            ios_backgroundColor={colors.divider}
          />
        </View>
      </View>

      <View style={styles.chatContainer}>
        {messages.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[
              styles.messagesList,
              { paddingBottom: Spacing.md },
            ]}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            onContentSizeChange={scrollToBottom}
            keyboardDismissMode="interactive"
          />
        )}
      </View>

      <ChatInput onSend={handleSend} disabled={isTyping} />

      <DebugModal
        visible={debugModalVisible}
        onClose={handleCloseDebugModal}
        debugInfo={selectedDebugInfo}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  messagesList: {
    paddingTop: Spacing.md,
  },
  debugBar: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  debugContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  debugLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
});
