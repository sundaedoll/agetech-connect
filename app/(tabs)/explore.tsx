import { SwipeCards, type SwipeCardData } from '@/components/swipe-cards';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for swipe cards
const mockCards: SwipeCardData[] = [
  {
    id: '1',
    name: 'CareTech Solutions',
    category: 'Health Monitoring',
    stage: 'earlyCommercial',
    description:
      'Advanced health monitoring system with real-time alerts and caregiver notifications. Perfect for families looking for reliable remote care solutions.',
    matchReason: 'Matches your focus on quality and reliability',
  },
  {
    id: '2',
    name: 'SeniorCare Innovations',
    category: 'Assistive Technology',
    stage: 'mature',
    description:
      'Proven assistive technology solutions with 10+ years of experience. Trusted by care facilities nationwide.',
    matchReason: 'Proven track record with care facilities',
  },
  {
    id: '3',
    name: 'WellnessTracker Pro',
    category: 'Health Monitoring',
    stage: 'pilot',
    description:
      'Innovative wellness tracking platform with AI-powered insights. Cutting-edge technology for modern caregivers.',
    matchReason: 'Innovative approach to caregiver support',
  },
  {
    id: '4',
    name: 'MediAlert Systems',
    category: 'Emergency Response',
    stage: 'mature',
    description:
      'Reliable emergency response systems with 24/7 monitoring. Industry leader in senior safety technology.',
  },
  {
    id: '5',
    name: 'SmartHome Care',
    category: 'Home Automation',
    stage: 'earlyCommercial',
    description:
      'Intelligent home automation designed specifically for aging in place. Seamless integration with existing home systems.',
  },
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [cards, setCards] = useState(mockCards);

  const handleSwipeLeft = (card: SwipeCardData) => {
    // Pass - remove from stack
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Passed on:', card.name);
  };

  const handleSwipeRight = (card: SwipeCardData) => {
    // Like - add to matches
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('Liked:', card.name);
    // In a real app, you would save this to matches
    // For now, you can navigate to matches or show a success message
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Swipe
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Swipe to discover new connections
        </ThemedText>
      </View>

      <View style={styles.cardsContainer}>
        <SwipeCards
          cards={cards}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </View>
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
  cardsContainer: {
    flex: 1,
    // Space for action buttons will be handled by swipe-cards component
  },
});
