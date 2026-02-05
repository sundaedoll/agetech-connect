import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock chat list - in real app, this would come from API
const mockChats = [
  {
    id: '1',
    name: 'CareTech Solutions',
    category: 'Health Monitoring',
    lastMessage: 'Great! We specialize in health monitoring systems. What are you looking for?',
    timestamp: '10:35 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'SeniorCare Innovations',
    category: 'Assistive Technology',
    lastMessage: 'Thanks for connecting. When would you like to schedule a demo?',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'WellnessTracker Pro',
    category: 'Health Monitoring',
    lastMessage: "Hi! I'd love to learn more about your solutions.",
    timestamp: 'Mon',
    unread: 0,
  },
];

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (category: string) => {
    if (category?.includes('Health') || category?.includes('Monitoring')) return 'heart-pulse';
    if (category?.includes('Assistive')) return 'hand-heart';
    return 'domain';
  };

  const filteredChats = mockChats.filter(
    (c) =>
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: typeof mockChats[0] }) => (
    <TouchableOpacity
      style={[
        styles.chatCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: item.unread > 0 ? colors.tint : colors.border,
          borderWidth: item.unread > 0 ? 1.5 : 1,
          shadowColor: colors.shadow,
        },
      ]}
      onPress={() =>
        router.push({ pathname: './chat-detail', params: { chatId: item.id } } as any)
      }
      activeOpacity={0.85}>
      <View style={styles.chatCardContent}>
        {/* Avatar with category icon */}
        <View
          style={[
            styles.avatarWrap,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: item.unread > 0 ? colors.tint : 'transparent',
              borderWidth: item.unread > 0 ? 2 : 0,
            },
          ]}>
          <MaterialCommunityIcons
            name={getCategoryIcon(item.category) as any}
            size={26}
            color={colors.tint}
          />
          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.error }]}>
              <ThemedText style={styles.unreadText}>
                {item.unread > 99 ? '99+' : item.unread}
              </ThemedText>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <ThemedText
              type="subtitle"
              style={[
                styles.chatName,
                { color: colors.text },
                item.unread > 0 && { fontWeight: '700' },
              ]}
              numberOfLines={1}>
              {item.name}
            </ThemedText>
            <ThemedText style={[styles.timestamp, { color: colors.textSecondary }]}>
              {item.timestamp}
            </ThemedText>
          </View>
          {item.category ? (
            <ThemedText
              style={[styles.category, { color: colors.textSecondary }]}
              numberOfLines={1}>
              {item.category}
            </ThemedText>
          ) : null}
          <ThemedText
            style={[
              styles.lastMessage,
              {
                color: colors.textSecondary,
                fontWeight: item.unread > 0 ? '600' : '400',
              },
            ]}
            numberOfLines={2}>
            {item.lastMessage}
          </ThemedText>
        </View>

        {/* Chevron */}
        <View style={[styles.chevronWrap, { backgroundColor: colors.backgroundSecondary }]}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={colors.tint}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 40 }]}>
        <ThemedText type="title" style={[styles.headerTitle, { color: colors.text }]}>
          Messages
        </ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {mockChats.length} conversations
        </ThemedText>

        {/* Search bar */}
        <View
          style={[
            styles.searchWrap,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search conversations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {filteredChats.length === 0 ? (
        <View style={styles.emptyState}>
          <View
            style={[styles.emptyIconWrap, { backgroundColor: colors.backgroundSecondary }]}>
            <MaterialCommunityIcons
              name={searchQuery ? "file-search-outline" : "message-text-outline"}
              size={56}
              color={colors.textSecondary}
            />
          </View>
          <ThemedText type="title" style={[styles.emptyTitle, { color: colors.text }]}>
            {searchQuery ? 'No results found' : 'No conversations yet'}
          </ThemedText>
          <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
            {searchQuery
              ? 'Try a different search term.'
              : 'Start a conversation from a match to see your chats here.'}
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    marginBottom: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    minHeight: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  chatCard: {
    marginBottom: 14,
    borderRadius: 18,
    overflow: 'hidden',
    ...(Platform.OS === 'android' ? { elevation: 3 } : {}),
  },
  chatCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  unreadBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
    minWidth: 0,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  category: {
    fontSize: 13,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  chevronWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
