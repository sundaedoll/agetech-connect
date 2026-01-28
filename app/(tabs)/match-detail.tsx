import { ThemedText } from '@/components/themed-text';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data - in real app, fetch by ID
const getMatchDetail = (id: string) => {
  const matches: Record<string, any> = {
    '1': {
      id: '1',
      name: 'CareTech Solutions',
      category: 'Health Monitoring',
      stage: 'earlyCommercial' as const,
      description: 'CareTech Solutions provides comprehensive health monitoring systems designed specifically for aging adults. Our platform enables real-time tracking of vital signs, medication adherence, and daily activity patterns.',
      features: [
        'Real-time vital sign monitoring',
        'Medication reminder system',
        'Family caregiver dashboard',
        'Integration with healthcare providers',
      ],
      contact: 'contact@caretech.com',
    },
    '2': {
      id: '2',
      name: 'SeniorCare Innovations',
      category: 'Assistive Technology',
      stage: 'mature' as const,
      description: 'SeniorCare Innovations has been a trusted partner in assistive technology for over 10 years. We specialize in mobility aids, communication devices, and home safety solutions.',
      features: [
        'Wide range of assistive devices',
        'Professional installation services',
        'Ongoing support and maintenance',
        'Insurance coordination',
      ],
      contact: 'info@seniorcare.com',
    },
    '3': {
      id: '3',
      name: 'WellnessTracker Pro',
      category: 'Health Monitoring',
      stage: 'pilot' as const,
      description: 'WellnessTracker Pro is an innovative platform that combines wearable technology with AI-powered insights to help caregivers monitor and support aging adults.',
      features: [
        'AI-powered health insights',
        'Wearable device integration',
        'Predictive health analytics',
        'Caregiver mobile app',
      ],
      contact: 'hello@wellnesstracker.com',
    },
  };
  return matches[id] || matches['1'];
};

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const match = getMatchDetail(id || '1');

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <ThemedText type="title" style={styles.title}>
                {match.name}
              </ThemedText>
              <Badge variant={match.stage} label={getStageLabel(match.stage)} />
            </View>
            <ThemedText style={[styles.category, { color: colors.textSecondary }]}>
              {match.category}
            </ThemedText>
          </View>

          {/* Description */}
          <Card style={styles.section}>
            <ThemedText style={styles.sectionTitle}>About</ThemedText>
            <ThemedText style={[styles.description, { color: colors.text }]}>
              {match.description}
            </ThemedText>
          </Card>

          {/* Features */}
          <Card style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Key Features</ThemedText>
            {match.features.map((feature: string, index: number) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.bullet, { backgroundColor: colors.tint }]} />
                <ThemedText style={[styles.featureText, { color: colors.text }]}>
                  {feature}
                </ThemedText>
              </View>
            ))}
          </Card>

          {/* Contact */}
          <Card style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
            <ThemedText style={[styles.contact, { color: colors.text }]}>
              {match.contact}
            </ThemedText>
          </Card>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title="Start Conversation"
              onPress={() => router.push(`./messages?matchId=${match.id}` as any)}
              variant="primary"
              size="large"
              style={styles.button}
            />
            <Button
              title="Back to Matches"
              onPress={() => router.back()}
              variant="outline"
              size="large"
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  contact: {
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    marginTop: 8,
    gap: 12,
  },
  button: {
    width: '100%',
  },
});
