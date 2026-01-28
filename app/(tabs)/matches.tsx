import { ThemedText } from '@/components/themed-text';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data - in real app, this would come from API
const mockMatches = [
  {
    id: '1',
    name: 'CareTech Solutions',
    category: 'Health Monitoring',
    stage: 'earlyCommercial' as const,
    matchReason: 'Matches your focus on quality and reliability',
  },
  {
    id: '2',
    name: 'SeniorCare Innovations',
    category: 'Assistive Technology',
    stage: 'mature' as const,
    matchReason: 'Proven track record with care facilities',
  },
  {
    id: '3',
    name: 'WellnessTracker Pro',
    category: 'Health Monitoring',
    stage: 'pilot' as const,
    matchReason: 'Innovative approach to caregiver support',
  },
];

export default function MatchesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [matches] = useState(mockMatches);

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

  const renderMatchCard = ({ item }: { item: typeof mockMatches[0] }) => (
    <Card
      style={styles.matchCard}
      onPress={() => router.push(`./match-detail?id=${item.id}` as any)}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <ThemedText type="title" style={styles.cardTitle}>
            {item.name}
          </ThemedText>
          <Badge
            variant={item.stage}
            label={getStageLabel(item.stage)}
            style={styles.badge}
          />
        </View>
        <ThemedText style={[styles.category, { color: colors.textSecondary }]}>
          {item.category}
        </ThemedText>
      </View>

      <ThemedText style={[styles.matchReason, { color: colors.textSecondary }]}>
        {item.matchReason}
      </ThemedText>

      <View style={styles.cardActions}>
        <Button
          title="View Profile"
          onPress={() => router.push(`./match-detail?id=${item.id}` as any)}
          variant="primary"
          size="medium"
          style={styles.viewButton}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Your Matches
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          {matches.length} potential connections
        </ThemedText>
      </View>

      {matches.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>
            No matches yet. Check back soon!
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  listContent: {
    padding: 24,
    paddingTop: 8,
  },
  matchCard: {
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },
  badge: {
    marginLeft: 'auto',
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
  },
  matchReason: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardActions: {
    marginTop: 8,
  },
  viewButton: {
    width: '100%',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
