import { ThemedText } from '@/components/themed-text';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FilterTab = 'all' | 'recent' | 'messaged';

// Mock data - in real app, this would come from API
const mockMatches = [
  {
    id: '1',
    name: 'CareTech Solutions',
    category: 'Health Monitoring',
    stage: 'earlyCommercial' as const,
    matchReason: 'Matches your focus on quality and reliability',
    matchStrength: 92,
  },
  {
    id: '2',
    name: 'SeniorCare Innovations',
    category: 'Assistive Technology',
    stage: 'mature' as const,
    matchReason: 'Proven track record with care facilities',
    matchStrength: 88,
  },
  {
    id: '3',
    name: 'WellnessTracker Pro',
    category: 'Health Monitoring',
    stage: 'pilot' as const,
    matchReason: 'Innovative approach to caregiver support',
    matchStrength: 85,
  },
];

export default function MatchesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [matches] = useState(mockMatches);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const getStageLabel = (stage: 'pilot' | 'earlyCommercial' | 'mature') => {
    switch (stage) {
      case 'pilot':
        return 'Pilot';
      case 'earlyCommercial':
        return 'Early Commercial';
      case 'mature':
        return 'Mature';
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Health') || category.includes('Monitoring')) return 'heart-pulse';
    if (category.includes('Assistive')) return 'hand-heart';
    return 'shield-check';
  };

  const filters: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'recent', label: 'Recent' },
    { key: 'messaged', label: 'Messaged' },
  ];

  const renderMatchCard = ({ item }: { item: typeof mockMatches[0] }) => (
    <TouchableOpacity
      style={[
        styles.matchCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
      onPress={() => router.push(`./match-detail?id=${item.id}` as any)}
      activeOpacity={0.85}>
      {/* Top accent bar */}
      <View
        style={[
          styles.cardAccent,
          { backgroundColor: colors.tint },
        ]}
      />

      <View style={styles.cardContent}>
        {/* Header: avatar + title + match badge */}
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.avatarWrap,
              { backgroundColor: colors.backgroundSecondary },
            ]}>
            <MaterialCommunityIcons
              name={getCategoryIcon(item.category) as any}
              size={28}
              color={colors.tint}
            />
          </View>
          <View style={styles.cardTitleBlock}>
            <ThemedText type="title" style={[styles.cardTitle, { color: colors.text }]}>
              {item.name}
            </ThemedText>
            <ThemedText style={[styles.category, { color: colors.textSecondary }]}>
              {item.category}
            </ThemedText>
          </View>
          <View
            style={[
              styles.matchBadge,
              {
                backgroundColor: `${colors.success}20`,
                borderColor: colors.success,
              },
            ]}>
            <MaterialCommunityIcons name="check-circle" size={14} color={colors.success} />
            <ThemedText style={[styles.matchBadgeText, { color: colors.success }]}>
              {item.matchStrength}% match
            </ThemedText>
          </View>
        </View>

        {/* Stage badge row */}
        <View style={styles.badgeRow}>
          <Badge variant={item.stage} label={getStageLabel(item.stage)} />
        </View>

        {/* Match reason */}
        <View
          style={[
            styles.reasonBox,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={18}
            color={colors.tint}
            style={styles.reasonIcon}
          />
          <ThemedText style={[styles.matchReason, { color: colors.textSecondary }]}>
            {item.matchReason}
          </ThemedText>
        </View>

        {/* Action buttons */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.primaryAction, { backgroundColor: colors.tint }]}
            onPress={(e) => {
              e.stopPropagation();
              router.push(`./match-detail?id=${item.id}` as any);
            }}
            activeOpacity={0.8}>
            <MaterialCommunityIcons name="account-details-outline" size={20} color="#FFFFFF" />
            <ThemedText style={styles.primaryActionText}>View Profile</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.secondaryAction,
              {
                backgroundColor: colors.backgroundSecondary,
                borderColor: colors.border,
              },
            ]}
            onPress={(e) => {
              e.stopPropagation();
              router.push({ pathname: './chat-detail', params: { chatId: item.id } } as any);
            }}
            activeOpacity={0.8}>
            <MaterialCommunityIcons name="message-text-outline" size={20} color={colors.tint} />
            <ThemedText style={[styles.secondaryActionText, { color: colors.tint }]}>
              Message
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 40 }]}>
        <View style={styles.headerTop}>
          <View>
            <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
              Your Matches
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
              {matches.length} potential connections
            </ThemedText>
          </View>
        </View>

        {/* Filter chips */}
        <View style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[
                styles.filterChip,
                activeFilter === f.key
                  ? { backgroundColor: colors.tint }
                  : {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                      borderWidth: 1,
                    },
              ]}
              onPress={() => setActiveFilter(f.key)}
              activeOpacity={0.7}>
              <ThemedText
                style={[
                  styles.filterChipText,
                  { color: activeFilter === f.key ? '#FFFFFF' : colors.textSecondary },
                ]}>
                {f.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {matches.length === 0 ? (
        <View style={styles.emptyState}>
          <View
            style={[
              styles.emptyIconWrap,
              { backgroundColor: colors.backgroundSecondary },
            ]}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={56}
              color={colors.textSecondary}
            />
          </View>
          <ThemedText type="title" style={[styles.emptyTitle, { color: colors.text }]}>
            No matches yet
          </ThemedText>
          <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
            When you like innovators or facilities on Discover, they'll appear here.
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatchCard}
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
    paddingBottom: 16,
  },
  headerTop: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 8,
  },
  matchCard: {
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  cardAccent: {
    height: 4,
    width: '100%',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTitleBlock: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  matchBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeRow: {
    marginBottom: 14,
  },
  reasonBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  reasonIcon: {
    marginRight: 10,
    marginTop: 1,
  },
  matchReason: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
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
