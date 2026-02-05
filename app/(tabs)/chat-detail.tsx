import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock messages per chat - in real app, fetch by chatId
const mockMessagesByChat: Record<string, typeof mockMessages> = {
  '1': [
    {
      id: '1',
      text: 'Hello! I saw your profile and thought we might be a good match.',
      sender: 'them',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      text: "Hi! I'd love to learn more about your solutions.",
      sender: 'me',
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      text: 'Great! We specialize in health monitoring systems. What are you looking for specifically?',
      sender: 'them',
      timestamp: '10:35 AM',
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Thanks for connecting. When would you like to schedule a demo?',
      sender: 'them',
      timestamp: 'Yesterday',
    },
  ],
  '3': [
    {
      id: '1',
      text: "Hi! I'd love to learn more about your solutions.",
      sender: 'me',
      timestamp: 'Mon',
    },
  ],
};

const mockMessages = [
  {
    id: '1',
    text: 'Hello! I saw your profile and thought we might be a good match.',
    sender: 'them' as const,
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: "Hi! I'd love to learn more about your solutions.",
    sender: 'me' as const,
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    text: 'Great! We specialize in health monitoring systems. What are you looking for specifically?',
    sender: 'them' as const,
    timestamp: '10:35 AM',
  },
];

const chatNames: Record<string, string> = {
  '1': 'CareTech Solutions',
  '2': 'SeniorCare Innovations',
  '3': 'WellnessTracker Pro',
};

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const initialMessages =
    (chatId && mockMessagesByChat[chatId]) || mockMessages;
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const chatName = (chatId && chatNames[chatId]) || 'Chat';

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'me' as const,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }: { item: typeof mockMessages[0] }) => {
    const isMe = item.sender === 'me';

    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.theirMessageContainer,
        ]}>
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isMe ? colors.tint : colors.backgroundSecondary,
              alignSelf: isMe ? 'flex-end' : 'flex-start',
            },
          ]}>
          <ThemedText
            style={[
              styles.messageText,
              {
                color: isMe ? '#FFFFFF' : colors.text,
              },
            ]}>
            {item.text}
          </ThemedText>
        </View>
        <ThemedText
          style={[
            styles.timestamp,
            {
              color: colors.textSecondary,
              alignSelf: isMe ? 'flex-end' : 'flex-start',
            },
          ]}>
          {item.timestamp}
        </ThemedText>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {/* Header with back */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => router.replace('./messages' as any)}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <MaterialIcons name="chevron-left" size={28} color={colors.text} />
          </TouchableOpacity>
          <ThemedText type="title" style={[styles.headerTitle, { color: colors.text }]}>
            {chatName}
          </ThemedText>
          <View style={styles.backButton} />
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
        />

        {/* Input Area */}
        <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundSecondary,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message…"
            placeholderTextColor={colors.textSecondary}
            multiline
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim() ? colors.tint : colors.border,
              },
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}>
            <ThemedText
              style={[
                styles.sendButtonText,
                {
                  color: inputText.trim() ? '#FFFFFF' : colors.textSecondary,
                },
              ]}>
              Send
            </ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  messagesList: {
    padding: 24,
    paddingBottom: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignItems: 'flex-end',
  },
  theirMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 44,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
