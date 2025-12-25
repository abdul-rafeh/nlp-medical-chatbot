import { IconSymbol } from "@/components/ui/icon-symbol";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Talk to me...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
          borderTopColor: colors.divider,
        },
      ]}
    >
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={2000}
          editable={!disabled}
          onSubmitEditing={handleSend}
          returnKeyType="send"
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: canSend
                ? colors.sendButton
                : colors.sendButtonDisabled,
            },
          ]}
          onPress={handleSend}
          disabled={!canSend}
          activeOpacity={0.7}
        >
          <IconSymbol name="arrow.up" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingVertical: Platform.OS === "ios" ? Spacing.xs : Spacing.xs / 2,
    minHeight: 48,
    maxHeight: 120,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: Platform.OS === "ios" ? 8 : 6,
    paddingRight: Spacing.sm,
    textAlignVertical: "center",
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Spacing.xs,
  },
});
