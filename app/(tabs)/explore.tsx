import { SwipeCards, type SwipeCardData } from '@/components/swipe-cards';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockCards: SwipeCardData[] = [
  {
    id: '1',
    name: 'Sentinel Fall Sensor',
    company: 'CareTech Innovators',
    category: 'Safety & Monitoring',
    stage: 'mature',
    description: 'AI-powered fall detection with 24/7 monitoring.',
    matchReason: 'Reduces nighttime staffing costs by 15% based on your facility size and historical fall data.',
    tags: ['Mature Tech', 'Safety & Monitoring', 'Looking for Pilots'],
  },
  {
    id: '2',
    name: 'CareTech Solutions',
    company: 'CareTech Innovators',
    category: 'Health Monitoring',
    stage: 'earlyCommercial',
    description: 'Advanced health monitoring with real-time alerts.',
    matchReason: 'Matches your focus on quality and reliability',
    tags: ['Early Commercial', 'Health Monitoring', 'Pilot Sites'],
  },
  {
    id: '3',
    name: 'SeniorCare Innovations',
    company: 'SeniorCare Inc',
    category: 'Assistive Technology',
    stage: 'mature',
    description: 'Proven assistive technology with 10+ years experience.',
    matchReason: 'Proven track record with care facilities',
    tags: ['Mature Tech', 'Assistive Tech', 'Sales Opportunities'],
  },
  {
    id: '4',
    name: 'WellnessTracker Pro',
    company: 'WellnessTech',
    category: 'Health Monitoring',
    stage: 'pilot',
    description: 'AI-powered wellness tracking platform.',
    matchReason: 'Innovative approach to caregiver support',
    tags: ['Pilot Tech', 'Health Monitoring', 'User Feedback'],
  },
  {
    id: '5',
    name: 'SmartHome Care',
    company: 'HomeTech Solutions',
    category: 'Home Automation',
    stage: 'earlyCommercial',
    description: 'Intelligent home automation for aging in place.',
    matchReason: 'Aligns with your interest in home-based care solutions',
    tags: ['Early Commercial', 'Home Automation', 'Pilot Sites'],
  },
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [cards, setCards] = useState(mockCards);

  const handleSwipeLeft = (card: SwipeCardData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSwipeRight = (card: SwipeCardData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`./match-detail?matchId=${card.id}&fromSwipe=1` as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.8}>
          <MaterialCommunityIcons name="menu" size={26} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <ThemedText style={[styles.headerTitle, { color: colors.text }]}>Discovery </ThemedText>
          <ThemedText style={[styles.headerSub, { color: colors.tint }]}>SMART MATCH</ThemedText>
        </View>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.8}>
          <MaterialCommunityIcons name="filter-variant" size={24} color={colors.text} />
        </TouchableOpacity>
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
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerIcon: { padding: 8 },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerSub: { fontSize: 13, fontWeight: '600', marginLeft: 2 },
  cardsContainer: { flex: 1 },
});
